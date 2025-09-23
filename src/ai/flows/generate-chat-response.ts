'use server';

/**
 * @fileOverview Generates a response for a trading-related chatbot.
 *
 * - generateChatResponse - A function that generates a chat response.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateChatResponseInputSchema,
  GenerateChatResponseOutputSchema,
  type GenerateChatResponseInput,
  type GenerateChatResponseOutput,
} from '@/ai/schemas';

export {
  type GenerateChatResponseInput,
  type GenerateChatResponseOutput,
} from '@/ai/schemas';

export async function generateChatResponse(
  input: GenerateChatResponseInput
): Promise<GenerateChatResponseOutput> {
  return generateChatResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChatResponsePrompt',
  input: { schema: GenerateChatResponseInputSchema },
  output: { schema: GenerateChatResponseOutputSchema },
  prompt: `You are a helpful and friendly trading assistant chatbot. Your goal is to answer user questions about trading concepts, market analysis, and how to use this application.

  Keep your answers concise, informative, and easy to understand for all levels of traders.

  Previous conversation:
  {{#each history}}
  User: {{{this.user}}}
  AI: {{{this.ai}}}
  {{/each}}

  Current Question: {{{question}}}

  Answer the user's question based on the context of the conversation.`,
});

const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: GenerateChatResponseInputSchema,
    outputSchema: GenerateChatResponseOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
