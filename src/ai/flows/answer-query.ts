// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Provides an AI travel assistant that answers user queries related to Bali travel.
 *
 * - answerQuery - A function that handles user queries and returns answers.
 * - AnswerQueryInput - The input type for the answerQuery function.
 * - AnswerQueryOutput - The return type for the answerQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQueryInputSchema = z.object({
  query: z.string().describe('The user query about Bali travel.'),
});
export type AnswerQueryInput = z.infer<typeof AnswerQueryInputSchema>;

const AnswerQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type AnswerQueryOutput = z.infer<typeof AnswerQueryOutputSchema>;

export async function answerQuery(input: AnswerQueryInput): Promise<AnswerQueryOutput> {
  return answerQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQueryPrompt',
  input: {schema: AnswerQueryInputSchema},
  output: {schema: AnswerQueryOutputSchema},
  prompt: `You are a travel assistant specializing in Bali travel.

  Answer the following user query about Bali travel:

  {{query}}`,
});

const answerQueryFlow = ai.defineFlow(
  {
    name: 'answerQueryFlow',
    inputSchema: AnswerQueryInputSchema,
    outputSchema: AnswerQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
