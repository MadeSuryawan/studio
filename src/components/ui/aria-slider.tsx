"use client";

import type { SliderProps as AriaSliderProps } from "react-aria-components";
import {
    Label as AriaLabel,
    Slider as AriaSlider,
    SliderOutput as AriaSliderOutput,
    SliderThumb as AriaSliderThumb,
    SliderTrack as AriaSliderTrack,
} from "react-aria-components";
import { cx, sortCx } from "@/lib/utils";

const styles = sortCx({
    default: "hidden",
    bottom: "absolute top-2 left-1/2 -translate-x-1/2 translate-y-full text-md font-medium text-primary",
    "top-floating": cx(
        "absolute -top-2 left-1/2 -translate-x-1/6 -translate-y-full",
        "rounded-md",
        "bg-primary",
        "px-2 py-1 text-xs font-semibold text-black/90",
        "shadow-lg border-[1px] border-accent",
    ),
});

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
                                )}
                            />
                            <span
                                className={cx(
                                    "absolute top-1/2 h-2 w-full -translate-y-1/2",
                                    "rounded-[4px] bg-accent",
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
                                        <span className="scale-[1.5]">🟠</span>
                                        <AriaSliderOutput
                                            className={cx(
                                                "whitespace-nowrap",
                                                styles[labelPosition],
                                            )}
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
                                        </AriaSliderOutput>
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
