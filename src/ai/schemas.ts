/**
 * @fileOverview Defines the Zod schemas and TypeScript types for AI flows.
 * This file is separate from the flow definitions to avoid Next.js server action
 * restrictions on exporting non-function objects from 'use server' files.
 */

import { z } from 'genkit';

// Schema for generatePrediction flow
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


// Schema for generateSignalReasoning flow
export const GenerateSignalReasoningInputSchema = z.object({
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

export const GenerateSignalReasoningOutputSchema = z.object({
  reasoning: z
    .string()
    .describe(
      'A clear and concise explanation of the reasoning behind the signal.'
    ),
});
export type GenerateSignalReasoningOutput = z.infer<
  typeof GenerateSignalReasoningOutputSchema
>;

// Schema for generateChatResponse flow
const ChatMessageSchema = z.object({
  user: z.string(),
  ai: z.string(),
});

export const GenerateChatResponseInputSchema = z.object({
  question: z.string().describe('The user\'s current question.'),
  history: z.array(ChatMessageSchema).describe('The history of the conversation.'),
});
export type GenerateChatResponseInput = z.infer<typeof GenerateChatResponseInputSchema>;

export const GenerateChatResponseOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user\'s question.'),
});
export type GenerateChatResponseOutput = z.infer<typeof GenerateChatResponseOutputSchema>;
