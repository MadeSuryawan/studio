"use client";

import {
    type FC,
    type JSX,
    type ChangeEvent,
    type CSSProperties,
    type ReactNode,
    type InputHTMLAttributes,
    type ForwardedRef,
    type MouseEvent,
    type RefAttributes,
    useState,
    useEffect,
    useRef,
    memo,
    forwardRef,
} from "react";
import {
    motion,
    useAnimation,
    useInView,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
} from "framer-motion";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GradientButton } from "@/components/ui/gradient-button";

const GoogleIcon = memo(
    ({
        className,
        ...props
    }: {
        className?: string;
    } & RefAttributes<SVGSVGElement>): JSX.Element => (
        <div className={cn("relatives scale-[1.5]")}>
            <FontAwesomeIcon
                icon={faGoogle}
                className={cn("relative", className)}
                viewBox="0 0 24 24"
                {...props}
            />
        </div>
    ),
);
GoogleIcon.displayName = "GoogleIcon";
export { GoogleIcon };

const revealBox = "#5046e6a2";

// Constants for form validation
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REQUIREMENTS = {
    minLength: PASSWORD_MIN_LENGTH,
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /\d/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
} as const;

// Zod schema for sign-up form validation
const signUpSchema = z.object({
    name: z
        .string()
        .min(1, "Full name is required")
        .min(2, "Full name must be at least 2 characters")
        .max(50, "Full name must be less than 50 characters")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Full name can only contain letters, spaces, hyphens, and apostrophes",
        ),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .max(100, "Email must be less than 100 characters"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(
            PASSWORD_MIN_LENGTH,
            `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
        )
        .max(128, "Password must be less than 128 characters")
        .regex(
            PASSWORD_REQUIREMENTS.hasUppercase,
            "Password must contain at least one uppercase letter",
        )
        .regex(
            PASSWORD_REQUIREMENTS.hasLowercase,
            "Password must contain at least one lowercase letter",
        )
        .regex(
            PASSWORD_REQUIREMENTS.hasNumber,
            "Password must contain at least one number",
        )
        .regex(
            PASSWORD_REQUIREMENTS.hasSpecialChar,
            "Password must contain at least one special character",
        ),
});

// Type inference from Zod schema
type SignUpFormData = z.infer<typeof signUpSchema>;

// Password strength types
type PasswordStrengthLevel = "weak" | "medium" | "strong";

// Password strength checker utility
const checkPasswordStrength = (password: string) => {
    const checks = {
        length: password.length >= PASSWORD_MIN_LENGTH,
        uppercase: PASSWORD_REQUIREMENTS.hasUppercase.test(password),
        lowercase: PASSWORD_REQUIREMENTS.hasLowercase.test(password),
        number: PASSWORD_REQUIREMENTS.hasNumber.test(password),
        special: PASSWORD_REQUIREMENTS.hasSpecialChar.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    const strength: PasswordStrengthLevel =
        score <= 2 ? "weak" : score <= 4 ? "medium" : "strong";

    return { checks, score, strength };
};

// Password Strength Indicator Component
interface PasswordStrengthProps {
    password: string;
    className?: string;
}

const PasswordStrength: FC<PasswordStrengthProps> = memo(
    ({ password, className }) => {
        const { checks, strength } = checkPasswordStrength(password);

        if (!password) {
            return null;
        }

        const strengthColors: Record<PasswordStrengthLevel, string> = {
            weak: "bg-red-500",
            medium: "bg-yellow-500",
            strong: "bg-green-500",
        };

        const strengthWidths: Record<PasswordStrengthLevel, string> = {
            weak: "w-1/3",
            medium: "w-2/3",
            strong: "w-full",
        };

        return (
            <div className={cn("space-y-2", className)}>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                        Password strength:
                    </span>
                    <span
                        className={cn(
                            "text-xs font-medium capitalize",
                            strength === "weak" && "text-red-500",
                            strength === "medium" && "text-yellow-500",
                            strength === "strong" && "text-green-500",
                        )}
                    >
                        {strength}
                    </span>
                </div>

                <div
                    className={cn(
                        "w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700",
                    )}
                >
                    <div
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            strengthColors[strength],
                            strengthWidths[strength],
                        )}
                    />
                </div>

                <div className="space-y-1">
                    {Object.entries(checks).map(([key, passed]) => {
                        const labels = {
                            length: `At least ${PASSWORD_MIN_LENGTH} characters`,
                            uppercase: "One uppercase letter",
                            lowercase: "One lowercase letter",
                            number: "One number",
                            special: "One special character",
                        };

                        return (
                            <div key={key} className="flex items-center gap-2">
                                <div
                                    className={cn(
                                        "w-3 h-3 rounded-full flex items-center justify-center",
                                        passed ? "bg-green-500" : "bg-gray-300",
                                    )}
                                >
                                    {passed && (
                                        <svg
                                            className={cn("w-2 h-2 text-white")}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        "text-xs",
                                        passed
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-gray-500",
                                    )}
                                >
                                    {labels[key as keyof typeof labels]}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },
);
PasswordStrength.displayName = "PasswordStrength";

// GlowEffect Component
export type GlowEffectProps = {
    className?: string;
    style?: CSSProperties;
    colors?: string[];
    mode?:
        | "rotate"
        | "pulse"
        | "breathe"
        | "colorShift"
        | "flowHorizontal"
        | "static";
    blur?:
        | number
        | "softest"
        | "soft"
        | "medium"
        | "strong"
        | "stronger"
        | "strongest"
        | "none";
    transition?: object;
    scale?: number;
    duration?: number;
};

function GlowEffect({
    className,
    style,
    colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"],
    mode = "rotate",
    blur = "medium",
    transition,
    scale = 1,
    duration = 5,
}: GlowEffectProps) {
    const BASE_TRANSITION = {
        repeat: Infinity,
        duration: duration,
        ease: "linear" as const,
    };

    // Create animation based on mode to avoid complex union types
    const getAnimation = () => {
        switch (mode) {
            case "rotate":
                return {
                    background: [
                        `conic-gradient(from 0deg at 50% 50%, ${colors.join(", ")})`,
                        `conic-gradient(from 360deg at 50% 50%, ${colors.join(", ")})`,
                    ],
                    transition: transition ?? BASE_TRANSITION,
                };
            case "pulse":
                return {
                    background: colors.map(
                        (color) =>
                            `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`,
                    ),
                    scale: [1 * scale, 1.1 * scale, 1 * scale],
                    opacity: [0.5, 0.8, 0.5],
                    transition: transition ?? {
                        ...BASE_TRANSITION,
                        repeatType: "mirror" as const,
                    },
                };
            case "breathe":
                return {
                    background: colors.map(
                        (color) =>
                            `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`,
                    ),
                    scale: [1 * scale, 1.05 * scale, 1 * scale],
                    transition: transition ?? {
                        ...BASE_TRANSITION,
                        repeatType: "mirror" as const,
                    },
                };
            case "colorShift":
                return {
                    background: colors.map((color, index) => {
                        const nextColor = colors[(index + 1) % colors.length];
                        return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`;
                    }),
                    transition: transition ?? {
                        ...BASE_TRANSITION,
                        repeatType: "mirror" as const,
                    },
                };
            case "flowHorizontal":
                return {
                    background: colors.map((color) => {
                        const nextColor =
                            colors[(colors.indexOf(color) + 1) % colors.length];
                        return `linear-gradient(to right, ${color}, ${nextColor})`;
                    }),
                    transition: transition ?? {
                        ...BASE_TRANSITION,
                        repeatType: "mirror" as const,
                    },
                };
            case "static":
            default:
                return {
                    background: `linear-gradient(to right, ${colors.join(", ")})`,
                };
        }
    };

    const getBlurClass = (blur: GlowEffectProps["blur"]) => {
        if (typeof blur === "number") {
            return `blur-[${blur}px]`;
        }

        const presets = {
            softest: "blur-sm",
            soft: "blur",
            medium: "blur-md",
            strong: "blur-lg",
            stronger: "blur-xl",
            strongest: "blur-xl",
            none: "blur-none",
        };

        return presets[blur as keyof typeof presets];
    };

    return (
        <motion.div
            style={
                {
                    ...style,
                    "--scale": scale,
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                } as CSSProperties
            }
            animate={getAnimation()}
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full",
                "scale-[var(--scale)] transform-gpu",
                getBlurClass(blur),
                className,
            )}
        />
    );
}

// BoxReveal Component
type BoxRevealProps = {
    children: ReactNode;
    width?: string;
    boxColor?: string;
    duration?: number;
    overflow?: string;
    position?: string;
    className?: string;
};

const BoxReveal = memo(
    ({
        children,
        width = "fit-content",
        boxColor,
        duration,
        overflow = "hidden",
        position = "relative",
        className,
    }: BoxRevealProps) => {
        const mainControls = useAnimation();
        const slideControls = useAnimation();
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });

        useEffect(() => {
            if (isInView) {
                slideControls.start("visible");
                mainControls.start("visible");
            } else {
                slideControls.start("hidden");
                mainControls.start("hidden");
            }
        }, [isInView, mainControls, slideControls]);

        return (
            <section
                ref={ref}
                style={{
                    position: position as
                        | "relative"
                        | "absolute"
                        | "fixed"
                        | "sticky"
                        | "static",
                    width,
                    overflow,
                }}
                className={className}
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 75 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: duration ?? 0.5, delay: 0.25 }}
                >
                    {children}
                </motion.div>
                <motion.div
                    variants={{
                        hidden: { left: 0 },
                        visible: { left: "100%" },
                    }}
                    initial="hidden"
                    animate={slideControls}
                    transition={{ duration: duration ?? 0.5, ease: "easeIn" }}
                    style={{
                        position: "absolute",
                        top: 4,
                        bottom: 4,
                        left: 0,
                        right: 0,
                        zIndex: 20,
                        background: boxColor ?? revealBox,
                        borderRadius: 4,
                    }}
                />
            </section>
        );
    },
);
BoxReveal.displayName = "BoxReveal";

// Enhanced Input Component with accessibility improvements
const EnhancedInput = memo(
    forwardRef(
        (
            {
                className,
                type,
                ...props
            }: InputHTMLAttributes<HTMLInputElement>,
            ref: ForwardedRef<HTMLInputElement>,
        ) => {
            const radius = 100;
            const [visible, setVisible] = useState(false);
            const prefersReducedMotion = useReducedMotion();

            const mouseX = useMotionValue(0);
            const mouseY = useMotionValue(0);

            function handleMouseMove({
                currentTarget,
                clientX,
                clientY,
            }: MouseEvent<HTMLDivElement>) {
                // Skip animation if user prefers reduced motion
                if (prefersReducedMotion) {
                    return;
                }

                const { left, top } = currentTarget.getBoundingClientRect();
                mouseX.set(clientX - left);
                mouseY.set(clientY - top);
            }

            return (
                <motion.div
                    style={{
                        background: prefersReducedMotion
                            ? "transparent"
                            : useMotionTemplate`
                            radial-gradient(
                              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                              #3b82f6,
                              transparent 80%
                            )
                          `,
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() =>
                        !prefersReducedMotion && setVisible(true)
                    }
                    onMouseLeave={() =>
                        !prefersReducedMotion && setVisible(false)
                    }
                    className={cn(
                        "group/input rounded-lg p-[2px] transition duration-300",
                    )}
                >
                    <input
                        type={type}
                        className={cn(
                            "shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600",
                            // Allow browser autofill styling
                            "autofill:bg-gray-50 autofill:text-black dark:autofill:bg-zinc-800 dark:autofill:text-white",
                            "autofill:shadow-[inset_0_0_0px_1000px_rgb(249_250_251)] dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(39_39_42)]",
                            className,
                        )}
                        ref={ref}
                        {...props}
                    />
                </motion.div>
            );
        },
    ),
);

// Form Field Component with enhanced accessibility
interface FormFieldProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    icon: ReactNode;
    showToggle?: boolean;
    onToggle?: () => void;
    showPassword?: boolean;
    required?: boolean;
    error?: string;
    autoComplete?: string;
    name?: string;
    "data-form-type"?: string;
}

const FormField: FC<FormFieldProps> = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    icon,
    showToggle,
    onToggle,
    showPassword,
    required,
    error,
    autoComplete,
    name,
    "data-form-type": dataFormType,
}) => {
    const fieldId = name || label.toLowerCase().replace(/\s+/g, "-");

    return (
        <div
            className={cn(
                "space-y-2",
                "flex flex-col justify-evenly",
                // "bg-amber-300",
            )}
        >
            <BoxReveal boxColor={revealBox} duration={0.3}>
                <Label htmlFor={fieldId} id={`label-${fieldId}`}>
                    {label}{" "}
                    {required && (
                        <span className="text-red-500" aria-label="required">
                            *
                        </span>
                    )}
                </Label>
            </BoxReveal>

            <BoxReveal boxColor={revealBox} duration={0.3} width="100%">
                {/* Input with Icon and Toggle */}
                <div className="relative">
                    {/* Icon */}
                    <div
                        className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2",
                            "text-muted-foreground",
                        )}
                    >
                        {icon}
                    </div>

                    <EnhancedInput
                        id={fieldId}
                        name={name || fieldId}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        className={cn("pl-10 pr-12")}
                        aria-invalid={error ? "true" : "false"}
                        aria-describedby={
                            error ? `${fieldId}-error` : undefined
                        }
                        data-form-type={dataFormType}
                        data-lpignore="false"
                    />
                    {showToggle && (
                        <button
                            type="button"
                            onClick={onToggle}
                            className={cn(
                                "absolute right-3 top-1/2 -translate-y-1/2",
                                "text-muted-foreground hover:text-foreground transition-colors",
                            )}
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    )}
                </div>

                {/* Error Message */}
                <div className="relative h-[24px] mt-1">
                    {error && (
                        <p
                            id={`${fieldId}-error`}
                            className={cn("text-red-500 text-xs")}
                            role="alert"
                            aria-live="polite"
                        >
                            {error}
                        </p>
                    )}
                </div>
            </BoxReveal>
        </div>
    );
};

// Main Sign Up Form Component

interface SignUpFormProps {
    onSubmit?: (data: SignUpFormData) => void;
    onGoogleSignUp?: () => void;
    onSignInClick?: () => void;
}

const BaliBlissedSignUpForm: FC<SignUpFormProps> = ({
    onSubmit = (data) => console.log("Sign up:", data),
    onGoogleSignUp = () => console.log("Google sign up"),
    onSignInClick = () => console.log("Switch to sign in"),
}: SignUpFormProps): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [isError, setIsError] = useState(false);

    // Ref to store timeout ID for cleanup
    const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // React Hook Form with Zod validation
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        clearErrors,
        reset,
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange", // Validate on change for better UX
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // Watch form values for controlled components
    const formValues = watch();

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (successTimeoutRef.current) {
                clearTimeout(successTimeoutRef.current);
            }
        };
    }, []);

    // Handle form submission with Zod validation
    const onFormSubmit = async (data: SignUpFormData) => {
        try {
            // Clear any previous error states
            setIsError(false);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            onSubmit(data);

            // Show success state
            setIsCreated(true);

            // Reset all form fields and states after successful submission
            reset({
                name: "",
                email: "",
                password: "",
            });

            // Reset component states
            setShowPassword(false);

            // Clear any remaining errors
            clearErrors();

            // Auto-hide success message after 3 seconds
            successTimeoutRef.current = setTimeout(() => {
                setIsCreated(false);
            }, 3000);
        } catch (error) {
            console.error("Sign up error:", error);
            setIsError(true);
            setIsCreated(false);
            // Handle submission errors here
        }
    };

    // Handle input changes for controlled components
    const handleInputChange =
        (field: keyof SignUpFormData) => (e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setValue(field, value, { shouldValidate: true });

            // Clear errors when user starts typing
            if (errors[field]) {
                clearErrors(field);
            }

            // Clear success/error states when user starts typing again
            if (isCreated) {
                setIsCreated(false);
                // Clear the auto-hide timeout if user starts typing
                if (successTimeoutRef.current) {
                    clearTimeout(successTimeoutRef.current);
                    successTimeoutRef.current = null;
                }
            }
            if (isError) {
                setIsError(false);
            }
        };

    return (
        <div
            className={cn(
                "min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden",
            )}
        >
            {/* Background Glow Effect */}
            <div className={cn("absolute inset-0")}>
                <GlowEffect
                    colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
                    mode="pulse"
                    blur="strongest"
                    className="opacity-20"
                />
            </div>

            <div className={cn("relative z-10 w-full max-w-md mx-auto")}>
                <div
                    className={cn(
                        "bg-card/80 backdrop-blur-xl border border-border",
                        "rounded-2xl p-6 sm:p-8 shadow-2xl",
                    )}
                >
                    {/* Header */}
                    <div
                        className={cn(
                            "flex flex-col items-center justify-center text-center mb-8",
                        )}
                    >
                        <BoxReveal boxColor={revealBox} duration={0.3}>
                            <div
                                className={cn(
                                    "inline-flex items-center justify-center",
                                    "w-16 h-16 bg-primary/10 rounded-full mb-4",
                                )}
                            >
                                <User className={cn("w-8 h-8 text-primary")} />
                            </div>
                        </BoxReveal>

                        <BoxReveal boxColor={revealBox} duration={0.3}>
                            <h1
                                className={cn(
                                    "text-3xl font-bold text-foreground mb-2",
                                )}
                            >
                                Join BaliBlissed
                            </h1>
                        </BoxReveal>

                        <BoxReveal boxColor={revealBox} duration={0.3}>
                            <p className={cn("text-muted-foreground")}>
                                Create your account to start your Bali adventure
                            </p>
                        </BoxReveal>
                    </div>

                    {/* Success Message */}
                    {isCreated && (
                        <BoxReveal
                            boxColor={revealBox}
                            duration={0.3}
                            width="100%"
                        >
                            <div
                                className={cn(
                                    "mb-6 p-4 rounded-lg border",
                                    "bg-green-50 border-green-200 text-green-800",
                                    "dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
                                )}
                                role="alert"
                                aria-live="polite"
                            >
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-medium">
                                            Account Created Successfully!
                                        </h3>
                                        <p className="text-sm mt-1">
                                            Welcome to BaliBlissed! Your account
                                            has been created and you can now
                                            start exploring.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </BoxReveal>
                    )}

                    {/* Error Message */}
                    {isError && (
                        <BoxReveal
                            boxColor={revealBox}
                            duration={0.3}
                            width="100%"
                        >
                            <div
                                className={cn(
                                    "mb-6 p-4 rounded-lg border",
                                    "bg-red-50 border-red-200 text-red-800",
                                    "dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
                                )}
                                role="alert"
                                aria-live="polite"
                            >
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-medium">
                                            Sign Up Failed
                                        </h3>
                                        <p className="text-sm mt-1">
                                            There was an error creating your
                                            account. Please try again.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </BoxReveal>
                    )}

                    {/* Google Sign Up Button */}
                    <BoxReveal
                        boxColor={revealBox}
                        duration={0.3}
                        overflow="visible"
                        className="mx-auto"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className={cn(
                                "w-full mb-6 relative group overflow-hidden",
                                "shadow-[-2px_-2px_5px_rgba(255,_255,_255,_0.5),3px_3px_8px_rgba(129,_140,_155,_0.4)]",
                                "hover:shadow-[inset_2px_2px_7px_rgba(0,_0,_0,_0.5),_inset_-3px_-3px_7px_rgba(255,255,255,_1)]",
                                "dark:shadow-[-2px_-2px_5px_rgba(162,_162,_162,_0.1),_2px_2px_5px_rgba(0,_0,_0,_0.5)]",
                                "dark:hover:shadow-[inset_-2px_-2px_5px_rgba(255,_255,_255,_0.05),inset_2px_2px_5px_rgba(0,_0,_0,_0.5)]",
                            )}
                            onClick={onGoogleSignUp}
                        >
                            <GoogleIcon className="mr-2" />
                            Continue with Google
                            <div
                                className={cn(
                                    "absolute inset-0",
                                    "bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full",
                                    "group-hover:translate-x-full transition-transform duration-1000 ease-in-out",
                                )}
                            />
                        </Button>
                    </BoxReveal>

                    {/* Divider */}
                    <BoxReveal
                        boxColor={revealBox}
                        duration={0.3}
                        className="mx-auto"
                    >
                        <div className={cn("relative mb-6", "rounded-sm")}>
                            <div
                                className={cn(
                                    "relative flex justify-center text-sm",
                                )}
                            >
                                <span
                                    className={cn(
                                        "px-2 bg-card text-muted-foreground",
                                        "rounded-sm",
                                    )}
                                >
                                    or
                                </span>
                            </div>
                        </div>
                    </BoxReveal>

                    {/* Sign Up Form */}
                    <form
                        onSubmit={handleSubmit(onFormSubmit)}
                        method="post"
                        action="/sign-up"
                        autoComplete="on"
                        aria-label="Sign up form"
                    >
                        <FormField
                            label="Full Name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formValues.name}
                            onChange={handleInputChange("name")}
                            icon={<User size={18} />}
                            autoComplete="name"
                            required
                            error={errors.name?.message}
                        />

                        <FormField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={formValues.email}
                            onChange={handleInputChange("email")}
                            icon={<Mail size={18} />}
                            autoComplete="email"
                            required
                            error={errors.email?.message}
                        />

                        <div className={cn("space-y-3")}>
                            <FormField
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={formValues.password}
                                onChange={handleInputChange("password")}
                                icon={<Lock size={18} />}
                                autoComplete="new-password"
                                data-form-type="password"
                                showToggle
                                onToggle={() => setShowPassword(!showPassword)}
                                showPassword={showPassword}
                                required
                                error={errors.password?.message}
                            />

                            {/* Password Strength Indicator */}
                            {formValues.password && (
                                <BoxReveal
                                    boxColor={revealBox}
                                    duration={0.3}
                                    width="100%"
                                >
                                    <PasswordStrength
                                        password={formValues.password}
                                        className="mb-3"
                                    />
                                </BoxReveal>
                            )}
                        </div>

                        <BoxReveal
                            boxColor={revealBox}
                            duration={0.3}
                            overflow="visible"
                            className="mx-auto"
                        >
                            <GradientButton
                                type="submit"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                loadingText="Signing up..."
                                iconPosition="right"
                                // successState={isCreated}
                                // errorState={isError}
                                variant="accent"
                                textShadow="none"
                                className={cn(
                                    "w-[170px] relative group",
                                    "bg-[#7ff5febc] dark:bg-[#6ecdd3fd]",
                                    "text-primary-foreground/80 text-nowrap",
                                    "py-1 px-2 rounded-md mt-2",
                                    "font-medium darkk:transition-all duration-300 ease-in-out",
                                    "focus:outline-none focus:ring-2 focus:ring-primary",
                                    "focus:ring-offset-2 disabled:opacity-50",
                                    "disabled:cursor-not-allowed overflow-hidden",
                                    "shadow-[-2px_-2px_5px_rgba(255,_255,_255,_0.5),3px_3px_8px_rgba(129,_140,_155,_0.4)]",
                                    "hover:shadow-[inset_2px_2px_7px_rgba(0,_0,_0,_0.5),_inset_-3px_-3px_7px_rgba(255,255,255,_1)]",
                                    "dark:shadow-[-2px_-2px_5px_rgba(162,_162,_162,_0.1),_2px_2px_5px_rgba(0,_0,_0,_0.5)]",
                                    "dark:hover:shadow-[inset_-2px_-2px_5px_rgba(255,_255,_255,_0.05),inset_2px_2px_5px_rgba(0,_0,_0,_0.5)]",
                                    "nav-border",
                                    "dark:border-none",
                                    "hover:border-transparent",
                                    "transition-none",
                                )}
                                aria-describedby={
                                    isSubmitting ? "submit-loading" : undefined
                                }
                            >
                                <span
                                    className={cn(
                                        "transition-opacity duration-200",
                                        isSubmitting
                                            ? "opacity-0"
                                            : "opacity-100",
                                    )}
                                >
                                    Create Account
                                </span>

                                {isSubmitting && (
                                    <div
                                        className={cn(
                                            "absolute inset-0 flex items-center justify-center",
                                        )}
                                        id="submit-loading"
                                        aria-label="Creating account, please wait"
                                    >
                                        <div
                                            className={cn(
                                                "w-5 h-5 border-2 border-primary-foreground/30",
                                                "border-t-primary-foreground rounded-full animate-spin",
                                            )}
                                        />
                                    </div>
                                )}

                                {/* Gradient Effect */}
                                <div
                                    className={cn(
                                        "absolute inset-0",
                                        "bg-gradient-to-r from-transparent via-white/20 to-transparent",
                                        "-translate-x-full group-hover:translate-x-full",
                                        "transition-transform duration-1000 ease-in-out",
                                    )}
                                />
                            </GradientButton>
                        </BoxReveal>
                    </form>

                    {/* Footer */}
                    <BoxReveal
                        boxColor={revealBox}
                        duration={0.3}
                        className={cn("mx-auto", "mt-5")}
                    >
                        <div
                            className={cn("mt-8 text-center relative my-auto")}
                        >
                            <p className={cn("text-sm text-muted-foreground")}>
                                Already have an account?
                                <button
                                    type="button"
                                    onClick={onSignInClick}
                                    className={cn(
                                        "text-accent dark:text-primary",
                                        "hover:underline hover:underline-offset-3 hover:scale-105",
                                        "font-medium",
                                        "text-md",
                                        "pl-2",
                                        "will-change-auto",
                                        "transition-all duration-200 ease-in-out",
                                    )}
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </BoxReveal>
                </div>
            </div>
        </div>
    );
};

export default function SignUpForm() {
    return <BaliBlissedSignUpForm />;
}
