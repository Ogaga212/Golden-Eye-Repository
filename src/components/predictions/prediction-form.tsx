'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generatePrediction,
} from '@/ai/flows/generate-prediction';
import type { GeneratePredictionInput, GeneratePredictionOutput } from '@/ai/schemas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { goldPairs } from '@/lib/data';
import { Wand2, Bot, Target, TrendingUp, Zap } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

const formSchema = z.object({
  pair: z.string().min(1, 'Please select a gold pair.'),
  timeframe: z.string().min(1, 'Please select a timeframe.'),
});

type PredictionFormValues = z.infer<typeof formSchema>;

export function PredictionForm() {
  const [prediction, setPrediction] = useState<GeneratePredictionOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pair: '',
      timeframe: '',
    },
  });

  const onSubmit = async (values: PredictionFormValues) => {
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const input: GeneratePredictionInput = {
        goldPair: values.pair,
        timeframe: values.timeframe,
      };
      const result = await generatePrediction(input);
      setPrediction(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generate a New Prediction</CardTitle>
          <CardDescription>Select a gold pair and a timeframe to get an AI-powered forecast.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pair"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gold Pair</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a pair" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {goldPairs.map((p) => (
                          <SelectItem key={p.pair} value={p.pair}>
                            {p.pair}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeframe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeframe</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timeframe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="short-term">Short-term (1-3 Days)</SelectItem>
                        <SelectItem value="medium-term">Medium-term (1-2 Weeks)</SelectItem>
                        <SelectItem value="long-term">Long-term (1-3 Months)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Bot className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Prediction
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div>
        {loading && (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-1/4" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-1/4" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        )}
        {error && (
            <Alert variant="destructive">
                <Zap className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {prediction && (
          <Card className="animate-in fade-in-0">
            <CardHeader>
              <CardTitle>AI Prediction Result</CardTitle>
              <CardDescription>
                Forecast for {form.getValues('pair')} ({form.getValues('timeframe')})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Forecasted Price</p>
                  <p className="text-xl font-bold">${prediction.forecastedPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confidence Score</p>
                  <p className="text-xl font-bold">{prediction.confidence.toFixed(1)}%</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Analysis</h4>
                <p className="text-muted-foreground leading-relaxed">{prediction.analysis}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
