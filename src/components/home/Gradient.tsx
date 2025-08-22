"use client";

import React from "react";

interface GradientProps {
    top?: boolean;
    bottom?: boolean;
    gradientT?: string;
    gradientB?: string;
}

export default function Gradient({
    top = true,
    bottom = true,
    gradientT = "from-background to-secondary",
    gradientB = gradientT,
}: GradientProps): React.JSX.Element {
    return (
        <div>
            {/* Top gradient */}
            {top && (
                <div
                    className={`pointer-events-none absolute top-0 inset-x-0 h-8 md:h-16 bg-gradient-to-t ${gradientT} -mt-8 md:-mt-16`}
                    aria-hidden="true"
                />
            )}
            {/* Bottom gradient */}
            {bottom && (
                <div
                    className={`pointer-events-none absolute bottom-0 inset-x-0 h-8 md:h-16 bg-gradient-to-b ${gradientB} -mb-8 md:-mb-16`}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}
