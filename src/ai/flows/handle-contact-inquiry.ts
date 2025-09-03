
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
        description:
            "Sends an email with the user's inquiry to the support team.",
        inputSchema: HandleContactInquiryInputSchema,
        outputSchema: z.object({
            success: z.boolean(),
            error: z.string().optional(),
        }),
    },
    async ({ name, email, message }) => {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            const errorMessage =
                "Email server is not configured. Missing EMAIL_USER or EMAIL_PASS environment variables.";
            console.error(errorMessage);
            return { success: false, error: errorMessage };
        }

        // Use explicit SMTP configuration for better compatibility and error reporting
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // IMPORTANT: Use a Gmail App Password if 2FA is enabled
            },
        });

        // Verify connection configuration for better debugging
        try {
            await transporter.verify();
            console.log("Nodemailer transport verified successfully.");
        } catch (error: any) {
            console.error("Nodemailer transport verification failed:", error);
            return {
                success: false,
                error: `Failed to connect to email server: ${error.message}`,
            };
        }

        const mailOptions = {
            from: `"${name} via BaliBlissed" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Contact Inquiry from ${name}`,
            html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>New Contact Inquiry from BaliBlissed Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr>
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `.trim(),
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully. Message ID:", info.messageId);
            return { success: true };
        } catch (error: any) {
            console.error("Error sending email with Nodemailer:", error);
            return {
                success: false,
                error:
                    `Failed to send email: ${error.message}` ||
                    "An unknown error occurred while sending the email.",
            };
        }
    },
);

const prompt = ai.definePrompt({
    name: "handleContactInquiryPrompt",
    input: { schema: HandleContactInquiryInputSchema },
    output: { schema: HandleContactInquiryOutputSchema },
    tools: [sendEmailTool],
    prompt: `You are a friendly customer service assistant for a Bali travel agency called BaliBlissed.

  A user has submitted the following inquiry through the contact form:
  
  Name: {{{name}}}
  Email: {{{email}}}
  Message:
  {{{message}}}

  First, call the sendEmailTool to send the inquiry to the support team.

  Then, based on the result of the tool call, generate a brief, friendly, and reassuring confirmation message. Acknowledge the user by name and mention that you will get back to them at their provided email address within 24-48 hours.

  If the email fails, your confirmation message should politely inform them that there was a technical issue and they should try again later.
  
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

        if (!output) {
            throw new Error("Failed to generate an AI confirmation message.");
        }

        return output;
    },
);
