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

const ContactForm = (): React.JSX.Element => {
    const searchParams = useSearchParams();
    const initialMessage = searchParams.get("message") || "";
    const [isLoading, setIsLoading] = React.useState(false);
    const [dialogState, setDialogState] = React.useState<{
        title: string;
        description: string;
    } | null>(null);

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: "", email: "", message: initialMessage },
    });

    React.useEffect(() => {
        form.setValue("message", initialMessage);
    }, [initialMessage, form]);

    async function onSubmit(
        data: z.infer<typeof contactSchema>,
    ): Promise<void> {
        setIsLoading(true);
        setDialogState(null);

        const result = await handleContactRequest(data);

        setIsLoading(false);

        if (result.success && result.data) {
            setDialogState({
                title: "Message Sent!",
                description: result.data.confirmation,
            });
            form.reset({ name: "", email: "", message: "" });
        } else {
            setDialogState({
                title: "Oh no!",
                description: result.error ?? "An unexpected error occurred.",
            });
        }
    }

    return (
        <>
            <div className="mx-auto w-full max-w-sm lg:max-w-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            id="name-input"
                                            autoComplete="off"
                                            placeholder="Your Name"
                                            {...field}
                                            className="bg-card-alternate text-special-card-fg placeholder:text-special-card-fg/70"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            id="email-input"
                                            autoComplete="on"
                                            placeholder="Your Email"
                                            {...field}
                                            className="bg-card-alternate text-special-card-fg placeholder:text-special-card-fg/70"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Your Message"
                                            className="min-h-[120px] bg-card-alternate text-special-card-fg placeholder:text-special-card-fg/70"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Send Message"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
            <AlertDialog
                open={!!dialogState}
                onOpenChange={() => setDialogState(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {dialogState?.title}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogState?.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setDialogState(null)}>
                            Close
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default function ContactSection(): React.JSX.Element {
    return (
        <section id="contact" className="w-full py-8 md:py-16">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-lighter sm:text-4xl md:text-5xl font-headline">
                        Get in Touch
                    </h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Have a question or ready to plan your trip? Send us a
                        message!
                    </p>
                </div>
                <React.Suspense fallback={<div>Loading form...</div>}>
                    <ContactForm />
                </React.Suspense>
            </div>
        </section>
    );
}
