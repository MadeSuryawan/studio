"use client";

import React, {
    useState,
    ReactNode,
    useRef,
    useEffect,
    useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, X } from "lucide-react";

interface ExpandableDockProps {
    headerContent: ReactNode;
    children: ReactNode;
    className?: string;
}

const ExpandableDock = ({
    headerContent,
    children,
    className,
}: ExpandableDockProps) => {
    const [animationStage, setAnimationStage] = useState<
        | "collapsed"
        | "widthExpanding"
        | "heightExpanding"
        | "fullyExpanded"
        | "contentFadingOut"
        | "heightCollapsing"
        | "widthCollapsing"
    >("collapsed");

    const containerRef = useRef<HTMLDivElement>(null);
    // Keep track of animation timers to avoid overlaps/leaks on rapid toggles
    const timersRef = useRef<number[]>([]);
    const clearTimers = () => {
        timersRef.current.forEach((id) => clearTimeout(id));
        timersRef.current = [];
    };

    // Clear any pending timers on unmount
    useEffect(() => {
        return () => {
            clearTimers();
        };
    }, []);

    const handleExpand = useCallback(() => {
        clearTimers();
        setAnimationStage("widthExpanding");
        timersRef.current.push(
            window.setTimeout(() => setAnimationStage("heightExpanding"), 400),
        );
        timersRef.current.push(
            window.setTimeout(() => setAnimationStage("fullyExpanded"), 850),
        );
    }, []);

    const handleCollapse = useCallback(() => {
        clearTimers();
        setAnimationStage("contentFadingOut");
        timersRef.current.push(
            window.setTimeout(() => setAnimationStage("heightCollapsing"), 250),
        );
        timersRef.current.push(
            window.setTimeout(() => setAnimationStage("widthCollapsing"), 650),
        );
        timersRef.current.push(
            window.setTimeout(() => setAnimationStage("collapsed"), 1050),
        );
    }, []);

    const isCollapsed = animationStage === "collapsed";
    const isExpanded = animationStage === "fullyExpanded";

    // Keep a live ref of expanded state to avoid re-binding the document listener on each change
    const isExpandedRef = useRef(isExpanded);
    useEffect(() => {
        isExpandedRef.current = isExpanded;
    }, [isExpanded]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node) &&
                isExpandedRef.current
            ) {
                handleCollapse();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleCollapse]);

    const isMobile = useIsMobile();
    const { collapsedW, collapsedH, expandedW, expandedH } =
        React.useMemo(() => {
            const collapsedW = isMobile ? "min(94vw, 54px)" : "min(90vw, 64px)";
            const collapsedH = isMobile ? "54px" : "64px";
            const expandedW = isMobile
                ? "min(96vw, 300px)"
                : "min(90vw, 500px)";
            const expandedH = isMobile
                ? "min(75vh, 500px)"
                : "min(80vh, 600px)";
            return { collapsedW, collapsedH, expandedW, expandedH };
        }, [isMobile]);

    return (
        <div className="fixed bottom-3.5 left-4 z-50 w-auto px-1 sm:px-0 ">
            <motion.div
                ref={containerRef}
                initial={{
                    width: collapsedW,
                    height: collapsedH,
                    backgroundColor: "#063842",
                }}
                animate={{
                    width:
                        animationStage === "collapsed" ||
                        animationStage === "widthCollapsing"
                            ? collapsedW
                            : expandedW,
                    height:
                        animationStage === "collapsed" ||
                        animationStage === "widthExpanding" ||
                        animationStage === "widthCollapsing"
                            ? collapsedH
                            : expandedH,
                    backgroundColor: isCollapsed
                        ? "#063842"
                        : "hsla(60, 4%, 10%, 1.00)",
                }}
                transition={{
                    width: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                    height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                    backgroundColor: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                }}
                className={cn(
                    "backdrop-blur-lg shadow-2xl overflow-hidden flex flex-col-reverse rounded-[10px]",
                    className,
                )}
            >
                <Button
                    onClick={isCollapsed ? handleExpand : handleCollapse}
                    aria-expanded={isExpanded}
                    variant="ghost"
                    className="relative w-auto h-[54px] md:h-[64px] bg-secondary pl-12 rounded-[10px]"
                    style={{
                        backgroundColor: isExpanded ? "#063842" : "#ee812e",
                        transition: "background-color 1s ease-in-out",
                    }}
                >
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 md:ml-1">
                        <AnimatePresence mode="wait" initial={false}>
                            {isExpanded ? (
                                <motion.span
                                    key="close-icon"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        rotate: -90,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotate: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8,
                                        rotate: 90,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        easeOut: [0.4, 0, 0.2, 1],
                                    }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <X className="scale-[2] text-foreground/80" />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="bot-icon"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        rotate: 90,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotate: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8,
                                        rotate: -90,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        easeOut: [0.4, 0, 0.2, 1],
                                    }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <BotMessageSquare className="scale-[2.2] sm:scale-[2.8] text-foreground/80" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                    {headerContent}
                </Button>
                <motion.div
                    animate={{
                        opacity: isExpanded ? 1 : 0,
                        height: isExpanded ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    id="expandable-dock-content"
                    className="flex-1 flex flex-col overflow-hidden bg-bg-alternate/60"
                >
                    <div className="overflow-y-auto overflow-x-hidden scrollbar-none">
                        {children}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default React.memo(ExpandableDock);
