// src/components/ui/gradient-button.tsx
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2, ChevronRight, AlertCircle } from "lucide-react";
import { useGradientButton } from "@/hooks/use-gradient-button";

// Constants for styling
const GRADIENT_COLORS = {
    primary: {
        from: "#43809b",
        to: "#244452",
        border: "#244452",
        hover: {
            from: "#509aba",
            to: "#2b5262",
            border: "#2a5061",
        },
        active: "#244452",
    },
    secondary: {
        from: "#6b7280",
        to: "#374151",
        border: "#374151",
        hover: {
            from: "#9ca3af",
            to: "#4b5563",
            border: "#4b5563",
        },
        active: "#374151",
    },
} as const;

const SHADOW_CONFIG = {
    default: "0px 3px 5px 0px rgba(82, 82, 82, 0.5)",
    hover: "0px 4px 8px 0px rgba(82, 82, 82, 0.6)",
} as const;

// Button variants using class-variance-authority
const gradientButtonVariants = cva(
    [
        // Base styles
        `relative inline-flex items-center justify-center`,
        `text-center align-middle cursor-pointer`,
        `font-bold text-white no-underline`,
        `border border-solid rounded-lg`,
        `transition-all duration-500 ease-in-out`,
        `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`,
        `disabled:pointer-events-none disabled:opacity-50`,
        `active:translate-y-px`,
        `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:drop-shadow-[1px_3px_1px_#1f1f1f]`,
    ],
    {
        variants: {
            variant: {
                primary: [
                    "bg-gradient-to-b from-[#43809b] to-[#244452]",
                    `border-[#244452]`,
                    `shadow-[0px_3px_5px_0px_rgba(82,82,82,0.5)]`,
                    cn(`hover:from-[#509aba] hover:to-[#2b5262]`),
                    cn("hover:border-[#2a5061]"),
                    `hover:shadow-[0px_4px_8px_0px_rgba(82,82,82,0.6)]`,
                    cn(`active:from-[#244452] active:to-[#244452]`),
                    `active:shadow-[0px_2px_3px_0px_rgba(82,82,82,0.4)]`,
                ],
                secondary: [
                    cn("bg-gradient-to-b from-[#4e5254] to-[#1c2529]"),
                    cn("border-[#374151] border-[1px]"),
                    cn("shadow-black/50"),
                    "hover:scale-[1.02]",
                    cn("hover:from-[#5f6466] hover:to-[#232e32]"),
                    cn("hover:border-[#4b5563]"),
                    cn(`hover:text-white`),
                    cn(`hover:shadow-black/40`),
                    cn("active:from-[#374151] active:to-[#374151]"),
                    "active:shadow-[0px_2px_3px_0px_rgba(82,82,82,0.4)]",
                ],
                outline: [
                    "bg-transparent border-2",
                    cn("border-[#43809b] text-[#43809b]"),
                    cn("hover:bg-[#43809b] hover:text-white"),
                    "shadow-none hover:shadow-[0px_3px_5px_0px_rgba(67,128,155,0.3)]",
                ],
            },
            size: {
                sm: "px-4 py-2 text-sm gap-2 [&_svg]:size-4",
                default: "px-6 py-3 text-base gap-2 [&_svg]:size-5",
                lg: "px-8 py-4 text-lg gap-3 [&_svg]:size-6",
                xl: "px-10 py-5 text-xl gap-3 [&_svg]:size-7",
            },
            iconPosition: {
                left: "flex-row",
                right: "flex-row",
                none: "gap-0",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
            iconPosition: "none",
        },
    },
);

// TypeScript interfaces
export interface GradientButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof gradientButtonVariants> {
    asChild?: boolean;
    loading?: boolean;
    loadingText?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right" | "none";
    fullWidth?: boolean;
    hapticFeedback?: boolean;
    loadingTimeout?: number;
    errorState?: boolean;
    successState?: boolean;
    textShadow?: "none" | "light" | "medium" | "large";
    "aria-label"?: string;
    "aria-describedby"?: string;
    "aria-expanded"?: boolean;
    "aria-pressed"?: boolean;
}

// Main component
const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
    (
        {
            className,
            variant,
            size,
            iconPosition = "none",
            asChild = false,
            loading = false,
            loadingText,
            icon,
            fullWidth = false,
            hapticFeedback = false,
            loadingTimeout = 5000,
            errorState = false,
            successState = false,
            disabled,
            children,
            textShadow = "medium",
            onClick,
            "aria-label": ariaLabel,
            "aria-describedby": ariaDescribedBy,
            "aria-expanded": ariaExpanded,
            "aria-pressed": ariaPressed,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button";

        // Use custom hook for enhanced functionality
        const {
            isLoading,
            isPressed,
            isFocused,
            shouldReduceMotion,
            handleClick,
            handleMouseDown,
            handleMouseUp,
            handleMouseEnter,
            handleMouseLeave,
            handleFocus,
            handleBlur,
            handleKeyDown,
        } = useGradientButton({
            loading,
            disabled,
            onClick,
            loadingTimeout,
            hapticFeedback,
        });

        // Determine the icon to display with state-based icons
        const displayIcon = React.useMemo(() => {
            if (isLoading) {
                return <Loader2 className="animate-spin" />;
            }
            if (errorState) {
                return <AlertCircle className="text-red-400" />;
            }
            if (successState) {
                return <ChevronRight className="text-green-400" />;
            }
            if (icon) {
                return icon;
            }
            if (iconPosition !== "none" && !icon && !isLoading) {
                return <ChevronRight />;
            }
            return null;
        }, [isLoading, errorState, successState, icon, iconPosition]);

        // Determine button content
        const buttonContent = isLoading && loadingText ? loadingText : children;

        // Compute final className with state-based styling
        const finalClassName = cn(
            gradientButtonVariants({ variant, size, iconPosition, className }),
            fullWidth && "w-full",
            shouldReduceMotion && "transition-none",
            isLoading && "cursor-wait",
            isPressed && "transform translate-y-px",
            isFocused && "ring-1 ring-offset-1 ring-blue-500",
            errorState &&
                "border-red-500 bg-gradient-to-b from-red-500 to-red-700",
            successState &&
                "border-green-500 bg-gradient-to-b from-green-500 to-green-700",
            // Apply text-shadow for primary and secondary variants (not outline)
            // (variant === "primary" || variant === "secondary") &&
            //     "text-shadow-gradient",
            variant === "outline" && "text-shadow-none",
            textShadow === "none" && "text-shadow-none",
            textShadow === "light" && "text-shadow-gradient-light",
            textShadow === "medium" && "text-shadow-gradient",
            textShadow === "large" && "text-shadow-gradient-large",
        );

        return (
            <Comp
                className={finalClassName}
                ref={ref}
                disabled={disabled || isLoading}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                aria-label={
                    ariaLabel ||
                    (typeof children === "string" ? children : undefined)
                }
                aria-busy={isLoading}
                aria-describedby={ariaDescribedBy}
                aria-expanded={ariaExpanded}
                aria-pressed={ariaPressed || isPressed}
                role="button"
                tabIndex={disabled ? -1 : 0}
                {...props}
            >
                {iconPosition === "right" ? (
                    <>
                        {buttonContent && <span>{buttonContent}</span>}
                        {displayIcon && displayIcon}
                    </>
                ) : (
                    <>
                        {displayIcon && iconPosition === "left" && displayIcon}
                        {buttonContent && <span>{buttonContent}</span>}
                    </>
                )}
            </Comp>
        );
    },
);

GradientButton.displayName = "GradientButton";

export {
    GradientButton,
    gradientButtonVariants,
    GRADIENT_COLORS,
    SHADOW_CONFIG,
};
