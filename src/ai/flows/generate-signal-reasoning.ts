// src/ai/flows/generate-signal-reasoning.ts
'use server';

/**
 * @fileOverview Generates reasoning for a given trading signal using AI.
 *
 * - generateSignalReasoning - A function that generates reasoning for a trading signal.
 * - GenerateSignalReasoningInput - The input type for the generateSignalReasoning function.
 * - GenerateSignalReasoningOutput - The return type for the generateSignalReasoning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSignalReasoningInputSchema = z.object({
  signalType: z
    .string()
    .describe("The type of signal (Buy, Sell, or Hold)."),
  technicalIndicators: z
    .string()
    .describe(
      'A list of relevant technical indicators and their current values.'
    ),
  goldPair: z.string().describe('The gold pair being analyzed (e.g., XAU/USD).'),
});
export type GenerateSignalReasoningInput = z.infer<
  typeof GenerateSignalReasoningInputSchema
>;

const GenerateSignalReasoningOutputSchema = z.object({
  reasoning: z
    .string()
    .describe(
      'A clear and concise explanation of the reasoning behind the signal.'
    ),
});
export type GenerateSignalReasoningOutput = z.infer<
  typeof GenerateSignalReasoningOutputSchema
>;

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
