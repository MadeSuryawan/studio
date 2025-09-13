// src/components/ui/animated-presence-icon.tsx
"use client";
import { memo, type FC } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
    Menu as List,
    X as Close,
    BotMessageSquare as Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";

const defScale = "scale-[1.7]" as string;

const animationVals = {
    initial: {
        opacity: 0,
        scale: 0.8,
    },
    animate: {
        opacity: [0, 1, 1],
        scale: [0.8, 1, 1],
        rotate: [90, -10, 0],
    },
    exit: {
        opacity: [1, 1, 0],
        scale: [1, 1, 0.8],
        rotate: [0, 10, 90],
    },
    transition: {
        duration: 0.3,
        ease: "easeOut",
        times: [0, 0.3, 1],
    },
    notAnimate: {
        opacity: 1,
        scale: 1,
        rotate: 0,
    },
    notExit: {
        opacity: 0,
    },
    reduceDur: {
        duration: 0.1,
    },
};

interface AnimatedProps {
    isOpen: boolean;
    bot?: boolean;
    closeClassName?: string;
    displayClassName?: string;
}

const AnimatedIcon: FC<AnimatedProps> = memo(
    ({
        isOpen,
        bot = false,
        closeClassName,
        displayClassName,
    }: AnimatedProps) => {
        const reduceMotion = useReducedMotion();
        const {
            initial,
            animate,
            exit,
            transition,
            notAnimate,
            notExit,
            reduceDur,
        } = animationVals;
        const DisplayIcon = bot ? Bot : List;
        return (
            <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                    <motion.div
                        key="close-icon"
                        initial={{ ...initial, rotate: -90 }}
                        animate={reduceMotion ? notAnimate : animate}
                        exit={reduceMotion ? notExit : exit}
                        transition={reduceMotion ? reduceDur : transition}
                    >
                        <Close
                            className={cn(defScale, closeClassName)}
                            aria-hidden="true"
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="list-icon"
                        initial={{ ...initial, rotate: 90 }}
                        animate={reduceMotion ? notAnimate : animate}
                        exit={reduceMotion ? notExit : exit}
                        transition={reduceMotion ? reduceDur : transition}
                    >
                        <DisplayIcon
                            className={cn(defScale, displayClassName)}
                            aria-hidden="true"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        );
    },
);

AnimatedIcon.displayName = "AnimatedIcon";
export { AnimatedIcon };
