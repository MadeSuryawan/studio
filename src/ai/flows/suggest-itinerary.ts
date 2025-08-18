"use server";

/**
 * @fileOverview This file defines a Genkit flow for suggesting Bali travel itineraries based on user preferences.
 *
 * - suggestItinerary - A function that takes user interests, travel dates, and budget as input and returns a suggested itinerary.
 * - SuggestItineraryInput - The input type for the suggestItinerary function.
 * - SuggestItineraryOutput - The return type for the suggestItinerary function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const SuggestItineraryInputSchema = z.object({
    interests: z
        .string()
        .describe(
            "A comma-separated list of interests, e.g., beaches, temples, surfing.",
        ),
    travelDates: z
        .string()
        .describe(
            "The desired travel dates, e.g., 2024-07-01 to 2024-07-15. Use ISO 8601 format.",
        ),
    budget: z
        .string()
        .describe(
            "The budget for the trip, e.g., $1000, €800, or specify a range like $800-$1200.",
        ),
});

export type SuggestItineraryInput = z.infer<typeof SuggestItineraryInputSchema>;

const SuggestItineraryOutputSchema = z.object({
    itinerary: z.string().describe("A detailed travel itinerary for Bali."),
});

export type SuggestItineraryOutput = z.infer<
    typeof SuggestItineraryOutputSchema
>;

export async function suggestItinerary(
    input: SuggestItineraryInput,
): Promise<SuggestItineraryOutput> {
    return suggestItineraryFlow(input);
}

const prompt = ai.definePrompt({
    name: "suggestItineraryPrompt",
    input: { schema: SuggestItineraryInputSchema },
    output: { schema: SuggestItineraryOutputSchema },
    prompt: `You are a travel expert specializing in Bali itineraries. A user wants you to create a Bali itinerary for them.

  Consider their interests, travel dates and budget, and create a detailed daily itinerary with specific locations and activities.   The itinerary should be tailored to Bali.

  Interests: {{{interests}}}
  Travel Dates: {{{travelDates}}}
  Budget: {{{budget}}}

  Respond with a detailed itinerary:
`,
});

const suggestItineraryFlow = ai.defineFlow(
    {
        name: "suggestItineraryFlow",
        inputSchema: SuggestItineraryInputSchema,
        outputSchema: SuggestItineraryOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    },
);
