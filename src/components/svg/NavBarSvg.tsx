import type { SVGProps } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { fill } from "three/src/extras/TextureUtils.js";

type colorid =
    | "blueGradient"
    | "cyanGradient"
    | "purpleGradient"
    | "orangeGradient"
    | "redGradient"
    | "greenGradient";

interface IdValueProps {
    defsId?: string;
    id: colorid;
    linksReady?: boolean;
    isScrolled?: boolean;
}

const idValue = ({ defsId, id, linksReady, isScrolled }: IdValueProps): any => {
    const initial = { pathLength: 0, opacity: 0 };
    const isMobile = defsId === "mobile";
    switch (id) {
        case "blueGradient":
            return {
                start: "#3b82f6",
                middle: "#3b82f6",
                end: "#3b82f6",
                left: {
                    d: "M 700 48 Q 500 30, 300 40 Q 200 35, 120 48",
                    stroke: `url(#${defsId}-blueGradient)`,
                    strokeWidth: "3",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "translate(-100,0)",
                    transition: {
                        duration: isScrolled ? 0.5 : 1,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 0.5,
                    },
                    focusable: "false",
                    role: "presentation",
                },
                right: {
                    d: "M 700 48 Q 500 30, 300 40 Q 200 35, 120 48",
                    stroke: `url(#${defsId}-blueGradient)`,
                    strokeWidth: "3",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "scale(-1,1) translate(-1500,0)",
                    transition: {
                        duration: isScrolled ? 0.5 : 1,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 0.5,
                    },
                    focusable: "false",
                    role: "presentation",
                },
            };
        case "cyanGradient":
            return {
                start: "#06b6d4",
                middle: "#06b6d4",
                end: "#06b6d4",
                left: {
                    d: "M 700 44 Q 520 60, 320 50 Q 220 55, 130 44",
                    stroke: `url(#${defsId}-cyanGradient)`,
                    strokeWidth: "2.5",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "translate(-100,0)",
                    transition: {
                        duration: isScrolled ? 0.5 : 0.8,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 0.8,
                    },
                    focusable: "false",
                    role: "presentation",
                },
                right: {
                    d: "M 700 44 Q 520 60, 320 50 Q 220 55, 130 44",
                    stroke: `url(#${defsId}-cyanGradient)`,
                    strokeWidth: "2.5",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "scale(-1,1) translate(-1500,0)",
                    transition: {
                        duration: isScrolled ? 0.5 : 0.8,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 0.8,
                    },
                    focusable: "false",
                    role: "presentation",
                },
            };
        case "purpleGradient":
            return {
                start: "#8b5cf6",
                middle: "#8b5cf6",
                end: "#8b5cf6",
                left: {
                    d: "M700 42Q476 50 280 45 178 38 111 57",
                    stroke: `url(#${defsId}-purpleGradient)`,
                    strokeWidth: "2.5",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "translate(-100,0)",
                    transition: {
                        duration: isScrolled ? 0.5 : 1.4,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 1,
                    },
                    focusable: "false",
                    role: "presentation",
                },
                right: {
                    d: "M700 42Q476 50 280 45 178 38 111 57",
                    stroke: `url(#${defsId}-purpleGradient)`,
                    strokeWidth: "2.5",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "scale(-1,1) translate(-1500,0)",
                    transition: {
                        duration: isScrolled ? 0.5 : 1.4,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 1,
                    },
                    focusable: "false",
                    role: "presentation",
                },
            };
        case "orangeGradient":
            return {
                start: "#f59e0b",
                middle: "#f59e0b",
                end: "#f59e0b",
                left: {
                    d: "M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48",
                    stroke: `url(#${defsId}-orangeGradient)`,
                    strokeWidth: "3",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "translate(-90,0)",
                    transition: {
                        duration: isScrolled ? 0.5 : 1.3,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 1.1,
                    },
                    focusable: "false",
                    role: "presentation",
                },
                right: {
                    d: "M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48",
                    stroke: `url(#${defsId}-orangeGradient)`,
                    strokeWidth: "3",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "scale(-1,1) translate(-1400,0)",
                    transition: {
                        duration: isScrolled ? 0.5 : 1.3,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 1.1,
                    },
                    focusable: "false",
                    role: "presentation",
                },
            };
        case "redGradient":
            return {
                start: "#ef4444",
                middle: "#ef4444",
                end: "#ef4444",
                left: {
                    d: "M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44",
                    stroke: `url(#${defsId}-redGradient)`,
                    strokeWidth: "2.5",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "translate(-90,0)",
                    transition: {
                        duration: isScrolled ? 0.5 : 1.2,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 1.3,
                    },
                    focusable: "false",
                    role: "presentation",
                },
                right: {
                    d: "M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44",
                    stroke: `url(#${defsId}-redGradient)`,
                    strokeWidth: "2.5",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "scale(-1,1) translate(-1400,0)",
                    transition: {
                        duration: isScrolled ? 0.5 : 1.2,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 1.3,
                    },
                    focusable: "false",
                    role: "presentation",
                },
            };
        case "greenGradient":
            return {
                start: "#10b981",
                middle: "#10b981",
                end: "#10b981",
                left: {
                    d: "M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52",
                    stroke: `url(#${defsId}-greenGradient)`,
                    strokeWidth: "2.5",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "translate(-100, -2)",
                    transition: {
                        duration: isScrolled ? 0.5 : 1.5,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 1.5,
                    },
                    focusable: "false",
                    role: "presentation",
                },
                right: {
                    d: "M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52",
                    stroke: `url(#${defsId}-greenGradient)`,
                    strokeWidth: "2.5",
                    fill: "none",
                    initial: initial,
                    animate: {
                        pathLength:
                            isScrolled && isMobile ? 0 : linksReady ? 1 : 0,
                        opacity:
                            isScrolled && isMobile ? 0 : linksReady ? 0.8 : 0,
                    },
                    transform: "scale(-1,1) translate(-1400,-2)",
                    transition: {
                        duration: isScrolled ? 0.5 : 1.5,
                        ease: "easeOut",
                        delay: isScrolled ? 0 : 1.5,
                    },
                    focusable: "false",
                    role: "presentation",
                },
            };
        default:
            return "";
    }
};

interface NavBarFlowProps {
    defsId: string;
    linksReady: boolean;
    position: string;
    className?: string;
    svgMotion: ReturnType<typeof useAnimation>;
    isScrolled?: boolean;
}

const NavBarSvg = ({
    position,
    defsId,
    svgMotion,
    linksReady,
    className,
    isScrolled = false,
}: NavBarFlowProps & SVGProps<SVGSVGElement>): JSX.Element => (
    <div className={cn(position, "size-full pointer-events-none", className)}>
        <motion.svg
            initial={{ opacity: 0 }}
            animate={svgMotion}
            className={cn("size-full pointer-events-none relative")}
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 1400 96"
            preserveAspectRatio="none"
        >
            <defs>
                <filter id={`${defsId}-connectionBlur`}>
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                </filter>
                <linearGradient
                    id={`${defsId}-blueGradient`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor={idValue({ id: "blueGradient" }).start}
                        stopOpacity="0"
                    />
                    <stop
                        offset="50%"
                        stopColor={idValue({ id: "blueGradient" }).middle}
                        stopOpacity="1"
                    />
                    <stop
                        offset="100%"
                        stopColor={idValue({ id: "blueGradient" }).end}
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    id={`${defsId}-cyanGradient`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor={idValue({ id: "cyanGradient" }).start}
                        stopOpacity="0"
                    />
                    <stop
                        offset="50%"
                        stopColor={idValue({ id: "cyanGradient" }).middle}
                        stopOpacity="1"
                    />
                    <stop
                        offset="100%"
                        stopColor={idValue({ id: "cyanGradient" }).end}
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    id={`${defsId}-purpleGradient`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor={idValue({ id: "purpleGradient" }).start}
                        stopOpacity="0"
                    />
                    <stop
                        offset="50%"
                        stopColor={idValue({ id: "purpleGradient" }).middle}
                        stopOpacity="1"
                    />
                    <stop
                        offset="100%"
                        stopColor={idValue({ id: "purpleGradient" }).end}
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    id={`${defsId}-orangeGradient`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor={idValue({ id: "orangeGradient" }).start}
                        stopOpacity="0"
                    />
                    <stop
                        offset="50%"
                        stopColor={idValue({ id: "orangeGradient" }).middle}
                        stopOpacity="1"
                    />
                    <stop
                        offset="100%"
                        stopColor={idValue({ id: "orangeGradient" }).end}
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    id={`${defsId}-redGradient`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor={idValue({ id: "redGradient" }).start}
                        stopOpacity="0"
                    />
                    <stop
                        offset="50%"
                        stopColor={idValue({ id: "redGradient" }).middle}
                        stopOpacity="1"
                    />
                    <stop
                        offset="100%"
                        stopColor={idValue({ id: "redGradient" }).end}
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    id={`${defsId}-greenGradient`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor={idValue({ id: "greenGradient" }).start}
                        stopOpacity="0"
                    />
                    <stop
                        offset="50%"
                        stopColor={idValue({ id: "greenGradient" }).middle}
                        stopOpacity="1"
                    />
                    <stop
                        offset="100%"
                        stopColor={idValue({ id: "greenGradient" }).end}
                        stopOpacity="0"
                    />
                </linearGradient>
            </defs>

            <motion.path
                {...idValue({
                    defsId,
                    id: "blueGradient",
                    linksReady,
                    isScrolled,
                }).left}
                aria-hidden="true"
            />
            <motion.path
                {...idValue({
                    defsId,
                    id: "blueGradient",
                    linksReady,
                    isScrolled,
                }).right}
                aria-hidden="true"
            />
            <motion.path
                {...idValue({
                    defsId,
                    id: "cyanGradient",
                    linksReady,
                    isScrolled,
                }).left}
                aria-hidden="true"
            />
            <motion.path
                {...idValue({
                    defsId,
                    id: "cyanGradient",
                    linksReady,
                    isScrolled,
                }).right}
                aria-hidden="true"
            />
            <motion.path
                {...idValue({
                    defsId,
                    id: "purpleGradient",
                    linksReady,
                    isScrolled,
                }).left}
                aria-hidden="true"
            />
            <motion.path
                {...idValue({
                    defsId,
                    id: "purpleGradient",
                    linksReady,
                    isScrolled,
                }).right}
                aria-hidden="true"
            />
            <motion.path
                {...idValue({
                    defsId,
                    id: "orangeGradient",
                    linksReady,
                    isScrolled,
                }).left}
                aria-hidden="true"
            />
            <motion.path
                {...idValue({
                    defsId,
                    id: "orangeGradient",
                    linksReady,
                    isScrolled,
                }).right}
                aria-hidden="true"
            />
            <motion.path
                {...idValue({
                    defsId,
                    id: "redGradient",
                    linksReady,
                    isScrolled,
                }).left}
                aria-hidden="true"
            />
            <motion.path
                {...idValue({
                    defsId,
                    id: "redGradient",
                    linksReady,
                    isScrolled,
                }).right}
                aria-hidden="true"
            />
            <motion.path
                {...idValue({
                    defsId,
                    id: "greenGradient",
                    linksReady,
                    isScrolled,
                }).left}
                aria-hidden="true"
            />
            <motion.path
                {...idValue({
                    defsId,
                    id: "greenGradient",
                    linksReady,
                    isScrolled,
                }).right}
                aria-hidden="true"
            />
        </motion.svg>
    </div>
);

export default NavBarSvg;
