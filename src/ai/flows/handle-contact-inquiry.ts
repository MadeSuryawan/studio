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
import nodemailer from "nodemailer";

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

const sendEmailTool = ai.defineTool(
    {
        name: "sendEmail",
        description: "Sends an email with the user's inquiry to the support team.",
        inputSchema: HandleContactInquiryInputSchema,
        outputSchema: z.object({
            success: z.boolean(),
            error: z.string().optional(),
        }),
    },
    async ({ name, email, message }) => {
        try {
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
                console.error("Email credentials are not configured in .env file.");
                throw new Error("Server is not configured to send emails.");
            }

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: `"${name} via BaliBlissed" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_USER,
                replyTo: email,
                subject: "New Contact Inquiry from BaliBlissed Website",
                text: `
          Name: ${name}
          Email: ${email}
          Message:
          ${message}
        `.trim(),
            };

            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
            return { success: true };
        } catch (error: any) {
            console.error("Error sending email:", error);
            return {
                success: false,
                error: error.message || "An unknown error occurred while sending the email.",
            };
        }
    }
);


const prompt = ai.definePrompt({
    name: "handleContactInquiryPrompt",
    input: { schema: HandleContactInquiryInputSchema },
    output: { schema: HandleContactInquiryOutputSchema },
    prompt: `You are a friendly customer service assistant for a Bali travel agency called BaliBlissed.

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
        tools: [sendEmailTool],
    },
    async (input) => {
        // Run email sending and AI response generation in parallel
        const [emailResult, { output: confirmationOutput }] = await Promise.all([
            sendEmailTool(input),
            prompt(input),
        ]);

        if (!emailResult.success) {
            // If email fails, we might want to throw an error or handle it differently
            // For now, we'll log it and still send a confirmation to the user,
            // but we'll add a note for ourselves.
            console.error("Failed to send contact email:", emailResult.error);
            throw new Error("Failed to send contact email. Please try again later.");
        }
        
        if (!confirmationOutput) {
            throw new Error("Failed to generate an AI confirmation message.");
        }

        return confirmationOutput;
    },
);
