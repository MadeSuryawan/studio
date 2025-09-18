"use client";

import { forwardRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = forwardRef<
    React.ComponentRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center",
            className,
        )}
        {...props}
    >
        <SliderPrimitive.Track className="relative h-[8px] w-full grow overflow-hidden rounded-[4px] bg-secondary">
            <SliderPrimitive.Range className="absolute h-full bg-accent dark:bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
            className={cn(
                "block h-8 w-8",
                "flex items-center justify-center",
                "rounded-full border-2",
                "border-accent dark:border-primary",
                "bg-background",
                "ring-offset-background",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-1",
                "focus-visible:ring-ring focus-visible:ring-offset-1",
                "disabled:pointer-events-none disabled:opacity-50",
            )}
            id="slider-thumb"
            name="slider-thumb"
        >
            <span className="scale-[1.6]">🟠</span>
        </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
