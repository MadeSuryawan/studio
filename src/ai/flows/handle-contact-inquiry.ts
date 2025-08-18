"use server";

/**
 * @fileOverview Defines a Genkit flow for handling user contact inquiries.
 *
 * - handleContactInquiry - A function that processes a user's contact message and returns a confirmation.
 * - HandleContactInquiryInput - The input type for the handleContactInquiry function.
 * - HandleContactInquiryOutput - The return type for the handleContactInquiry function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const HandleContactInquiryInputSchema = z.object({
    name: z.string().describe("The user's name."),
    email: z.string().email().describe("The user's email address."),
    message: z.string().describe("The user's message."),
});
export type HandleContactInquiryInput = z.infer<
    typeof HandleContactInquiryInputSchema
>;

const HandleContactInquiryOutputSchema = z.object({
    confirmation: z
        .string()
        .describe("A confirmation message to be shown to the user."),
});
export type HandleContactInquiryOutput = z.infer<
    typeof HandleContactInquiryOutputSchema
>;

export async function handleContactInquiry(
    input: HandleContactInquiryInput,
): Promise<HandleContactInquiryOutput> {
    return handleContactInquiryFlow(input);
}

const prompt = ai.definePrompt({
    name: "handleContactInquiryPrompt",
    input: { schema: HandleContactInquiryInputSchema },
    output: { schema: HandleContactInquiryOutputSchema },
    prompt: `You are a friendly customer service assistant for a Bali travel agency called BaliBlissed Journeys.

  A user has submitted the following inquiry through the contact form:
  
  Name: {{{name}}}
  Email: {{{email}}}
  Message:
  {{{message}}}

  Your task is to generate a brief, friendly, and reassuring confirmation message. Acknowledge the user by name and mention that you will get back to them at their provided email address within 24-48 hours.

  Do not repeat the user's message in your response. Just provide the confirmation.
`,
});

const handleContactInquiryFlow = ai.defineFlow(
    {
        name: "handleContactInquiryFlow",
        inputSchema: HandleContactInquiryInputSchema,
        outputSchema: HandleContactInquiryOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    },
);
