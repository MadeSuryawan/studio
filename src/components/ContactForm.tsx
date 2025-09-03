// src/components/ContactForm.tsx
"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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

// ============================================================================
// CONSTANTS AND CONFIGURATION
// ============================================================================

/**
 * Form validation constants for better maintainability
 */
const FORM_VALIDATION = {
    NAME_MIN_LENGTH: 2,
    MESSAGE_MIN_LENGTH: 10,
    NAME_ERROR: "Name must be at least 2 characters.",
    EMAIL_ERROR: "Please enter a valid email address.",
    MESSAGE_ERROR: "Message must be at least 10 characters.",
} as const;

/**
 * Animation configuration constants
 * Respects user's motion preferences
 */
const ANIMATION_CONFIG = {
    FORM_CONTAINER: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3, ease: "easeOut" },
    },
    FIELD_STAGGER: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2, ease: "easeOut" },
    },
    BUTTON_LOADING: {
        initial: { scale: 1 },
        animate: { scale: 1.02 },
        transition: { duration: 0.1, ease: "easeInOut" },
    },
    DIALOG_OVERLAY: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
    },
} as const;

/**
 * CSS class constants for consistent styling
 */
const FORM_STYLES = {
    CONTAINER: "mx-auto w-full max-w-sm lg:max-w-md",
    FORM: "grid gap-4",
    INPUT_BASE:
        "bg-bg-alternate text-special-card-fg placeholder:text-special-card-fg/70",
    TEXTAREA:
        "min-h-[120px] bg-bg-alternate text-special-card-fg placeholder:text-special-card-fg/70",
    BUTTON: "w-full",
} as const;

/**
 * ARIA labels and accessibility constants
 */
const ACCESSIBILITY = {
    FORM_TITLE: "contact-form-title",
    NAME_LABEL: "Your Name",
    EMAIL_LABEL: "Your Email",
    MESSAGE_LABEL: "Your Message",
    SUBMIT_IDLE: "Send Message",
    SUBMIT_LOADING: "Sending message...",
    CLOSE_DIALOG: "Close dialog",
} as const;

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

/**
 * Contact form schema with extracted constants
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

    /**
     * Enhanced form submission handler with comprehensive error handling
     * Provides detailed error messages and proper loading states
     */
    const handleSubmit = useCallback(
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
                    // Reset form with proper default values
                    form.reset({
                        name: "",
                        email: "",
                        message: "",
                    });
                } else {
                    // Handle server-side errors with fallback message
                    setDialogState({
                        title: "Oh no!",
                        description:
                            result.error ?? "An unexpected error occurred.",
                    });
                }
            } catch (error) {
                // Enhanced error logging for debugging
                console.error("Contact form submission error:", error);

                // User-friendly error message
                setDialogState({
                    title: "Connection Error",
                    description:
                        "Unable to send your message. Please check your internet connection and try again.",
                });
            } finally {
                setIsLoading(false);
            }
        },
        [form],
    );

    /**
     * Memoized dialog close handler to prevent unnecessary re-renders
     */
    const closeDialog = useCallback(() => {
        setDialogState(null);
    }, []);

    return {
        form,
        isLoading,
        dialogState,
        handleSubmit,
        closeDialog,
    };
};

// ============================================================================
// COMPONENT IMPLEMENTATIONS
// ============================================================================

/**
 * Memoized form field component for better performance
 * Prevents unnecessary re-renders when other fields change
 */
const FormFieldComponent = memo<{
    name: keyof ContactFormData;
    control: any;
    type?: string;
    placeholder: string;
    ariaLabel: string;
    className: string;
    isTextarea?: boolean;
    prefersReducedMotion: boolean | null;
}>(
    ({
        name,
        control,
        type,
        placeholder,
        ariaLabel,
        className,
        isTextarea = false,
        prefersReducedMotion,
    }) => {
        // Memoized animation variants based on motion preference
        const fieldVariants = useMemo(() => {
            if (prefersReducedMotion) {
                return {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.1 },
                };
            }
            return ANIMATION_CONFIG.FIELD_STAGGER;
        }, [prefersReducedMotion]);

        return (
            <motion.div
                variants={fieldVariants}
                initial="initial"
                animate="animate"
            >
                <FormField
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                {isTextarea ? (
                                    <Textarea
                                        placeholder={placeholder}
                                        className={className}
                                        aria-label={ariaLabel}
                                        aria-required="true"
                                        {...field}
                                    />
                                ) : (
                                    <Input
                                        type={type}
                                        id={`${name}-input`}
                                        autoComplete={
                                            name === "email"
                                                ? "email"
                                                : name === "name"
                                                  ? "name"
                                                  : undefined
                                        }
                                        placeholder={placeholder}
                                        aria-label={ariaLabel}
                                        aria-required="true"
                                        {...field}
                                        className={className}
                                    />
                                )}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </motion.div>
        );
    },
);

FormFieldComponent.displayName = "FormFieldComponent";

/**
 * Memoized result dialog component with enhanced accessibility
 * Prevents re-renders and provides better UX
 */
const ResultDialog = memo<{
    dialogState: DialogState | null;
    onClose: () => void;
    prefersReducedMotion: boolean | null;
}>(({ dialogState, onClose, prefersReducedMotion }) => {
    // Memoized animation variants for dialog
    const dialogVariants = useMemo(() => {
        if (prefersReducedMotion) {
            return {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.1 },
            };
        }
        return ANIMATION_CONFIG.DIALOG_OVERLAY;
    }, [prefersReducedMotion]);

    return (
        <AnimatePresence>
            {dialogState && (
                <AlertDialog open={!!dialogState} onOpenChange={onClose}>
                    <AlertDialogContent asChild>
                        <motion.div
                            variants={dialogVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {dialogState.title}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    {dialogState.description}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction
                                    onClick={onClose}
                                    aria-label={ACCESSIBILITY.CLOSE_DIALOG}
                                >
                                    Close
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </motion.div>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </AnimatePresence>
    );
});

ResultDialog.displayName = "ResultDialog";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Enhanced ContactForm component with performance optimizations and accessibility improvements
 *
 * Features:
 * - React.memo for preventing unnecessary re-renders
 * - Framer Motion animations with reduced motion support
 * - Enhanced error handling and user feedback
 * - Comprehensive accessibility features
 * - Mobile-responsive design
 * - Extracted constants and reusable components
 */
const ContactForm = memo(() => {
    // Custom hook for form logic and state management
    const { form, isLoading, dialogState, handleSubmit, closeDialog } =
        useContactForm();

    // Motion preference detection for accessibility
    const prefersReducedMotion = useReducedMotion();

    // Memoized animation variants based on user preference
    const containerVariants = useMemo(() => {
        if (prefersReducedMotion) {
            return {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.1 },
            };
        }
        return ANIMATION_CONFIG.FORM_CONTAINER;
    }, [prefersReducedMotion]);

    // Memoized button animation for loading state
    const buttonVariants = useMemo(() => {
        if (prefersReducedMotion) {
            return {};
        }
        return ANIMATION_CONFIG.BUTTON_LOADING;
    }, [prefersReducedMotion]);

    // Memoized submit button content to prevent re-renders
    const submitButtonContent = useMemo(() => {
        if (isLoading) {
            return (
                <motion.div
                    className="flex items-center gap-2"
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                >
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    <span className="sr-only">
                        {ACCESSIBILITY.SUBMIT_LOADING}
                    </span>
                </motion.div>
            );
        }
        return ACCESSIBILITY.SUBMIT_IDLE;
    }, [isLoading, buttonVariants]);

    // Memoized form submit handler to prevent re-renders
    const onSubmit = useCallback(
        (data: ContactFormData) => {
            handleSubmit(data);
        },
        [handleSubmit],
    );

    return (
        <>
            <motion.div
                className={FORM_STYLES.CONTAINER}
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                <Form {...form}>
                    <motion.form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={FORM_STYLES.FORM}
                        noValidate
                        aria-labelledby={ACCESSIBILITY.FORM_TITLE}
                        initial="initial"
                        animate="animate"
                        variants={{
                            initial: {},
                            animate: {
                                transition: {
                                    staggerChildren: prefersReducedMotion
                                        ? 0
                                        : 0.1,
                                },
                            },
                        }}
                    >
                        {/* Name Field */}
                        <FormFieldComponent
                            name="name"
                            control={form.control}
                            placeholder={ACCESSIBILITY.NAME_LABEL}
                            ariaLabel={ACCESSIBILITY.NAME_LABEL}
                            className={FORM_STYLES.INPUT_BASE}
                            prefersReducedMotion={prefersReducedMotion}
                        />

                        {/* Email Field */}
                        <FormFieldComponent
                            name="email"
                            control={form.control}
                            type="email"
                            placeholder={ACCESSIBILITY.EMAIL_LABEL}
                            ariaLabel={ACCESSIBILITY.EMAIL_LABEL}
                            className={FORM_STYLES.INPUT_BASE}
                            prefersReducedMotion={prefersReducedMotion}
                        />

                        {/* Message Field */}
                        <FormFieldComponent
                            name="message"
                            control={form.control}
                            placeholder={ACCESSIBILITY.MESSAGE_LABEL}
                            ariaLabel={ACCESSIBILITY.MESSAGE_LABEL}
                            className={FORM_STYLES.TEXTAREA}
                            isTextarea={true}
                            prefersReducedMotion={prefersReducedMotion}
                        />

                        {/* Submit Button */}
                        <motion.div
                            variants={ANIMATION_CONFIG.FIELD_STAGGER}
                            initial="initial"
                            animate="animate"
                        >
                            <Button
                                type="submit"
                                className={FORM_STYLES.BUTTON}
                                disabled={isLoading}
                                aria-busy={isLoading}
                                aria-label={
                                    isLoading
                                        ? ACCESSIBILITY.SUBMIT_LOADING
                                        : ACCESSIBILITY.SUBMIT_IDLE
                                }
                            >
                                {submitButtonContent}
                            </Button>
                        </motion.div>
                    </motion.form>
                </Form>
            </motion.div>

            {/* Result Dialog */}
            <ResultDialog
                dialogState={dialogState}
                onClose={closeDialog}
                prefersReducedMotion={prefersReducedMotion}
            />
        </>
    );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
