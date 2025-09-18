"use client";

import type { SliderProps as AriaSliderProps } from "react-aria-components";
import {
    Label as AriaLabel,
    Slider as AriaSlider,
    SliderOutput as AriaSliderOutput,
    SliderThumb as AriaSliderThumb,
    SliderTrack as AriaSliderTrack,
} from "react-aria-components";
import { motion } from "framer-motion";
import { cn, cx, sortCx } from "@/lib/utils";

const styles = sortCx({
    default: "hidden",
    bottom: "absolute top-2 left-1/2 -translate-x-1/2 translate-y-full text-md font-medium text-primary",
    "top-floating": cx(
        "absolute -top-2 left-1/2 -translate-y-full",
        "rounded-md",
        "bg-primary",
        "px-2 py-1 text-xs font-semibold text-black/80",
        "border-[1px] border-accent dark:border-transparent",
        "shadow-[1px_2px_3px_rgba(82,_82,_82,_0.4),_-2px_-2px_3px_rgba(255_,255_,255_,0.9)]",
        "dark:shadow-[2px_2px_5px_rgba(0,_0,_0,_0.8),_-2px_-2px_5px_rgba(255_,255_,255_,0.2)]",
    ),
});

/**
 * Calculate the translateX percentage based on slider value
 * Maps from minValue -> -16.666667% to maxValue -> -75%
 */
const calculateTranslateX = (
    value: number,
    minValue: number,
    maxValue: number,
): number => {
    // Normalize the value to a 0-1 range
    const normalizedValue = (value - minValue) / (maxValue - minValue);

    // Interpolate between -14% and -90%
    const startTranslate = -14;
    const endTranslate = -90;

    return startTranslate + normalizedValue * (endTranslate - startTranslate);
};

/**
 * Animated AriaSliderOutput component that moves horizontally based on slider value
 */
const AnimatedOutput = motion.create(AriaSliderOutput);

interface SliderProps extends AriaSliderProps {
    labelPosition?: keyof typeof styles;
    labelFormatter?: (value: number) => string;
    id?: string;
    span?: string;
}

export const Slider = ({
    labelPosition = "default",
    minValue = 0,
    maxValue = 100,
    labelFormatter,
    formatOptions,
    id,
    span,
    ...rest
}: SliderProps) => {
    // Format thumb value as percentage by default.
    const defaultFormatOptions: Intl.NumberFormatOptions = {
        style: "percent",
        maximumFractionDigits: 0,
    };

    return (
        <AriaSlider
            {...rest}
            {...{ minValue, maxValue }}
            formatOptions={formatOptions ?? defaultFormatOptions}
        >
            <AriaLabel id={id}>
                <input type="text" id={id} />
            </AriaLabel>
            <AriaSliderTrack className="relative h-6 w-full">
                {({
                    state: {
                        values,
                        getThumbValue,
                        getThumbPercent,
                        getFormattedValue,
                    },
                }) => {
                    const left = values.length === 1 ? 0 : getThumbPercent(0);
                    const width =
                        values.length === 1
                            ? getThumbPercent(0)
                            : getThumbPercent(1) - left;

                    return (
                        <>
                            <span
                                className={cx(
                                    "absolute top-1/2 h-2 w-full -translate-y-1/2",
                                    "rounded-[4px] bg-background",
                                    "border-[1px] nav-border",
                                    "shadow-[1px_1px_3px_rgba(82,_82,_82,_0.4),_-2px_-2px_3px_rgba(255_,255_,255_,0.9)]",
                                    "dark:shadow-[1px_1px_5px_rgba(0,_0,_0,_0.8),_-1px_-1px_5px_rgba(255_,255_,255_,0.1)]",
                                )}
                            />
                            <span
                                className={cx(
                                    "absolute top-1/2 h-2 w-full -translate-y-1/2",
                                    "rounded-[4px] bg-accent",
                                    "border-[1px] nav-border",
                                    "shadow-[1px_1px_3px_rgba(82,_82,_82,_0.4),_-2px_-2px_3px_rgba(255_,255_,255_,0.9)]",
                                    "dark:shadow-[1px_1px_5px_rgba(0,_0,_0,_0.8),_-3px_-3px_3px_rgba(255_,255_,255_,0.1)]",
                                )}
                                style={{
                                    left: `${left * 100}%`,
                                    width: `${width * 100}%`,
                                }}
                            />
                            {values.map((_, index) => {
                                return (
                                    <AriaSliderThumb
                                        key={index}
                                        index={index}
                                        className={({
                                            isFocusVisible,
                                            isDragging,
                                        }) =>
                                            cx(
                                                "top-1/2 box-border size-7 cursor-grab",
                                                "rounded-full shadow-md",
                                                "ring-1 ring-accent ring-inset",
                                                isFocusVisible &&
                                                    "outline-1 outline-offset-1 outline-focus-ring",
                                                isDragging && "cursor-grabbing",
                                                "bg-background",
                                                "flex place-content-center place-items-center",
                                            )
                                        }
                                    >
                                        <span className="scale-[1.5] pointer-events-none">
                                            🟠
                                        </span>
                                        <AnimatedOutput
                                            className={cn(
                                                "pointer-events-auto",
                                                "whitespace-nowrap",
                                                labelPosition ===
                                                    "top-floating" &&
                                                    "will-change-transform",
                                                styles[labelPosition],
                                            )}
                                            animate={
                                                labelPosition ===
                                                    "top-floating" && {
                                                    x: `${calculateTranslateX(
                                                        getThumbValue(index),
                                                        minValue,
                                                        maxValue,
                                                    )}%`,
                                                }
                                            }
                                            transition={{
                                                duration: 0.1,
                                                ease: "linear",
                                            }}
                                        >
                                            <span id={span}>{span} </span>
                                            {labelFormatter
                                                ? labelFormatter(
                                                      getThumbValue(index),
                                                  )
                                                : getFormattedValue(
                                                      getThumbValue(index) /
                                                          100,
                                                  )}
                                        </AnimatedOutput>
                                    </AriaSliderThumb>
                                );
                            })}
                        </>
                    );
                }}
            </AriaSliderTrack>
        </AriaSlider>
    );
};
