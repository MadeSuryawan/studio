"use client";

import {
    useState,
    useEffect,
    useMemo,
    useCallback,
    memo,
    Suspense,
    type JSX,
} from "react";
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
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// ============================================================================
// CONSTANTS AND CONFIGURATION
// ============================================================================

/**
 * Form validation constants
 */
const FORM_VALIDATION = {
    NAME_MIN_LENGTH: 2,
    MESSAGE_MIN_LENGTH: 10,
    NAME_ERROR: "Name must be at least 2 characters.",
    EMAIL_ERROR: "Please enter a valid email address.",
    MESSAGE_ERROR: "Message must be at least 10 characters.",
} as const;

/**
 * UI text constants
 */
const UI_TEXT = {
    SECTION_TITLE: "Get in Touch",
    SECTION_DESCRIPTION:
        "Have a question or ready to plan your trip? Send us a message!",
    FORM_PLACEHOLDERS: {
        NAME: "Your Name",
        EMAIL: "Your Email",
        MESSAGE: "Your Message",
    },
    BUTTON_TEXT: {
        SUBMIT: "Send Message",
        CLOSE: "Close",
    },
    LOADING_FALLBACK: "Loading form...",
    SUCCESS_TITLE: "Message Sent!",
    ERROR_TITLE: "Oh no!",
    DEFAULT_ERROR: "An unexpected error occurred.",
} as const;

/**
 * Form styling constants
 */
const FORM_STYLES = {
    CONTAINER: "mx-auto w-full max-w-sm lg:max-w-md",
    FORM_GRID: "grid gap-4",
    INPUT_CLASSES:
        "bg-bg-alternate text-special-card-fg placeholder:text-special-card-fg/70",
    TEXTAREA_CLASSES:
        "min-h-[120px] bg-bg-alternate text-special-card-fg placeholder:text-special-card-fg/70",
    BUTTON_CLASSES: "w-full",
} as const;

/**
 * Section styling constants
 */
const SECTION_STYLES = {
    SECTION: "relative w-full pb-16",
    CONTAINER:
        "container grid items-center justify-center gap-4 px-4 text-center md:px-6 z-10",
    HEADER_WRAPPER: "space-y-3",
    TITLE: "text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline",
    DESCRIPTION:
        "mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed",
} as const;

/**
 * Base field configuration interface
 */
interface BaseFieldConfig {
    name: keyof ContactFormData;
    placeholder: string;
    id?: string;
    type?: string;
    autoComplete?: string;
}

/**
 * Form field configuration
 */
const FORM_FIELDS = {
    NAME: {
        name: "name" as const,
        id: "name-input",
        autoComplete: "off",
        placeholder: UI_TEXT.FORM_PLACEHOLDERS.NAME,
    } satisfies BaseFieldConfig,
    EMAIL: {
        name: "email" as const,
        id: "email-input",
        type: "email",
        autoComplete: "on",
        placeholder: UI_TEXT.FORM_PLACEHOLDERS.EMAIL,
    } satisfies BaseFieldConfig,
    MESSAGE: {
        name: "message" as const,
        placeholder: UI_TEXT.FORM_PLACEHOLDERS.MESSAGE,
    } satisfies BaseFieldConfig,
} as const;

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

/**
 * Contact form schema for validation
 */
const contactSchema = z.object({
    name: z
        .string()
        .min(FORM_VALIDATION.NAME_MIN_LENGTH, FORM_VALIDATION.NAME_ERROR),
    email: z.string().email(FORM_VALIDATION.EMAIL_ERROR),
    message: z
        .string()
        .min(FORM_VALIDATION.MESSAGE_MIN_LENGTH, FORM_VALIDATION.MESSAGE_ERROR),
});

/**
 * Type for contact form data
 */
type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Dialog state interface for better type safety
 */
interface DialogState {
    title: string;
    description: string;
}

/**
 * Contact form props interface
 */
interface ContactFormProps {
    className?: string;
}

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Custom hook for managing contact form state and logic
 * Encapsulates form handling, submission, and dialog management
 */
const useContactForm = () => {
    const searchParams = useSearchParams();
    const initialMessage = searchParams.get("message") || "";
    const [isLoading, setIsLoading] = useState(false);
    const [dialogState, setDialogState] = useState<DialogState | null>(null);

    // Form configuration with proper typing
    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: initialMessage,
        },
    });

    // Update message field when URL parameter changes
    useEffect(() => {
        form.setValue("message", initialMessage);
    }, [initialMessage, form]);

    // Memoized form reset values to prevent unnecessary re-renders
    const resetValues = useMemo(
        () => ({
            name: "",
            email: "",
            message: "",
        }),
        [],
    );

    // Optimized submit handler with proper error handling
    const onSubmit = useCallback(
        async (data: ContactFormData): Promise<void> => {
            setIsLoading(true);
            setDialogState(null);

            try {
                const result = await handleContactRequest(data);

                if (result.success && result.data) {
                    setDialogState({
                        title: UI_TEXT.SUCCESS_TITLE,
                        description: result.data.confirmation,
                    });
                    form.reset(resetValues);
                } else {
                    setDialogState({
                        title: UI_TEXT.ERROR_TITLE,
                        description: result.error ?? UI_TEXT.DEFAULT_ERROR,
                    });
                }
            } catch (error) {
                // Additional error handling for network issues
                setDialogState({
                    title: UI_TEXT.ERROR_TITLE,
                    description: UI_TEXT.DEFAULT_ERROR,
                });
            } finally {
                setIsLoading(false);
            }
        },
        [form, resetValues],
    );

    // Memoized dialog close handler
    const closeDialog = useCallback(() => {
        setDialogState(null);
    }, []);

    return {
        form,
        isLoading,
        dialogState,
        onSubmit,
        closeDialog,
    };
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Form field component for consistent styling and accessibility
 */
const FormFieldComponent = memo<{
    control: any;
    name: keyof ContactFormData;
    fieldConfig: BaseFieldConfig;
    className?: string;
    isTextarea?: boolean;
}>(({ control, name, fieldConfig, className, isTextarea = false }) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormControl>
                    {isTextarea ? (
                        <Textarea
                            placeholder={fieldConfig.placeholder}
                            className={`${FORM_STYLES.TEXTAREA_CLASSES} ${className || ""}`}
                            aria-label={fieldConfig.placeholder}
                            {...field}
                        />
                    ) : (
                        <Input
                            id={fieldConfig.id}
                            type={fieldConfig.type || "text"}
                            autoComplete={fieldConfig.autoComplete}
                            placeholder={fieldConfig.placeholder}
                            className={`${FORM_STYLES.INPUT_CLASSES} ${className || ""}`}
                            aria-label={fieldConfig.placeholder}
                            {...field}
                        />
                    )}
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
));

FormFieldComponent.displayName = "FormFieldComponent";

/**
 * Success/Error dialog component with proper accessibility
 */
const ContactDialog = memo<{
    dialogState: DialogState | null;
    onClose: () => void;
}>(({ dialogState, onClose }) => (
    <AlertDialog open={!!dialogState} onOpenChange={onClose}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{dialogState?.title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {dialogState?.description}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={onClose} aria-label="Close dialog">
                    {UI_TEXT.BUTTON_TEXT.CLOSE}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
));

ContactDialog.displayName = "ContactDialog";

/**
 * Main contact form component with enhanced accessibility and performance
 */
const ContactForm = memo<ContactFormProps>(({ className }) => {
    const { form, isLoading, dialogState, onSubmit, closeDialog } =
        useContactForm();
    const prefersReducedMotion = useReducedMotion();

    return (
        <>
            <div className={`${FORM_STYLES.CONTAINER} ${className || ""}`}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={FORM_STYLES.FORM_GRID}
                        noValidate
                        aria-label="Contact form"
                    >
                        <FormFieldComponent
                            control={form.control}
                            name="name"
                            fieldConfig={FORM_FIELDS.NAME}
                        />

                        <FormFieldComponent
                            control={form.control}
                            name="email"
                            fieldConfig={FORM_FIELDS.EMAIL}
                        />

                        <FormFieldComponent
                            control={form.control}
                            name="message"
                            fieldConfig={FORM_FIELDS.MESSAGE}
                            isTextarea
                        />

                        <Button
                            type="submit"
                            className={FORM_STYLES.BUTTON_CLASSES}
                            disabled={isLoading}
                            aria-label={
                                isLoading
                                    ? "Sending message..."
                                    : "Send message"
                            }
                        >
                            {isLoading ? (
                                <Loader2
                                    className={`animate-spin ${prefersReducedMotion ? "animate-none" : ""}`}
                                    aria-hidden="true"
                                />
                            ) : (
                                UI_TEXT.BUTTON_TEXT.SUBMIT
                            )}
                        </Button>
                    </form>
                </Form>
            </div>

            <ContactDialog dialogState={dialogState} onClose={closeDialog} />
        </>
    );
});

ContactForm.displayName = "ContactForm";

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================

/**
 * ContactSection Component
 *
 * A comprehensive contact section with an accessible form, proper error handling,
 * and responsive design. Features include:
 * - Form validation with Zod schema
 * - Accessibility enhancements (ARIA labels, semantic HTML)
 * - Performance optimizations (memoization, custom hooks)
 * - Reduced motion support for animations
 * - Mobile-responsive design
 * - Proper error handling and user feedback
 */
export default function ContactSection(): JSX.Element {
    return (
        <section
            id="contact"
            className={SECTION_STYLES.SECTION}
            aria-labelledby="contact-heading"
        >
            <div className={SECTION_STYLES.CONTAINER}>
                <div className={SECTION_STYLES.HEADER_WRAPPER}>
                    <h2 id="contact-heading" className={SECTION_STYLES.TITLE}>
                        {UI_TEXT.SECTION_TITLE}
                    </h2>
                    <p className={SECTION_STYLES.DESCRIPTION}>
                        {UI_TEXT.SECTION_DESCRIPTION}
                    </p>
                </div>
                <Suspense
                    fallback={
                        <div role="status" aria-label="Loading contact form">
                            {UI_TEXT.LOADING_FALLBACK}
                        </div>
                    }
                >
                    <ContactForm />
                </Suspense>
            </div>
        </section>
    );
}
