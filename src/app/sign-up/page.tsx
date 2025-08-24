"use client";

import React, { useState, useEffect, useRef, memo, forwardRef } from "react";
import {
    motion,
    useAnimation,
    useInView,
    useMotionTemplate,
    useMotionValue,
} from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// GlowEffect Component
export type GlowEffectProps = {
    className?: string;
    style?: React.CSSProperties;
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
    transition?: any;
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
        ease: "linear",
    };

    const animations = {
        rotate: {
            background: [
                `conic-gradient(from 0deg at 50% 50%, ${colors.join(", ")})`,
                `conic-gradient(from 360deg at 50% 50%, ${colors.join(", ")})`,
            ],
            transition: {
                ...(transition ?? BASE_TRANSITION),
            },
        },
        pulse: {
            background: colors.map(
                (color) =>
                    `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`,
            ),
            scale: [1 * scale, 1.1 * scale, 1 * scale],
            opacity: [0.5, 0.8, 0.5],
            transition: {
                ...(transition ?? {
                    ...BASE_TRANSITION,
                    repeatType: "mirror",
                }),
            },
        },
        breathe: {
            background: [
                ...colors.map(
                    (color) =>
                        `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`,
                ),
            ],
            scale: [1 * scale, 1.05 * scale, 1 * scale],
            transition: {
                ...(transition ?? {
                    ...BASE_TRANSITION,
                    repeatType: "mirror",
                }),
            },
        },
        colorShift: {
            background: colors.map((color, index) => {
                const nextColor = colors[(index + 1) % colors.length];
                return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`;
            }),
            transition: {
                ...(transition ?? {
                    ...BASE_TRANSITION,
                    repeatType: "mirror",
                }),
            },
        },
        flowHorizontal: {
            background: colors.map((color) => {
                const nextColor =
                    colors[(colors.indexOf(color) + 1) % colors.length];
                return `linear-gradient(to right, ${color}, ${nextColor})`;
            }),
            transition: {
                ...(transition ?? {
                    ...BASE_TRANSITION,
                    repeatType: "mirror",
                }),
            },
        },
        static: {
            background: `linear-gradient(to right, ${colors.join(", ")})`,
        },
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
                } as React.CSSProperties
            }
            animate={animations[mode]}
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
    children: React.ReactNode;
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
                    background: boxColor ?? "#5046e6",
                    borderRadius: 4,
                }}
            />
        </section>
    );
});

// Enhanced Input Component
const EnhancedInput = memo(
    forwardRef(function EnhancedInput(
        {
            className,
            type,
            ...props
        }: React.InputHTMLAttributes<HTMLInputElement>,
        ref: React.ForwardedRef<HTMLInputElement>,
    ) {
        const radius = 100;
        const [visible, setVisible] = useState(false);

        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        function handleMouseMove({
            currentTarget,
            clientX,
            clientY,
        }: React.MouseEvent<HTMLDivElement>) {
            const { left, top } = currentTarget.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        return (
            <motion.div
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              #3b82f6,
              transparent 80%
            )
          `,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
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

// Form Field Component
interface FormFieldProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    showToggle?: boolean;
    onToggle?: () => void;
    showPassword?: boolean;
    required?: boolean;
    error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
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
}) => {
    return (
        <div className="space-y-2">
            <BoxReveal boxColor="#5046e6" duration={0.3}>
                <Label htmlFor={label.toLowerCase()}>
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                </Label>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.3} width="100%">
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {icon}
                    </div>
                    <EnhancedInput
                        id={label.toLowerCase()}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="pl-10 pr-12"
                    />
                    {showToggle && (
                        <button
                            type="button"
                            onClick={onToggle}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    )}
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </BoxReveal>
        </div>
    );
};

// Main Sign Up Form Component
interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

interface SignUpFormProps {
    onSubmit?: (data: SignUpFormData) => void;
    onGoogleSignUp?: () => void;
    onSignInClick?: () => void;
}

const BaliBlissedSignUpForm: React.FC<SignUpFormProps> = ({
    onSubmit = (data) => console.log("Sign up:", data),
    onGoogleSignUp = () => console.log("Google sign up"),
    onSignInClick = () => console.log("Switch to sign in"),
}) => {
    const [formData, setFormData] = useState<SignUpFormData>({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange =
        (field: keyof SignUpFormData) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
            if (errors[field]) {
                setErrors((prev) => ({ ...prev, [field]: "" }));
            }
        };

    const validateForm = (): boolean => {
        const newErrors: Partial<SignUpFormData> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
            onSubmit(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute inset-0">
                <GlowEffect
                    colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
                    mode="pulse"
                    blur="strongest"
                    className="opacity-20"
                />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <BoxReveal boxColor="#5046e6" duration={0.3}>
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                <User className="w-8 h-8 text-primary" />
                            </div>
                        </BoxReveal>

                        <BoxReveal boxColor="#5046e6" duration={0.3}>
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Join BaliBlissed
                            </h1>
                        </BoxReveal>

                        <BoxReveal boxColor="#5046e6" duration={0.3}>
                            <p className="text-muted-foreground">
                                Create your account to start your Bali adventure
                            </p>
                        </BoxReveal>
                    </div>

                    {/* Google Sign Up Button */}
                    <BoxReveal
                        boxColor="#5046e6"
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
                            <Github className="mr-2 h-4 w-4" />
                            Continue with Google
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                        </Button>
                    </BoxReveal>

                    {/* Divider */}
                    <BoxReveal boxColor="#5046e6" duration={0.3}>
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField
                            label="Full Name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleInputChange("name")}
                            icon={<User size={18} />}
                            required
                            error={errors.name}
                        />

                        <FormField
                            label="Email"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleInputChange("email")}
                            icon={<Mail size={18} />}
                            required
                            error={errors.email}
                        />

                        <FormField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleInputChange("password")}
                            icon={<Lock size={18} />}
                            showToggle
                            onToggle={() => setShowPassword(!showPassword)}
                            showPassword={showPassword}
                            required
                            error={errors.password}
                        />

                        <BoxReveal
                            boxColor="#5046e6"
                            duration={0.3}
                            overflow="visible"
                        >
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full relative group bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                            >
                                <span
                                    className={`transition-opacity duration-200 ${isSubmitting ? "opacity-0" : "opacity-100"}`}
                                >
                                    Create Account
                                </span>

                                {isSubmitting && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                            </Button>
                        </BoxReveal>
                    </form>

                    {/* Footer */}
                    <BoxReveal boxColor="#5046e6" duration={0.3}>
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
