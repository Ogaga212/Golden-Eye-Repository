import { notFound } from 'next/navigation';
import { signals } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SignalReasoning } from '@/components/signals/signal-reasoning';
import type { Signal } from '@/lib/types';

type SignalDetailPageProps = {
  params: { id: string };
};

const getSignalById = (id: string): Signal | undefined => {
  return signals.find((s) => s.id === id);
};

const getBadgeVariant = (type: 'Buy' | 'Sell' | 'Hold'): 'success' | 'destructive' | 'secondary' => {
  if (type === 'Buy') return 'success';
  if (type === 'Sell') return 'destructive';
  return 'secondary';
};

export default function SignalDetailPage({ params }: SignalDetailPageProps) {
  const signal = getSignalById(params.id);

  if (!signal) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Signal Details"
        description={`Analysis for ${signal.pair} at ${new Date(signal.timestamp).toLocaleString()}`}
      >
        <Button variant="outline" asChild>
          <Link href="/signals">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Signals
          </Link>
        </Button>
      </PageHeader>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Signal Summary</CardTitle>
                <CardDescription>Key information about this signal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pair</span>
                  <span className="font-semibold">{signal.pair}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <Badge variant={getBadgeVariant(signal.type)}>{signal.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">${signal.priceAtSignal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timestamp</span>
                  <span className="font-semibold">{new Date(signal.timestamp).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Reasoning</CardTitle>
                <CardDescription>An explanation of the factors contributing to this signal.</CardDescription>
              </CardHeader>
              <CardContent>
                <SignalReasoning signal={signal} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
