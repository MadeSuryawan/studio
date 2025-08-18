
'use server';

import { answerQuery, type AnswerQueryInput } from '@/ai/flows/answer-query';
import { suggestItinerary, type SuggestItineraryInput } from '@/ai/flows/suggest-itinerary';
import { handleContactInquiry, type HandleContactInquiryInput } from '@/ai/flows/handle-contact-inquiry';

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


export async function handleContactRequest(input: HandleContactInquiryInput) {
  try {
    const result = await handleContactInquiry(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in handleContactRequest:", error);
    return { success: false, error: 'There was a problem sending your message. Please try again.' };
  }
}
