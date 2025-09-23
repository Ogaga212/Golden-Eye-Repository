'use server';

/**
 * @fileOverview Generates a price prediction for a given gold pair and timeframe.
 *
 * - generatePrediction - A function that generates a price prediction.
 * - GeneratePredictionInput - The input type for the generatePrediction function.
 * - GeneratePredictionOutput - The return type for the generatePrediction function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GeneratePredictionInputSchema = z.object({
  goldPair: z.string().describe('The gold pair to predict (e.g., XAU/USD).'),
  timeframe: z.string().describe('The prediction timeframe (e.g., short-term, medium-term).'),
});
export type GeneratePredictionInput = z.infer<typeof GeneratePredictionInputSchema>;

export const GeneratePredictionOutputSchema = z.object({
  forecastedPrice: z.number().describe('The AI-forecasted price for the gold pair.'),
  confidence: z.number().describe('The confidence level of the prediction, from 0 to 100.'),
  analysis: z.string().describe('A detailed analysis explaining the reasoning behind the prediction.'),
});
export type GeneratePredictionOutput = z.infer<typeof GeneratePredictionOutputSchema>;


export async function generatePrediction(
  input: GeneratePredictionInput
): Promise<GeneratePredictionOutput> {
  return generatePredictionFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generatePredictionPrompt',
  input: { schema: GeneratePredictionInputSchema },
  output: { schema: GeneratePredictionOutputSchema },
  prompt: `You are a sophisticated financial AI that specializes in predicting gold market movements.
  
  Analyze the provided gold pair and timeframe. Based on current (simulated) market conditions, technical indicators, and recent price action, generate a price prediction.
  
  Provide a specific forecasted price, a confidence score for your prediction (0-100), and a concise analysis explaining the key factors influencing your forecast.

  Today's Date: ${new Date().toLocaleDateString()}
  Gold Pair: {{{goldPair}}}
  Timeframe: {{{timeframe}}}
  
  Recent Signals:
  - XAU/USD Buy at 2375.80 (RSI 33.5)
  - XAU/EUR Sell at 2220.60 (RSI 70.2)
  - XAU/JPY Buy at 371980.0 (RSI 35.5)
  
  Current Prices:
  - XAU/USD: 2376.55
  - XAU/EUR: 2215.21
  - XAU/GBP: 1875.99
  - XAU/JPY: 372510.5
  - XAU/CHF: 2130.40

  Generate a forecast based on this data. Be creative and generate a realistic-sounding analysis.
  `,
});

const generatePredictionFlow = ai.defineFlow(
  {
    name: 'generatePredictionFlow',
    inputSchema: GeneratePredictionInputSchema,
    outputSchema: GeneratePredictionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
