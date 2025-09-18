"use client";

import {
    forwardRef,
    useMemo,
    type ComponentProps,
    type ComponentRef,
    type ComponentPropsWithoutRef,
} from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider12 = forwardRef<
    ComponentRef<typeof SliderPrimitive.Root>,
    ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
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
    );
});
Slider12.displayName = SliderPrimitive.Root.displayName;

export { Slider12 };

const Slider = ({
    className,
    defaultValue,
    value,
    min,
    max,
    ...props
}: ComponentProps<typeof SliderPrimitive.Root>) => {
    const _values = useMemo(
        () =>
            Array.isArray(value)
                ? value
                : Array.isArray(defaultValue)
                  ? defaultValue
                  : [min, max],
        [value, defaultValue, min, max],
    );

    return (
        <SliderPrimitive.Root
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            className={cn(
                "relative flex w-full touch-none items-center",
                "select-none data-[disabled]:opacity-50}",
                "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44",
                "data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
                className,
            )}
            {...props}
        >
            <SliderPrimitive.Track
                data-slot="slider-track"
                className={cn(
                    "bg-muted relative grow overflow-hidden",
                    "rounded-[4px] bg-secondary",
                    "data-[orientation=horizontal]:h-[8px] data-[orientation=horizontal]:w-full",
                    "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
                )}
            >
                <SliderPrimitive.Range
                    data-slot="slider-range"
                    className={cn(
                        "bg-accent dark:bg-primary absolute",
                        "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
                    )}
                />
            </SliderPrimitive.Track>
            {Array.from({ length: _values.length }, (_, index) => (
                <SliderPrimitive.Thumb
                    data-slot="slider-thumb"
                    key={index}
                    className={cn(
                        "block size-5",
                        // "flex items-center justify-center",
                        "rounded-full border-2",
                        "bg-background",
                        "border-accent dark:border-primary",
                        "ring-ring/50",
                        "shrink-0",
                        "transition-[color,box-shadow] hover:ring-1",
                        "focus-visible:ring-1 focus-visible:outline-hidden",
                        "disabled:pointer-events-none disabled:opacity-50",
                    )}
                />
            ))}
        </SliderPrimitive.Root>
    );
};

export { Slider };
