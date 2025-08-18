
'use server';

import { answerQuery, type AnswerQueryInput } from '@/ai/flows/answer-query';
import { suggestItinerary, type SuggestItineraryInput } from '@/ai/flows/suggest-itinerary';

export async function handleQuery(input: AnswerQueryInput) {
  try {
    const result = await answerQuery(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in handleQuery:", error);
    return { success: false, error: 'An unexpected error occurred. Please try again later.' };
  }
}

export async function handleItineraryRequest(input: SuggestItineraryInput) {
  try {
    const result = await suggestItinerary(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in handleItineraryRequest:", error);
    return { success: false, error: 'An unexpected error occurred while generating your itinerary. Please try again.' };
  }
}
