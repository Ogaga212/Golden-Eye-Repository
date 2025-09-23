'use server';

/**
 * @fileOverview Generates reasoning for a given trading signal using AI.
 *
 * - generateSignalReasoning - A function that generates reasoning for a trading signal.
 */

import {ai} from '@/ai/genkit';
import { GenerateSignalReasoningInputSchema, GenerateSignalReasoningOutputSchema, type GenerateSignalReasoningInput, type GenerateSignalReasoningOutput } from '@/ai/schemas';

export { type GenerateSignalReasoningInput, type GenerateSignalReasoningOutput } from '@/ai/schemas';

export async function generateSignalReasoning(
  input: GenerateSignalReasoningInput
): Promise<GenerateSignalReasoningOutput> {
  return generateSignalReasoningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSignalReasoningPrompt',
  input: {schema: GenerateSignalReasoningInputSchema},
  output: {schema: GenerateSignalReasoningOutputSchema},
  prompt: `You are an expert financial analyst specializing in gold trading.

  Based on the given signal type, technical indicators, and gold pair, provide a clear and concise explanation of the reasoning behind the signal. The reasoning should be easy to understand for both novice and experienced traders.

  Signal Type: {{{signalType}}}
  Technical Indicators: {{{technicalIndicators}}}
  Gold Pair: {{{goldPair}}}

  Reasoning:`,
});

const generateSignalReasoningFlow = ai.defineFlow(
  {
    name: 'generateSignalReasoningFlow',
    inputSchema: GenerateSignalReasoningInputSchema,
    outputSchema: GenerateSignalReasoningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
