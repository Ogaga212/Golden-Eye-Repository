'use server';

/**
 * @fileOverview Generates a price prediction for a given gold pair and timeframe.
 *
 * - generatePrediction - A function that generates a price prediction.
 */

import { ai } from '@/ai/genkit';
import { GeneratePredictionInputSchema, GeneratePredictionOutputSchema, type GeneratePredictionInput, type GeneratePredictionOutput } from '@/ai/schemas';

export { type GeneratePredictionInput, type GeneratePredictionOutput } from '@/ai/schemas';


export async function generatePrediction(
  input: GeneratePredictionInput
): Promise<GeneratePredictionOutput> {
  return generatePredictionFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generatePredictionPrompt',
  input: { schema: GeneratePredictionInputSchema },
  output: { schema: GeneratePredictionOutputSchema },
  prompt: `You are a sophisticated financial AI that specializes in predicting gold market movements and providing technical analysis.
  
  Analyze the provided gold pair and timeframe. Based on current (simulated) market conditions, technical indicators, and recent price action, generate a price prediction.
  
  Provide the following:
  1.  A specific forecasted price.
  2.  A confidence score for your prediction (0-100).
  3.  A concise analysis explaining the key factors influencing your forecast.
  4.  The key support level.
  5.  The key resistance level.
  6.  A description of the current trade setup (e.g., "consolidation before breakout," "testing resistance").
  7.  The key breakout point price.

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

  Generate a forecast and technical analysis based on this data. Be creative and generate a realistic-sounding analysis.
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
