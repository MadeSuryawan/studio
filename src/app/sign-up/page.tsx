"use client";

import {
    type FC,
    type ChangeEvent,
    type CSSProperties,
    type ReactNode,
    type InputHTMLAttributes,
    type ForwardedRef,
    type MouseEvent,
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
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    function PasswordStrength({ password, className }) {
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

                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
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
                                            className="w-2 h-2 text-white"
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

const BoxReveal = memo(function BoxReveal({
    children,
    width = "fit-content",
    boxColor,
    duration,
    overflow = "hidden",
    position = "relative",
    className,
}: BoxRevealProps) {
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
                variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
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
});

// Enhanced Input Component with accessibility improvements
const EnhancedInput = memo(
    forwardRef(function EnhancedInput(
        { className, type, ...props }: InputHTMLAttributes<HTMLInputElement>,
        ref: ForwardedRef<HTMLInputElement>,
    ) {
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
                onMouseEnter={() => !prefersReducedMotion && setVisible(true)}
                onMouseLeave={() => !prefersReducedMotion && setVisible(false)}
                className="group/input rounded-lg p-[2px] transition duration-300"
            >
                <input
                    type={type}
                    className={cn(
                        "shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
            </motion.div>
        );
    }),
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
}) => {
    const fieldId = name || label.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="space-y-2">
            <BoxReveal boxColor={revealBox} duration={0.3}>
                <Label htmlFor={fieldId}>
                    {label}{" "}
                    {required && (
                        <span className="text-red-500" aria-label="required">
                            *
                        </span>
                    )}
                </Label>
            </BoxReveal>

            <BoxReveal boxColor={revealBox} duration={0.3} width="100%">
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
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
                        className="pl-10 pr-12"
                        aria-invalid={error ? "true" : "false"}
                        aria-describedby={
                            error ? `${fieldId}-error` : undefined
                        }
                    />
                    {showToggle && (
                        <button
                            type="button"
                            onClick={onToggle}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
                {error && (
                    <p
                        id={`${fieldId}-error`}
                        className="text-red-500 text-xs mt-1"
                        role="alert"
                        aria-live="polite"
                    >
                        {error}
                    </p>
                )}
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
}) => {
    const [showPassword, setShowPassword] = useState(false);

    // React Hook Form with Zod validation
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        clearErrors,
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

    // Handle form submission with Zod validation
    const onFormSubmit = async (data: SignUpFormData) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            onSubmit(data);
        } catch (error) {
            console.error("Sign up error:", error);
            // Handle submission errors here
        }
    };

    // Handle input changes for controlled components
    const handleInputChange =
        (field: keyof SignUpFormData) => (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setValue(field, value, { shouldValidate: true });
            // Clear errors when user starts typing
            if (errors[field]) {
                clearErrors(field);
            }
        };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute inset-0">
                <GlowEffect
                    colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
                    mode="pulse"
                    blur="strongest"
                    className="opacity-20"
                />
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto">
                <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 sm:p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <BoxReveal boxColor={revealBox} duration={0.3}>
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                <User className="w-8 h-8 text-primary" />
                            </div>
                        </BoxReveal>

                        <BoxReveal boxColor={revealBox} duration={0.3}>
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Join BaliBlissed
                            </h1>
                        </BoxReveal>

                        <BoxReveal boxColor={revealBox} duration={0.3}>
                            <p className="text-muted-foreground">
                                Create your account to start your Bali adventure
                            </p>
                        </BoxReveal>
                    </div>

                    {/* Google Sign Up Button */}
                    <BoxReveal
                        boxColor={revealBox}
                        duration={0.3}
                        overflow="visible"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="w-full mb-6 relative group overflow-hidden"
                            onClick={onGoogleSignUp}
                        >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                        </Button>
                    </BoxReveal>

                    {/* Divider */}
                    <BoxReveal boxColor={revealBox} duration={0.3}>
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-card text-muted-foreground">
                                    or
                                </span>
                            </div>
                        </div>
                    </BoxReveal>

                    {/* Sign Up Form */}
                    <form
                        onSubmit={handleSubmit(onFormSubmit)}
                        className="space-y-6"
                        noValidate
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

                        <div className="space-y-3">
                            <FormField
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={formValues.password}
                                onChange={handleInputChange("password")}
                                icon={<Lock size={18} />}
                                autoComplete="new-password"
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
                                        className="mt-2"
                                    />
                                </BoxReveal>
                            )}
                        </div>

                        <BoxReveal
                            boxColor={revealBox}
                            duration={0.3}
                            overflow="visible"
                        >
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full relative group bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                aria-describedby={
                                    isSubmitting ? "submit-loading" : undefined
                                }
                            >
                                <span
                                    className={`transition-opacity duration-200 ${isSubmitting ? "opacity-0" : "opacity-100"}`}
                                >
                                    Create Account
                                </span>

                                {isSubmitting && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center"
                                        id="submit-loading"
                                        aria-label="Creating account, please wait"
                                    >
                                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                            </Button>
                        </BoxReveal>
                    </form>

                    {/* Footer */}
                    <BoxReveal boxColor={revealBox} duration={0.3}>
                        <div className="mt-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={onSignInClick}
                                    className="text-primary hover:underline font-medium"
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
