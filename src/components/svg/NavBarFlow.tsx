import type { SVGProps } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavBarFlowProps {
    defsId: string;
    linksReady: boolean;
    position: string;
    className?: string;
    svgMotion: ReturnType<typeof useAnimation>;
}

const LogoIcon = ({
    position,
    defsId,
    svgMotion,
    linksReady,
    className,
}: NavBarFlowProps & SVGProps<SVGSVGElement>): JSX.Element => (
    <div className={cn(position, className)}>
        <motion.svg
            initial={{ opacity: 0 }}
            animate={svgMotion}
            className={cn("size-full", "pointer-events-none", "relative")}
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
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                    id={`${defsId}-cyanGradient`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                    id={`${defsId}-purpleGradient`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                    id={`${defsId}-orangeGradient`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                    id={`${defsId}-redGradient`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                    id={`${defsId}-greenGradient`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                    <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
            </defs>

            <motion.path
                d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
                stroke={`url(#${defsId}-blueGradient)`}
                strokeWidth="3"
                fill="none"
                transform="translate(-100,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 3,
                    ease: "easeOut",
                    // delay: 0.5,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
            <motion.path
                d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
                stroke={`url(#${defsId}-blueGradient)`}
                strokeWidth="3"
                fill="none"
                transform="scale(-1,1) translate(-1500,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 1.3,
                    ease: "easeOut",
                    // delay: 0.5,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
            <motion.path
                d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
                stroke={`url(#${defsId}-cyanGradient)`}
                strokeWidth="2.5"
                fill="none"
                transform="translate(-100,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                    // delay: 1,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
            <motion.path
                d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
                stroke={`url(#${defsId}-cyanGradient)`}
                strokeWidth="2.5"
                fill="none"
                transform="scale(-1,1) translate(-1500,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                    // delay: 1,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
            <motion.path
                d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
                stroke={`url(#${defsId}-purpleGradient)`}
                strokeWidth="2.5"
                fill="none"
                transform="translate(-100,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 1.8,
                    ease: "easeOut",
                    // delay: 1,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
            <motion.path
                d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
                stroke={`url(#${defsId}-purpleGradient)`}
                strokeWidth="2.5"
                fill="none"
                transform="scale(-1,1) translate(-1500,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 1.8,
                    ease: "easeOut",
                    // delay: 1,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
            <motion.path
                d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
                stroke={`url(#${defsId}-orangeGradient)`}
                strokeWidth="3"
                fill="none"
                transform="translate(-100,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                    // delay: 1.5,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
            <motion.path
                d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
                stroke={`url(#${defsId}-orangeGradient)`}
                strokeWidth="3"
                fill="none"
                transform="scale(-1,1) translate(-1500,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                    // delay: 1.5,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
            <motion.path
                d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
                stroke={`url(#${defsId}-redGradient)`}
                strokeWidth="2.5"
                fill="none"
                transform="translate(-100,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                    // delay: 1.6,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
            <motion.path
                d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
                stroke={`url(#${defsId}-redGradient)`}
                strokeWidth="2.5"
                fill="none"
                transform="scale(-1,1) translate(-1500,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                    // delay: 1.6,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
            <motion.path
                d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
                stroke={`url(#${defsId}-greenGradient)`}
                strokeWidth="2.5"
                fill="none"
                transform="translate(-100,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 0.9,
                    ease: "easeOut",
                    // delay: 1.7,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
            <motion.path
                d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
                stroke={`url(#${defsId}-greenGradient)`}
                strokeWidth="2.5"
                fill="none"
                transform="scale(-1,1) translate(-1500,0)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={linksReady && { pathLength: 1, opacity: 0.8 }}
                transition={{
                    duration: 0.9,
                    ease: "easeOut",
                    // delay: 1.7,
                }}
                aria-hidden="true"
                focusable="false"
                role="presentation"
            />
        </motion.svg>
    </div>
);

export default LogoIcon;
