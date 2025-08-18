
'use server';

/**
 * @fileOverview Provides an AI travel assistant that answers user queries related to Bali travel.
 *
 * - answerQuery - A function that handles user queries and returns answers.
 * - AnswerQueryInput - The input type for the answerQuery function.
 * - AnswerQueryOutput - The return type for the answerQuery function.
 */

import { ai } from '@/ai/genkit';
import { getPackages } from '@/services/package-service';
import { z } from 'genkit';

const AnswerQueryInputSchema = z.object({
  query: z.string().describe('The user query about Bali travel.'),
});
export type AnswerQueryInput = z.infer<typeof AnswerQueryInputSchema>;

const AnswerQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type AnswerQueryOutput = z.infer<typeof AnswerQueryOutputSchema>;

export async function answerQuery(
  input: AnswerQueryInput
): Promise<AnswerQueryOutput> {
  return answerQueryFlow(input);
}

const getPackagesTool = ai.defineTool(
  {
    name: 'getTravelPackages',
    description: 'Get a list of available travel packages for Bali.',
    inputSchema: z.object({}),
    outputSchema: z.array(
      z.object({
        title: z.string(),
        duration: z.string(),
        price: z.number(),
        description: z.string(),
        features: z.array(z.string()),
      })
    ),
  },
  async () => {
    console.log('Fetching packages with tool');
    return getPackages();
  }
);


const prompt = ai.definePrompt({
  name: 'answerQueryPrompt',
  input: { schema: AnswerQueryInputSchema },
  output: { schema: AnswerQueryOutputSchema },
  tools: [getPackagesTool],
  prompt: `You are a friendly and helpful travel assistant for a company called BaliBlissed Journeys.
  
  Your primary role is to answer user questions about traveling to Bali and the packages we offer.
  
  - If the user asks about available packages, prices, or what's included, use the 'getTravelPackages' tool to get the most up-to-date information and answer their question.
  - For general questions about Bali (e.g., "what's the weather like in July?", "best places to see monkeys?"), answer them based on your general knowledge.
  - Be conversational and helpful.

  User query:
  {{query}}`,
});

const answerQueryFlow = ai.defineFlow(
  {
    name: 'answerQueryFlow',
    inputSchema: AnswerQueryInputSchema,
    outputSchema: AnswerQueryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
