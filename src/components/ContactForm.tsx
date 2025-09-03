// src/components/ContactForm.tsx
"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { handleContactRequest } from "@/app/actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * A reusable contact form component.
 * Handles form state, validation, submission, and displays success/error dialogs.
 * It can be used anywhere in the application.
 */
const ContactForm = (): React.JSX.Element => {
    // Hooks for managing form state and side effects
    const searchParams = useSearchParams();
    const initialMessage = searchParams.get("message") || "";
    const [isLoading, setIsLoading] = React.useState(false);
    const [dialogState, setDialogState] = React.useState<{
        title: string;
        description: string;
    } | null>(null);

    // react-hook-form instance with Zod resolver
    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: "", email: "", message: "" },
    });

    // Effect to set the message from URL search params, if present.
    React.useEffect(() => {
        if (initialMessage) {
            form.setValue("message", initialMessage);
        }
    }, [initialMessage, form]);

    /**
     * Handles form submission.
     * Sets loading state, calls the server action, and handles the response.
     * @param data - The validated form data.
     */
    const onSubmit = React.useCallback(
        async (data: ContactFormData) => {
            setIsLoading(true);
            setDialogState(null);

            try {
                const result = await handleContactRequest(data);

                if (result.success && result.data) {
                    setDialogState({
                        title: "Message Sent!",
                        description: result.data.confirmation,
                    });
                    form.reset({ name: "", email: "", message: "" });
                } else {
                    setDialogState({
                        title: "Oh no!",
                        description:
                            result.error ?? "An unexpected error occurred.",
                    });
                }
            } catch (error) {
                console.error("Contact form submission error:", error);
                setDialogState({
                    title: "Oh no!",
                    description: "An unexpected error occurred.",
                });
            } finally {
                setIsLoading(false);
            }
        },
        [form],
    );

    // Memoized dialog component to prevent re-renders
    const ResultDialog = React.useMemo(
        () => (
            <AlertDialog
                open={!!dialogState}
                onOpenChange={() => setDialogState(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{dialogState?.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogState?.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => setDialogState(null)}
                            aria-label="Close dialog"
                        >
                            Close
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        ),
        [dialogState],
    );

    return (
        <>
            <div className="mx-auto w-full max-w-sm lg:max-w-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4"
                        noValidate
                        aria-labelledby="contact-form-title"
                    >
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            id="name-input"
                                            autoComplete="name"
                                            placeholder="Your Name"
                                            aria-label="Your Name"
                                            aria-required="true"
                                            {...field}
                                            className="bg-bg-alternate text-special-card-fg placeholder:text-special-card-fg/70"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            id="email-input"
                                            autoComplete="email"
                                            placeholder="Your Email"
                                            aria-label="Your Email"
                                            aria-required="true"
                                            {...field}
                                            className="bg-bg-alternate text-special-card-fg placeholder:text-special-card-fg/70"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Message Field */}
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Your Message"
                                            className="min-h-[120px] bg-bg-alternate text-special-card-fg placeholder:text-special-card-fg/70"
                                            aria-label="Your Message"
                                            aria-required="true"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                            aria-busy={isLoading}
                            aria-label={
                                isLoading
                                    ? "Sending message..."
                                    : "Send Message"
                            }
                        >
                            {isLoading ? (
                                <Loader2
                                    className="animate-spin"
                                    aria-hidden="true"
                                />
                            ) : (
                                "Send Message"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
            {ResultDialog}
        </>
    );
};

export default ContactForm;
