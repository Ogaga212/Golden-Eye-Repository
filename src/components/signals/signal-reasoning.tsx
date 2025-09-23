'use client';

import { useEffect, useState } from 'react';
import { generateSignalReasoning } from '@/ai/flows/generate-signal-reasoning';
import { Skeleton } from '@/components/ui/skeleton';
import type { Signal } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

type SignalReasoningProps = {
  signal: Signal;
};

export function SignalReasoning({ signal }: SignalReasoningProps) {
  const [reasoning, setReasoning] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReasoning = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await generateSignalReasoning({
          signalType: signal.type,
          technicalIndicators: signal.technicalIndicators,
          goldPair: signal.pair,
        });
        setReasoning(result.reasoning);
      } catch (e) {
        console.error(e);
        setError('Failed to generate reasoning. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReasoning();
  }, [signal]);

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return <p className="text-foreground leading-relaxed">{reasoning}</p>;
}
