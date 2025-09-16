'use server';

/**
 * @fileOverview This file implements the AI Chatbot Assistance flow.
 *
 * - chatWithBot - A function that allows users to ask campus-related questions and receive helpful answers.
 * - ChatWithBotInput - The input type for the chatWithBot function.
 * - ChatWithBotOutput - The return type for the chatWithBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithBotInputSchema = z.object({
  query: z.string().describe('The user query or question.'),
});
export type ChatWithBotInput = z.infer<typeof ChatWithBotInputSchema>;

const ChatWithBotOutputSchema = z.object({
  answer: z.string().describe('The AI Chatbot response to the user query.'),
});
export type ChatWithBotOutput = z.infer<typeof ChatWithBotOutputSchema>;

export async function chatWithBot(input: ChatWithBotInput): Promise<ChatWithBotOutput> {
  return chatWithBotFlow(input);
}

const useCampusInfoTool = ai.defineTool({
  name: 'getCampusInformation',
  description: 'This tool retrieves information about the campus including resources, placement preparation, and events.',
  inputSchema: z.object({
    query: z.string().describe('The specific information being requested about the campus.'),
  }),
  outputSchema: z.string(),
  async func(input) {
    // TODO: Implement the retrieval of campus information here.
    // This placeholder simulates fetching campus information.
    return `Detailed campus information for query: ${input.query}`;
  },
});

const prompt = ai.definePrompt({
  name: 'chatWithBotPrompt',
  input: {schema: ChatWithBotInputSchema},
  output: {schema: ChatWithBotOutputSchema},
  tools: [useCampusInfoTool],
  system: `You are a helpful AI chatbot assistant for students at a university campus.
  Your goal is to answer student questions accurately and concisely. You have access to a tool that can retrieve campus information.
  If the user's question is campus-related (e.g., about resources, placement preparation, events), use the getCampusInformation tool to get the relevant details.
  Otherwise, respond to the question directly using your general knowledge.
  Always provide a helpful and informative answer to the user.
  `,
  prompt: `User query: {{{query}}}`, // The prompt is using the query directly.
});

const chatWithBotFlow = ai.defineFlow(
  {
    name: 'chatWithBotFlow',
    inputSchema: ChatWithBotInputSchema,
    outputSchema: ChatWithBotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
