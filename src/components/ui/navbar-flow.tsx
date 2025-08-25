"use client";
import React, { useEffect, useState, useCallback, useId } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import {
    Menu as List,
    X as Close,
    ChevronDown as ArrowDown,
    ChevronUp as ArrowUp,
} from "lucide-react";

interface NavLink {
    text: string;
    url?: string;
    submenu?: React.ReactNode;
}

interface NavbarFlowProps {
    emblem?: React.ReactNode;
    links?: NavLink[];
    extraIcons?: React.ReactNode[];
    styleName?: string;
    rightComponent?: React.JSX.Element;
    // How many milliseconds earlier than the nav reveal should the links start animating
    linksHeadStartMs?: number;
}

interface ListItemProps {
    setSelected: (element: string | null) => void;
    selected: string | null;
    element: string;
    children: React.ReactNode;
}

interface HoverLinkProps {
    url: string;
    children: React.ReactNode;
    onPress?: () => void;
}

interface FeatureItemProps {
    heading: string;
    url: string;
    info: string;
    onPress?: () => void;
}

const springTransition = {
    type: "spring" as const,
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

const ListItem: React.FC<ListItemProps> = React.memo(function ListItem({
    setSelected,
    selected,
    element,
    children,
}: ListItemProps) {
    const submenuId = useId();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelected(selected === element ? null : element);
        } else if (e.key === "Escape") {
            setSelected(null);
        }
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setSelected(element)}
            onMouseLeave={(e) => {
                const dropdown =
                    e.currentTarget.querySelector(".dropdown-content");
                if (dropdown) {
                    const dropdownRect = dropdown.getBoundingClientRect();
                    if (e.clientY < dropdownRect.top - 20) {
                        setSelected(null);
                    }
                }
            }}
        >
            <motion.button
                type="button"
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-gray-800 dark:text-gray-200 font-medium text-base lg:text-xl whitespace-nowrap hover:opacity-[0.9] hover:text-gray-900 dark:hover:text-white py-1 bg-transparent border-0"
                aria-haspopup="true"
                aria-expanded={selected === element}
                aria-controls={selected === element ? submenuId : undefined}
                onFocus={() => setSelected(element)}
                onKeyDown={handleKeyDown}
            >
                {element}
            </motion.button>
            {selected !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={springTransition}
                >
                    {selected === element && (
                        <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 z-50">
                            <motion.div
                                transition={springTransition}
                                layoutId="selected"
                                className="dropdown-content bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl"
                                style={{
                                    maxWidth: "min(90vw, 400px)",
                                }}
                                id={submenuId}
                                role="menu"
                                aria-label={`${element} submenu`}
                                onMouseEnter={() => setSelected(element)}
                                onMouseLeave={() => setSelected(null)}
                            >
                                <motion.div
                                    layout
                                    className="w-max h-full p-4 min-w-48"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
});

export const HoverLink = React.memo(function HoverLink({
    url,
    children,
    onPress,
}: HoverLinkProps) {
    return (
        <a
            href={url}
            onClick={onPress}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 ease-out"
            role="menuitem"
        >
            {children}
        </a>
    );
});

export const FeatureItem = React.memo(function FeatureItem({
    heading,
    url,
    info,
    onPress,
}: FeatureItemProps) {
    return (
        <a
            href={url}
            onClick={onPress}
            className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 ease-out"
            role="menuitem"
        >
            <h4 className="font-medium text-gray-900 dark:text-white">
                {heading}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {info}
            </p>
        </a>
    );
});

const NavbarFlow: React.FC<NavbarFlowProps> = ({
    emblem,
    links = [],
    extraIcons = [],
    styleName = "",
    rightComponent,
    linksHeadStartMs = 0,
}) => {
    const [sequenceDone, setSequenceDone] = useState(false);
    const [linksReady, setLinksReady] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null);
    const [openedSections, setOpenedSections] = useState<
        Record<string, boolean>
    >({});
    const [isMounted, setIsMounted] = useState(false);

    const navMotion = useAnimation();
    const emblemMotion = useAnimation();
    const switchMotion = useAnimation();
    const svgMotion = useAnimation();
    const prefersReducedMotion = useReducedMotion();
    const mobileMenuId = useId();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)");
        const update = (e?: MediaQueryListEvent) =>
            setMobileView(e ? e.matches : mql.matches);
        update();
        if (typeof mql.addEventListener === "function") {
            mql.addEventListener("change", update);
            return () => mql.removeEventListener("change", update);
        } else if ("onchange" in mql) {
            // Fallback for older browsers without addEventListener
            mql.onchange = update as any;
            return () => {
                mql.onchange = null;
            };
        } else {
            // Last-resort fallback: listen to window resize
            const onResize = () => update();
            window.addEventListener("resize", onResize);
            return () => window.removeEventListener("resize", onResize);
        }
    }, []);

    useEffect(() => {
        if (!isMounted || sequenceDone) return;

        const quick = prefersReducedMotion ? 0 : 0.5;
        const navDur = prefersReducedMotion ? 0 : 0.8;
        const svgDur = prefersReducedMotion ? 0 : 0.5;
        const navDelay = prefersReducedMotion ? 0 : 0.5;
        let linksTimer: number | undefined;

        const runSequence = async () => {
            if (mobileView) {
                await Promise.all([
                    emblemMotion.start({
                        opacity: 1,
                        x: 0,
                        transition: { duration: quick, ease: "easeOut" },
                    }),
                    navMotion.start({
                        opacity: 1,
                        transition: { duration: quick, ease: "easeOut" },
                    }),
                    switchMotion.start({
                        opacity: 1,
                        x: 0,
                        transition: { duration: quick, ease: "easeOut" },
                    }),
                ]);
                setSequenceDone(true);
                return;
            }

            // Schedule links head start relative to navDelay
            const headStartMs = Math.max(
                0,
                Math.min(linksHeadStartMs, navDelay * 1000),
            );
            const fireInMs = Math.max(0, navDelay * 1000 - headStartMs);
            linksTimer = window.setTimeout(() => setLinksReady(true), fireInMs);

            await navMotion.start({
                clipPath: "inset(0 0% 0 0)",
                opacity: 1,
                transition: {
                    duration: navDur,
                    ease: "easeOut",
                    delay: navDelay,
                },
            });

            await svgMotion.start({
                opacity: 1,
                transition: { duration: svgDur },
            });

            await Promise.all([
                emblemMotion.start({
                    opacity: 1,
                    x: 0,
                    transition: { duration: quick, ease: "easeOut" },
                }),
                switchMotion.start({
                    opacity: 1,
                    x: 0,
                    transition: { duration: quick, ease: "easeOut" },
                }),
            ]);

            setSequenceDone(true);
        };

        runSequence();
        return () => {
            if (linksTimer) {
                clearTimeout(linksTimer);
            }
        };
    }, [
        navMotion,
        emblemMotion,
        switchMotion,
        svgMotion,
        mobileView,
        isMounted,
        sequenceDone,
        prefersReducedMotion,
        linksHeadStartMs,
    ]);

    const toggleMobileMenu = useCallback(() => {
        setMobileMenuVisible((v) => !v);
    }, []);

    const toggleSection = useCallback((text: string) => {
        setOpenedSections((prev) => ({
            ...prev,
            [text]: !prev[text],
        }));
    }, []);

    const hideMobileMenu = useCallback(() => {
        setMobileMenuVisible(false);
    }, []);

    const clearSelectedSubmenu = useCallback(() => {
        setSelectedSubmenu(null);
    }, [setSelectedSubmenu]);

    const renderSubmenuItems = useCallback(
        (submenu: React.ReactNode) => {
            if (!React.isValidElement(submenu)) return null;

            const submenuProps = submenu.props as {
                children?: React.ReactNode;
            };
            if (!submenuProps.children) return null;

            return React.Children.map(
                submenuProps.children,
                (child, childIdx) => (
                    <div key={childIdx} onClick={hideMobileMenu}>
                        {child}
                    </div>
                ),
            );
        },
        [hideMobileMenu],
    );

    useEffect(() => {
        if (!mobileMenuVisible) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileMenuVisible(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [mobileMenuVisible]);

    return (
        <div className={`sticky top-0 z-50 w-full ${styleName}`}>
            <div className="hidden md:block">
                <div className="absolute w-full max-w-7xl mx-auto h-12 md:h-16 flex items-center justify-between px-3 lg:px-8">
                    {/* LogoIcon */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        className="flex items-center justify-center z-10 flex-shrink-0 backdrop-blur-md"
                        animate={emblemMotion}
                    >
                        {emblem}
                    </motion.div>

                    {/* Submenus, text */}
                    <motion.nav
                        initial={{
                            clipPath: "inset(0 50% 0 50%)",
                            opacity: 0,
                        }}
                        animate={navMotion}
                        className="bg-background px-[20px] py-[10px] rounded-[8px] flex items-center justify-center gap-6 lg:gap-12 z-10 flex-shrink-0 mt-4 overflow-hidden"
                        style={{ willChange: "clip-path" }}
                        role="navigation"
                        aria-label="Primary"
                        onMouseLeave={clearSelectedSubmenu}
                    >
                        {links.map((element, idx) => (
                            <div key={element.text}>
                                {element.submenu ? (
                                    <ListItem
                                        setSelected={setSelectedSubmenu}
                                        selected={selectedSubmenu}
                                        element={element.text}
                                    >
                                        {element.submenu}
                                    </ListItem>
                                ) : (
                                    <motion.div
                                        initial={{ y: -1000 }}
                                        className="transition-all duration-500 ease-out"
                                        animate={{
                                            y: linksReady ? 0 : -1000,
                                        }}
                                        transition={{
                                            duration: prefersReducedMotion
                                                ? 0
                                                : 0.5,
                                            ease: "easeOut",
                                            delay: linksReady ? idx * 0.08 : 0,
                                        }}
                                    >
                                        <a
                                            href={element.url || "#"}
                                            className="text-special-card-fg font-medium text-base lg:text-xl whitespace-nowrap hover:text-primary hover:underline underline-offset-4"
                                        >
                                            {element.text}
                                        </a>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </motion.nav>

                    {/* Right Component */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={switchMotion}
                        className="rounded-[8px] p-2 lg:p-3 z-10 flex-shrink-0 flex items-center gap-2 lg:gap-3"
                    >
                        {extraIcons.map((icon, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-center"
                            >
                                {icon}
                            </div>
                        ))}

                        {rightComponent && (
                            <div className="flex items-center justify-center size-9 pr-4">
                                {React.cloneElement(rightComponent, {
                                    className:
                                        `${rightComponent.props.className || ""} h-10 w-10 mr-6 mt-4`.trim(),
                                })}
                            </div>
                        )}
                    </motion.div>

                    <motion.svg
                        initial={{ opacity: 0 }}
                        animate={svgMotion}
                        className="absolute inset-0 w-full h-full z-0 pointer-events-none mt-1"
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 1400 96"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <filter id="connectionBlur">
                                <feGaussianBlur
                                    in="SourceGraphic"
                                    stdDeviation="3"
                                />
                            </filter>
                            <linearGradient
                                id="blueGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#3b82f6"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#3b82f6"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#3b82f6"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="cyanGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#06b6d4"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#06b6d4"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#06b6d4"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="purpleGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#8b5cf6"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#8b5cf6"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#8b5cf6"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="orangeGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#f59e0b"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#f59e0b"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#f59e0b"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="redGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#ef4444"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#ef4444"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#ef4444"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="greenGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#10b981"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#10b981"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#10b981"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                        </defs>

                        <motion.path
                            d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
                            stroke="url(#blueGradient)"
                            strokeWidth="3"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={{
                                duration: 2,
                                ease: "easeOut",
                                delay: 1.5,
                            }}
                        />
                        <motion.path
                            d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
                            stroke="url(#blueGradient)"
                            strokeWidth="3"
                            fill="none"
                            transform="scale(-1,1) translate(-1400,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={{
                                duration: 2,
                                ease: "easeOut",
                                delay: 1.5,
                            }}
                        />
                        <motion.path
                            d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
                            stroke="url(#cyanGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{
                                duration: 2.2,
                                ease: "easeOut",
                                delay: 1.7,
                            }}
                        />
                        <motion.path
                            d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
                            stroke="url(#cyanGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="scale(-1,1) translate(-1400,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{
                                duration: 2.2,
                                ease: "easeOut",
                                delay: 1.7,
                            }}
                        />
                        <motion.path
                            d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
                            stroke="url(#purpleGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{
                                duration: 1.8,
                                ease: "easeOut",
                                delay: 1.9,
                            }}
                        />
                        <motion.path
                            d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
                            stroke="url(#purpleGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="scale(-1,1) translate(-1400,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{
                                duration: 1.8,
                                ease: "easeOut",
                                delay: 1.9,
                            }}
                        />
                        <motion.path
                            d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
                            stroke="url(#orangeGradient)"
                            strokeWidth="3"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={{
                                duration: 2,
                                ease: "easeOut",
                                delay: 2.1,
                            }}
                        />
                        <motion.path
                            d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
                            stroke="url(#orangeGradient)"
                            strokeWidth="3"
                            fill="none"
                            transform="scale(-1,1) translate(-1400,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={{
                                duration: 2,
                                ease: "easeOut",
                                delay: 2.1,
                            }}
                        />
                        <motion.path
                            d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
                            stroke="url(#redGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{
                                duration: 2.2,
                                ease: "easeOut",
                                delay: 2.3,
                            }}
                        />
                        <motion.path
                            d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
                            stroke="url(#redGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="scale(-1,1) translate(-1400,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{
                                duration: 2.2,
                                ease: "easeOut",
                                delay: 2.3,
                            }}
                        />
                        <motion.path
                            d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
                            stroke="url(#greenGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{
                                duration: 1.8,
                                ease: "easeOut",
                                delay: 2.5,
                            }}
                        />
                        <motion.path
                            d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
                            stroke="url(#greenGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="scale(-1,1) translate(-1400,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{
                                duration: 1.8,
                                ease: "easeOut",
                                delay: 2.5,
                            }}
                        />

                        <g filter="url(#connectionBlur)" opacity="0.3">
                            <path
                                d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
                                stroke="#3b82f6"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
                                stroke="#06b6d4"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
                                stroke="#8b5cf6"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
                                stroke="#f59e0b"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
                                stroke="#ef4444"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
                                stroke="#10b981"
                                strokeWidth="4"
                                fill="none"
                            />
                        </g>
                    </motion.svg>
                </div>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden bg-background">
                <div className="top-0 z-50 w-full relative">
                    <div className="container flex h-12 md:h-16 max-w-screen-2xl items-center px-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={emblemMotion}
                            className="mr-4 flex-shrink-0"
                        >
                            <div>{emblem}</div>
                        </motion.div>

                        <div className="flex flex-1 items-center justify-end -space-x-2 ">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={switchMotion}
                                className="flex items-center space-x-2 pr-4 pb-2"
                            >
                                {extraIcons.map((icon, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-center"
                                    >
                                        {icon}
                                    </div>
                                ))}

                                {rightComponent && (
                                    <div className="flex items-center justify-center">
                                        {rightComponent}
                                    </div>
                                )}
                            </motion.div>

                            <button
                                type="button"
                                onClick={toggleMobileMenu}
                                className="flex items-center justify-center w-9 h-9 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mt-2"
                                aria-expanded={mobileMenuVisible}
                                aria-controls={mobileMenuId}
                                aria-label="Toggle menu"
                            >
                                {mobileMenuVisible ? (
                                    <Close className="h-7 w-7" />
                                ) : (
                                    <List className="h-7 w-7" />
                                )}
                                <span className="sr-only">Toggle menu</span>
                            </button>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                        animate={{
                            opacity: mobileMenuVisible ? 1 : 0,
                            clipPath: mobileMenuVisible
                                ? "inset(0 0 0% 0)"
                                : "inset(0 0 100% 0)",
                        }}
                        transition={{
                            duration: prefersReducedMotion ? 0 : 0.3,
                            ease: "easeOut",
                        }}
                        id={mobileMenuId}
                        aria-hidden={!mobileMenuVisible}
                        role="region"
                        aria-label="Mobile menu"
                        className="absolute left-0 right-0 top-full z-40 overflow-y-auto border-t border-gray-200/40 dark:border-gray-800/40 bg-background md:backdrop-blur"
                        style={{ willChange: "clip-path, opacity" }}
                    >
                        <div className="container py-4 px-4">
                            <nav
                                className="flex flex-col space-y-3"
                                aria-label="Primary"
                            >
                                {links.map((element, idx) => (
                                    <div
                                        key={element.text}
                                        className="space-y-2"
                                    >
                                        {element.submenu ? (
                                            <>
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-between w-full text-gray-800 dark:text-gray-200 font-medium text-base py-2 px-4 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors duration-300 ease-out border-b border-gray-200 dark:border-gray-800"
                                                    onClick={() =>
                                                        toggleSection(
                                                            element.text,
                                                        )
                                                    }
                                                    aria-expanded={
                                                        !!openedSections[
                                                            element.text
                                                        ]
                                                    }
                                                    aria-controls={`${mobileMenuId}-section-${idx}`}
                                                >
                                                    <span>{element.text}</span>
                                                    <span>
                                                        {openedSections[
                                                            element.text
                                                        ] ? (
                                                            <ArrowUp className="h-4 w-4" />
                                                        ) : (
                                                            <ArrowDown className="h-4 w-4" />
                                                        )}
                                                    </span>
                                                </button>

                                                {openedSections[
                                                    element.text
                                                ] && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            clipPath:
                                                                "inset(0 0 100% 0)",
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            clipPath:
                                                                "inset(0 0 0% 0)",
                                                        }}
                                                        transition={{
                                                            duration:
                                                                prefersReducedMotion
                                                                    ? 0
                                                                    : 0.2,
                                                            ease: "easeOut",
                                                        }}
                                                        id={`${mobileMenuId}-section-${idx}`}
                                                        role="region"
                                                        aria-label={`${element.text} submenu`}
                                                        className="pl-4 space-y-1 overflow-hidden"
                                                        style={{
                                                            willChange:
                                                                "clip-path, opacity",
                                                        }}
                                                    >
                                                        {renderSubmenuItems(
                                                            element.submenu,
                                                        )}
                                                    </motion.div>
                                                )}
                                            </>
                                        ) : (
                                            <a
                                                href={element.url || "#"}
                                                onClick={hideMobileMenu}
                                                className="text-gray-800 dark:text-gray-200 font-medium text-base py-2 px-4 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors duration-300 ease-out border-b border-gray-200 dark:border-gray-800 block"
                                            >
                                                {element.text}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default NavbarFlow;
