'use server';

import { answerQuery, type AnswerQueryInput } from '@/ai/flows/answer-query';

export async function handleQuery(input: AnswerQueryInput) {
  try {
    // Here you could add input validation if needed.
    const result = await answerQuery(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in handleQuery:", error);
    // In a real app, you might want to log this error to a service.
    return { success: false, error: 'An unexpected error occurred. Please try again later.' };
  }
}
