'use server';

/**
 * @fileOverview Summarizes long discussions into key takeaways using AI.
 *
 * - summarizeDiscussion - A function that summarizes a discussion thread.
 * - SummarizeDiscussionInput - The input type for the summarizeDiscussion function.
 * - SummarizeDiscussionOutput - The return type for the summarizeDiscussion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDiscussionInputSchema = z.object({
  discussionText: z
    .string()
    .describe('The complete text of the discussion to summarize.'),
});
export type SummarizeDiscussionInput = z.infer<typeof SummarizeDiscussionInputSchema>;

const SummarizeDiscussionOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the discussion thread.'),
});
export type SummarizeDiscussionOutput = z.infer<typeof SummarizeDiscussionOutputSchema>;

export async function summarizeDiscussion(input: SummarizeDiscussionInput): Promise<SummarizeDiscussionOutput> {
  return summarizeDiscussionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDiscussionPrompt',
  input: {schema: SummarizeDiscussionInputSchema},
  output: {schema: SummarizeDiscussionOutputSchema},
  prompt: `You are an expert at summarizing long discussions into key takeaways.

  Please provide a concise summary of the following discussion:

  {{{discussionText}}}`,
});

const summarizeDiscussionFlow = ai.defineFlow(
  {
    name: 'summarizeDiscussionFlow',
    inputSchema: SummarizeDiscussionInputSchema,
    outputSchema: SummarizeDiscussionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
