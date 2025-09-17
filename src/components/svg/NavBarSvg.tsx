import { type SVGProps, useMemo, type JSX } from "react";
import { motion, useAnimation, cubicBezier } from "framer-motion";
import { cn } from "@/lib/utils";

// Gradient color definitions
const GRADIENT_COLORS = {
    blueGradient: "#3b82f6",
    cyanGradient: "#06b6d4",
    purpleGradient: "#8b5cf6",
    orangeGradient: "#f59e0b",
    redGradient: "#ef4444",
    greenGradient: "#10b981",
} as const;

type ColorId = keyof typeof GRADIENT_COLORS;

interface IdValueProps {
    defsId?: string;
    id: ColorId;
    linksReady?: boolean;
    isScrolled?: boolean;
}
// Path definitions for each gradient
const PATH_DEFS: Record<ColorId, { d: string; strokeWidth: number }> = {
    blueGradient: {
        d: "M 700 48 Q 500 30, 300 40 Q 200 35, 120 48",
        strokeWidth: 3,
    },
    cyanGradient: {
        d: "M 700 44 Q 520 60, 320 50 Q 220 55, 130 44",
        strokeWidth: 2.5,
    },
    purpleGradient: {
        d: "M700 42Q476 50 280 45 178 38 111 57",
        strokeWidth: 2.5,
    },
    orangeGradient: {
        d: "M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48",
        strokeWidth: 3,
    },
    redGradient: {
        d: "M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44",
        strokeWidth: 2.5,
    },
    greenGradient: {
        d: "M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52",
        strokeWidth: 2.5,
    },
};

// Animation settings for each gradient
const ANIMATION_SETTINGS: Record<ColorId, { duration: number; delay: number }> =
    {
        blueGradient: { duration: 1, delay: 0.5 },
        cyanGradient: { duration: 0.8, delay: 0.8 },
        purpleGradient: { duration: 1.4, delay: 1 },
        orangeGradient: { duration: 1.3, delay: 1.1 },
        redGradient: { duration: 1.2, delay: 1.3 },
        greenGradient: { duration: 1.5, delay: 1.5 },
    };

const INITIAL_PATH_PROPS = { pathLength: 0, opacity: 0 };

/**
 * Returns props for a motion.path for a given gradient and state.
 */
function getPathProps({
    defsId = "",
    id,
    linksReady,
    isScrolled,
    side,
}: IdValueProps & { side: "left" | "right" }) {
    const isMobile = defsId === "mobile";
    const { d, strokeWidth } = PATH_DEFS[id];
    const { duration, delay } = ANIMATION_SETTINGS[id];

    const transform: Record<"left" | "right", Record<ColorId, string>> = {
        left: {
            blueGradient: "scale(-1,1) translate(-1500,0)",
            cyanGradient: "scale(-1,1) translate(-1500,0)",
            purpleGradient: "scale(-1,1) translate(-1500,0)",
            orangeGradient: "scale(-1,1) translate(-1400,0)",
            redGradient: "scale(-1,1) translate(-1400,0)",
            greenGradient: "scale(-1,1) translate(-1400,0)",
        },
        right: {
            blueGradient: "translate(-100,0)",
            cyanGradient: "translate(-100,0)",
            purpleGradient: "translate(-100,0)",
            orangeGradient: "translate(-90,0)",
            redGradient: "translate(-90,0)",
            greenGradient: "translate(-90,0)",
        },
    };

    return {
        d,
        stroke: `url(#${defsId}-${id})`,
        strokeWidth,
        fill: "none",
        initial: INITIAL_PATH_PROPS,
        animate: {
            pathLength: isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
            opacity: isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
        },
        transform: transform[side][id],
        transition: {
            duration: isScrolled ? 0.5 : duration,
            ease: cubicBezier(0.25, 0.1, 0.25, 1), // easeOut cubic-bezier
            delay: isScrolled ? 0 : delay,
        },
        focusable: false,
        role: "presentation",
        "aria-hidden": true,
    };
}

interface NavBarFlowProps {
    defsId: string;
    linksReady: boolean;
    position: string;
    className?: string;
    svgMotion: ReturnType<typeof useAnimation>;
    isScrolled?: boolean;
    // Only allow safe SVG props, not DOM event handlers
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
}

const NavBarSvg = ({
    position,
    defsId,
    svgMotion,
    linksReady,
    className,
    isScrolled = false,
    width,
    height,
    style,
}: NavBarFlowProps & SVGProps<SVGSVGElement>): JSX.Element => {
    // Memoize gradient stops for performance
    // Iterate gradientsToRender to only render certain gradients for tweaking and debugging
    const gradients: JSX.Element[] = useMemo(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (gradientsToRender: ColorId[] = ["blueGradient"]) =>
            (Object.keys(GRADIENT_COLORS) as ColorId[]).map((id) => (
                <linearGradient
                    key={id}
                    id={`${defsId}-${id}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor={GRADIENT_COLORS[id]}
                        stopOpacity="0"
                    />
                    <stop
                        offset="50%"
                        stopColor={GRADIENT_COLORS[id]}
                        stopOpacity="1"
                    />
                    <stop
                        offset="100%"
                        stopColor={GRADIENT_COLORS[id]}
                        stopOpacity="0"
                    />
                </linearGradient>
            )),
        [defsId],
    );

    // Defensive: Only render if defsId is present
    if (!defsId) {
        return <></>;
    }

    return (
        <motion.svg
            initial={{ opacity: 0 }}
            animate={svgMotion}
            className={cn(position, "pointer-events-none", className)}
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 1400 96"
            preserveAspectRatio="none"
            role="presentation"
            width={width}
            height={height}
            style={style}
        >
            <defs>
                <filter id={`${defsId}-connectionBlur`}>
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                </filter>
                {gradients}
            </defs>

            {(Object.keys(GRADIENT_COLORS) as ColorId[]).map((id) => (
                <motion.path
                    key={`${id}-left`}
                    {...getPathProps({
                        defsId,
                        id,
                        linksReady,
                        isScrolled,
                        side: "left",
                    })}
                />
            ))}
            {(Object.keys(GRADIENT_COLORS) as ColorId[]).map((id) => (
                <motion.path
                    key={`${id}-right`}
                    {...getPathProps({
                        defsId,
                        id,
                        linksReady,
                        isScrolled,
                        side: "right",
                    })}
                />
            ))}
        </motion.svg>
    );
};

export default NavBarSvg;
