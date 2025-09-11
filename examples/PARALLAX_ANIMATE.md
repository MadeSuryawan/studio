# Framer Motion Parallax Examples

This document provides comprehensive examples of parallax scrolling effects using Framer Motion's built-in hooks, demonstrating various techniques to create engaging scroll-based animations.

## Table of Contents

- [Framer Motion Parallax Examples](#framer-motion-parallax-examples)
    - [Table of Contents](#table-of-contents)
    - [Basic Scroll-Based Parallax](#basic-scroll-based-parallax)
    - [useScroll Hook](#usescroll-hook)
    - [useTransform Hook](#usetransform-hook)
    - [useSpring Hook for Smooth Parallax](#usespring-hook-for-smooth-parallax)
    - [useViewportScroll Hook](#useviewportscroll-hook)
    - [useElementScroll Hook](#useelementscroll-hook)
    - [Advanced Parallax Techniques](#advanced-parallax-techniques)
    - [Multi-Layer Parallax](#multi-layer-parallax)
    - [Horizontal Parallax](#horizontal-parallax)
    - [Parallax with Sticky Elements](#parallax-with-sticky-elements)
    - [Performance Optimization](#performance-optimization)
        - [Throttling and Scroll Performance](#throttling-and-scroll-performance)
            - [Built-in Throttling Behavior](#built-in-throttling-behavior)
            - [Manual Throttling Control](#manual-throttling-control)
            - [Advanced Throttling Strategies](#advanced-throttling-strategies)
            - [Performance Monitoring](#performance-monitoring)
        - [1. Use CSS transforms](#1-use-css-transforms)
        - [2. Implement scroll throttling](#2-implement-scroll-throttling)
        - [3. Use will-change property](#3-use-will-change-property)
    - [Best Practices](#best-practices)
    - [Common Parallax Patterns](#common-parallax-patterns)
        - [Hero Section Parallax](#hero-section-parallax)
        - [Content Reveal Parallax](#content-reveal-parallax)
        - [Background Image Parallax](#background-image-parallax)
        - [Card Hover Parallax](#card-hover-parallax)

## Basic Scroll-Based Parallax

The foundation of parallax effects starts with tracking scroll progress and transforming elements accordingly.

```jsx
import { motion, useScroll, useTransform } from "framer-motion";

const BasicParallax = () => {
    const { scrollY } = useScroll();

    // Transform scroll position to translateY
    const y = useTransform(scrollY, [0, 1000], [0, -200]);

    return (
        <motion.div
            style={{ y }}
            className="w-full h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
        >
            Basic Parallax Element
        </motion.div>
    );
};
```

## useScroll Hook

The `useScroll` hook provides scroll progress and position information for creating parallax effects.

```jsx
const ScrollProgressExample = () => {
    const { scrollY, scrollYProgress } = useScroll();

    // scrollY: absolute scroll position in pixels
    // scrollYProgress: scroll progress from 0 to 1

    return (
        <div>
            {/* Progress indicator */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 to-blue-500 origin-left z-50"
            />

            {/* Parallax background */}
            <motion.div
                style={{ y: useTransform(scrollY, [0, 1000], [0, -300]) }}
                className="fixed inset-0 bg-gradient-to-b from-purple-900 to-blue-900 -z-10"
            />
        </div>
    );
};

// Container-based scroll tracking
const ContainerScrollExample = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={containerRef} className="h-screen overflow-y-auto">
            <motion.div
                style={{
                    scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2]),
                }}
                className="w-32 h-32 bg-orange-500 rounded-lg m-8"
            />
        </div>
    );
};
```

## useTransform Hook

The `useTransform` hook maps input ranges to output ranges, essential for creating parallax effects.

```jsx
const TransformExamples = () => {
    const { scrollY } = useScroll();

    // Multiple transform examples
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -200]);
    const opacity = useTransform(scrollY, [100, 300, 500], [1, 0.5, 0]);
    const scale = useTransform(scrollY, [0, 250, 500], [1, 1.1, 1]);
    const rotate = useTransform(scrollY, [0, 500], [0, 360]);
    const blur = useTransform(scrollY, [0, 500], [0, 10]);

    return (
        <div className="space-y-8">
            {/* Different speeds for layered effect */}
            <motion.div
                style={{ y: y1 }}
                className="w-40 h-40 bg-red-500 rounded-lg"
            />
            <motion.div
                style={{ y: y2 }}
                className="w-40 h-40 bg-blue-500 rounded-lg"
            />

            {/* Opacity fade */}
            <motion.div
                style={{ opacity }}
                className="w-48 h-48 bg-green-500 rounded-lg flex items-center justify-center text-white"
            >
                Fading Element
            </motion.div>

            {/* Scale and rotate */}
            <motion.div
                style={{ scale, rotate }}
                className="w-32 h-32 bg-purple-500 rounded-lg"
            />

            {/* Blur effect */}
            <motion.div
                style={{ filter: blur }}
                className="w-64 h-64 bg-yellow-400 rounded-lg"
            />
        </div>
    );
};

// Advanced transform with custom easing
const AdvancedTransform = () => {
    const { scrollYProgress } = useScroll();

    // Custom transform with easing
    const pathLength = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0, 1, 0],
        { ease: [0.22, 1, 0.36, 1] }, // Custom easing
    );

    return (
        <svg width="200" height="200" className="border border-gray-300">
            <motion.path
                d="M 20 100 Q 100 20 180 100"
                stroke="#3B82F6"
                strokeWidth="4"
                fill="none"
                style={{ pathLength }}
            />
        </svg>
    );
};
```

## useSpring Hook for Smooth Parallax

The `useSpring` hook adds physics-based smoothing to parallax animations.

```jsx
const SpringParallax = () => {
    const { scrollY } = useScroll();

    // Smooth parallax with spring physics
    const smoothY = useSpring(useTransform(scrollY, [0, 1000], [0, -200]), {
        damping: 20,
        stiffness: 100,
    });

    const smoothScale = useSpring(useTransform(scrollY, [0, 500], [1, 1.2]), {
        damping: 15,
        stiffness: 200,
    });

    return (
        <motion.div
            style={{
                y: smoothY,
                scale: smoothScale,
            }}
            className="w-64 h-64 bg-gradient-to-br from-pink-400 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold"
        >
            Spring Parallax
        </motion.div>
    );
};

// Spring-based scroll indicator
const SpringScrollIndicator = () => {
    const { scrollYProgress } = useScroll();
    const pathLength = useSpring(scrollYProgress, {
        damping: 30,
        stiffness: 400,
    });

    return (
        <svg width="100" height="100" className="fixed bottom-8 right-8">
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="#10B981"
                strokeWidth="8"
                fill="none"
                style={{ pathLength }}
                transform="rotate(-90 50 50)"
            />
        </svg>
    );
};
```

## useViewportScroll Hook

The `useViewportScroll` hook provides viewport-based scroll information (deprecated in favor of `useScroll`).

```jsx
const ViewportParallax = () => {
    const { scrollY, scrollYProgress } = useViewportScroll();

    // Create parallax based on viewport scroll
    const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
    const contentY = useTransform(scrollY, [0, 1000], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    return (
        <div className="relative h-screen">
            {/* Background layer */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 bg-gradient-to-b from-blue-900 to-purple-900"
            />

            {/* Content layer */}
            <motion.div
                style={{ y: contentY, opacity }}
                className="relative z-10 flex items-center justify-center h-full text-white text-4xl font-bold"
            >
                Viewport Parallax Content
            </motion.div>
        </div>
    );
};
```

## useElementScroll Hook

The `useElementScroll` hook tracks scroll within a specific element (deprecated in favor of `useScroll` with target).

```jsx
const ElementScrollParallax = () => {
    const containerRef = useRef(null);
    const { scrollY, scrollYProgress } = useElementScroll(containerRef);

    // Transform based on element scroll
    const scale = useTransform(scrollY, [0, 500], [0.5, 1.5]);
    const rotate = useTransform(scrollY, [0, 500], [0, 180]);

    return (
        <div
            ref={containerRef}
            className="h-96 overflow-y-auto border-2 border-gray-300 rounded-lg"
        >
            <div className="h-[200vh] relative">
                <motion.div
                    style={{ scale, rotate }}
                    className="sticky top-8 left-8 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"
                />
                <div className="p-8">
                    <p className="text-lg mb-4">
                        Scroll within this container to see parallax effects.
                    </p>
                    <div className="h-[100vh]" />
                </div>
            </div>
        </div>
    );
};
```

## Advanced Parallax Techniques

Advanced techniques for creating sophisticated parallax effects.

```jsx
const AdvancedParallax = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Complex multi-property transforms
    const transform = {
        y: useTransform(scrollYProgress, [0, 1], [0, -500]),
        scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]),
        rotate: useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]),
        opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
        blur: useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, 5]),
    };

    // Staggered animations
    const itemCount = 5;
    const items = Array.from({ length: itemCount }, (_, i) => {
        const progress = useTransform(
            scrollYProgress,
            [0, 1],
            [i * 0.2, i * 0.2 + 0.8],
        );

        return {
            y: useTransform(progress, [0, 1], [100, -100]),
            opacity: useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
            scale: useTransform(progress, [0, 0.5, 1], [0.8, 1, 0.9]),
        };
    });

    return (
        <div ref={containerRef} className="relative h-[300vh]">
            {/* Main parallax element */}
            <motion.div
                style={{
                    y: transform.y,
                    scale: transform.scale,
                    rotate: transform.rotate,
                    opacity: transform.opacity,
                    filter: transform.blur,
                }}
                className="sticky top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-white text-2xl font-bold"
            >
                Advanced Parallax
            </motion.div>

            {/* Staggered items */}
            <div className="absolute inset-0 flex items-center justify-center gap-8">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        style={{
                            y: item.y,
                            opacity: item.opacity,
                            scale: item.scale,
                        }}
                        className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
};
```

## Multi-Layer Parallax

Create depth with multiple parallax layers moving at different speeds.

```jsx
const MultiLayerParallax = () => {
    const { scrollY } = useScroll();

    // Different speeds for depth effect
    const layers = [
        { speed: 0.2, className: "bg-blue-900 opacity-90" },
        { speed: 0.4, className: "bg-blue-800 opacity-80" },
        { speed: 0.6, className: "bg-blue-700 opacity-70" },
        { speed: 0.8, className: "bg-blue-600 opacity-60" },
        { speed: 1.0, className: "bg-blue-500 opacity-50" },
    ];

    return (
        <div className="relative h-screen overflow-hidden">
            {layers.map((layer, index) => {
                const y = useTransform(
                    scrollY,
                    [0, 1000],
                    [0, -200 * layer.speed],
                );

                return (
                    <motion.div
                        key={index}
                        style={{ y }}
                        className={`absolute inset-0 ${layer.className}`}
                    >
                        <div className="h-full flex items-center justify-center text-white text-6xl font-bold">
                            Layer {index + 1}
                        </div>
                    </motion.div>
                );
            })}

            {/* Content layer */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <motion.div
                    style={{
                        y: useTransform(scrollY, [0, 1000], [0, -50]),
                    }}
                    className="bg-white bg-opacity-90 p-12 rounded-2xl shadow-2xl"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Multi-Layer Parallax
                    </h1>
                    <p className="text-gray-600">
                        Scroll to see the depth effect
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

// Parallax with floating elements
const FloatingParallax = () => {
    const { scrollY } = useScroll();

    const floatingElements = [
        { id: 1, size: "w-16 h-16", speed: 0.3, startX: 10, startY: 20 },
        { id: 2, size: "w-12 h-12", speed: 0.5, startX: 80, startY: 40 },
        { id: 3, size: "w-20 h-20", speed: 0.2, startX: 60, startY: 60 },
        { id: 4, size: "w-8 h-8", speed: 0.7, startX: 20, startY: 80 },
        { id: 5, size: "w-14 h-14", speed: 0.4, startX: 90, startY: 10 },
    ];

    return (
        <div className="relative h-screen bg-gradient-to-br from-purple-900 to-blue-900">
            {floatingElements.map((element) => {
                const y = useTransform(
                    scrollY,
                    [0, 1000],
                    [0, -300 * element.speed],
                );
                const rotate = useTransform(
                    scrollY,
                    [0, 1000],
                    [0, 360 * element.speed],
                );

                return (
                    <motion.div
                        key={element.id}
                        style={{
                            y,
                            rotate,
                            left: `${element.startX}%`,
                            top: `${element.startY}%`,
                        }}
                        className={`absolute ${element.size} bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-70`}
                    />
                );
            })}

            <div className="relative z-10 flex items-center justify-center h-full">
                <h1 className="text-6xl font-bold text-white">
                    Floating Parallax
                </h1>
            </div>
        </div>
    );
};
```

## Horizontal Parallax

Create horizontal parallax effects for unique scrolling experiences.

```jsx
const HorizontalParallax = () => {
    const { scrollY } = useScroll();

    // Horizontal movement based on vertical scroll
    const x1 = useTransform(scrollY, [0, 1000], [0, -200]);
    const x2 = useTransform(scrollY, [0, 1000], [0, 300]);
    const x3 = useTransform(scrollY, [0, 1000], [0, -400]);

    return (
        <div className="relative h-screen overflow-hidden">
            {/* Background layer moving left */}
            <motion.div
                style={{ x: x1 }}
                className="absolute top-0 left-0 w-[200%] h-32 bg-gradient-to-r from-blue-600 to-purple-600"
            />

            {/* Middle layer moving right */}
            <motion.div
                style={{ x: x2 }}
                className="absolute top-32 left-0 w-[200%] h-32 bg-gradient-to-r from-purple-600 to-pink-600"
            />

            {/* Foreground layer moving left faster */}
            <motion.div
                style={{ x: x3 }}
                className="absolute top-64 left-0 w-[200%] h-32 bg-gradient-to-r from-pink-600 to-red-600"
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="bg-white bg-opacity-90 p-12 rounded-2xl shadow-2xl">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Horizontal Parallax
                    </h1>
                    <p className="text-gray-600">
                        Vertical scroll creates horizontal movement
                    </p>
                </div>
            </div>
        </div>
    );
};

// Horizontal scroll container
const HorizontalScrollParallax = () => {
    const containerRef = useRef(null);
    const { scrollX, scrollXProgress } = useScroll({
        target: containerRef,
        axis: "x",
    });

    // Vertical movement based on horizontal scroll
    const y1 = useTransform(scrollX, [0, 1000], [0, -100]);
    const y2 = useTransform(scrollX, [0, 1000], [0, 100]);
    const rotate = useTransform(scrollX, [0, 1000], [0, 360]);

    return (
        <div
            ref={containerRef}
            className="flex overflow-x-auto w-full h-96 bg-gray-100"
        >
            <div className="flex-none w-[200vw] relative">
                {/* Parallax elements */}
                <motion.div
                    style={{ y: y1, rotate }}
                    className="absolute left-32 top-16 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"
                />

                <motion.div
                    style={{ y: y2 }}
                    className="absolute left-96 top-32 w-48 h-48 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full"
                />

                <motion.div
                    style={{ y: useTransform(scrollX, [0, 1000], [0, -150]) }}
                    className="absolute right-32 bottom-16 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl"
                />

                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Horizontal Scroll Parallax
                    </h2>
                </div>
            </div>
        </div>
    );
};
```

## Parallax with Sticky Elements

Combine parallax effects with sticky positioning for advanced layouts.

```jsx
const StickyParallax = () => {
    const { scrollY } = useScroll();

    // Sticky header with parallax
    const headerScale = useTransform(scrollY, [0, 200], [1, 0.8]);
    const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.9]);

    return (
        <div className="relative">
            {/* Sticky header with parallax */}
            <motion.header
                style={{ scale: headerScale, opacity: headerOpacity }}
                className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6"
            >
                <h1 className="text-3xl font-bold">Sticky Parallax Header</h1>
            </motion.header>

            {/* Content with parallax sections */}
            <div className="relative">
                {Array.from({ length: 5 }, (_, i) => {
                    const sectionY = useTransform(
                        scrollY,
                        [i * 400, (i + 1) * 400],
                        [100, -100],
                    );
                    const sectionOpacity = useTransform(
                        scrollY,
                        [i * 400, (i + 1) * 400],
                        [0.5, 1],
                    );

                    return (
                        <motion.section
                            key={i}
                            style={{ y: sectionY, opacity: sectionOpacity }}
                            className="h-screen flex items-center justify-center"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl">
                                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                    Section {i + 1}
                                </h2>
                                <p className="text-gray-600">
                                    This section has parallax effects while
                                    scrolling.
                                </p>
                            </div>
                        </motion.section>
                    );
                })}
            </div>
        </div>
    );
};

// Sticky sidebar with parallax
const StickySidebarParallax = () => {
    const { scrollY } = useScroll();

    const sidebarY = useTransform(scrollY, [0, 1000], [0, -200]);
    const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);

    return (
        <div className="flex min-h-screen">
            {/* Sticky sidebar */}
            <motion.aside
                style={{ y: sidebarY }}
                className="sticky top-0 w-64 h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white p-8"
            >
                <h2 className="text-2xl font-bold mb-4">Sticky Sidebar</h2>
                <nav className="space-y-2">
                    {["Home", "About", "Services", "Contact"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="block py-2 hover:text-blue-300"
                        >
                            {item}
                        </a>
                    ))}
                </nav>
            </motion.aside>

            {/* Main content */}
            <main className="flex-1 p-8">
                <motion.div style={{ opacity: contentOpacity }}>
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">
                        Main Content
                    </h1>
                    <div className="space-y-8">
                        {Array.from({ length: 20 }, (_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-lg shadow p-6"
                            >
                                <h3 className="text-xl font-semibold mb-2">
                                    Content Block {i + 1}
                                </h3>
                                <p className="text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </main>
        </div>
    );
};
```

## Performance Optimization

### Throttling and Scroll Performance

Framer Motion provides built-in optimizations for scroll-based animations, but understanding throttling is crucial for smooth performance:

#### Built-in Throttling Behavior

```jsx
const AutoThrottledParallax = () => {
    const { scrollY } = useScroll();

    // Framer Motion automatically throttles scroll updates
    // Updates are synced to the browser's refresh rate (typically 60fps)
    const y = useTransform(scrollY, [0, 1000], [0, -200]);

    return <motion.div style={{ y }} className="w-32 h-32 bg-blue-500" />;
};
```

#### Manual Throttling Control

```jsx
const ManualThrottledParallax = () => {
    // Option 1: Using smooth parameter for built-in throttling
    const { scrollY: smoothScrollY } = useScroll({
        smooth: 0.1, // 0 = no smoothing, 1 = maximum smoothing
    });

    const smoothY = useTransform(smoothScrollY, [0, 1000], [0, -200]);

    // Option 2: Custom throttling with useSpring
    const { scrollY } = useScroll();
    const rawY = useTransform(scrollY, [0, 1000], [0, -200]);
    const throttledY = useSpring(rawY, {
        damping: 30,
        stiffness: 200,
        mass: 0.5,
    });

    return (
        <div>
            <motion.div
                style={{ y: smoothY }}
                className="w-32 h-32 bg-green-500 mb-4"
            />
            <motion.div
                style={{ y: throttledY }}
                className="w-32 h-32 bg-purple-500"
            />
        </div>
    );
};
```

#### Advanced Throttling Strategies

```jsx
const AdvancedThrottledParallax = () => {
    const { scrollY } = useScroll();

    // Strategy 1: Distance-based throttling
    const lastScrollY = useRef(0);
    const throttledScrollY = useMotionValue(0);

    useEffect(() => {
        const unsubscribe = scrollY.onChange((latest) => {
            const delta = Math.abs(latest - lastScrollY.current);

            // Only update if scroll distance exceeds threshold
            if (delta > 5) {
                throttledScrollY.set(latest);
                lastScrollY.current = latest;
            }
        });

        return unsubscribe;
    }, [scrollY]);

    // Strategy 2: Time-based throttling
    const throttledTimeScrollY = useMotionValue(0);
    const lastUpdateTime = useRef(0);

    useEffect(() => {
        const unsubscribe = scrollY.onChange((latest) => {
            const now = performance.now();

            // Throttle to 30fps (33ms between updates)
            if (now - lastUpdateTime.current > 33) {
                throttledTimeScrollY.set(latest);
                lastUpdateTime.current = now;
            }
        });

        return unsubscribe;
    }, [scrollY]);

    const y1 = useTransform(throttledScrollY, [0, 1000], [0, -200]);
    const y2 = useTransform(throttledTimeScrollY, [0, 1000], [0, -200]);

    return (
        <div className="space-y-4">
            <motion.div style={{ y: y1 }} className="w-32 h-32 bg-orange-500" />
            <motion.div style={{ y: y2 }} className="w-32 h-32 bg-teal-500" />
        </div>
    );
};
```

#### Performance Monitoring

```jsx
const PerformanceMonitoredParallax = () => {
    const { scrollY } = useScroll();
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());

    useEffect(() => {
        const unsubscribe = scrollY.onChange(() => {
            frameCount.current++;

            const now = performance.now();
            if (now - lastTime.current >= 1000) {
                console.log(`Scroll updates per second: ${frameCount.current}`);
                frameCount.current = 0;
                lastTime.current = now;
            }
        });

        return unsubscribe;
    }, [scrollY]);

    const y = useTransform(scrollY, [0, 1000], [0, -200]);

    return <motion.div style={{ y }} className="w-32 h-32 bg-red-500" />;
};
```

### 1. Use CSS transforms

```jsx
// Good - uses transform for better performance
const OptimizedParallax = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, -200]);

    return (
        <motion.div
            style={{ y }} // Uses transform
            className="w-32 h-32 bg-blue-500"
        />
    );
};

// Avoid - triggers layout recalculation
const UnoptimizedParallax = () => {
    const { scrollY } = useScroll();
    const top = useTransform(scrollY, [0, 1000], [0, -200]);

    return (
        <motion.div
            style={{ top }} // Triggers layout
            className="absolute w-32 h-32 bg-blue-500"
        />
    );
};
```

### 2. Implement scroll throttling

```jsx
const ThrottledParallax = () => {
    const { scrollY } = useScroll({
        container: window,
        smooth: 0.1, // Adds smoothing to reduce updates
    });

    const y = useTransform(scrollY, [0, 1000], [0, -200]);

    return <motion.div style={{ y }} className="w-32 h-32 bg-green-500" />;
};
```

### 3. Use will-change property

```jsx
const HardwareAcceleratedParallax = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, -200]);

    return (
        <motion.div
            style={{
                y,
                willChange: "transform", // Hint for browser optimization
            }}
            className="w-32 h-32 bg-purple-500"
        />
    );
};
```

## Best Practices

1. **Use transform properties** - Always prefer `transform` over layout properties like `top`, `left`
2. **Limit parallax elements** - Too many animated elements can hurt performance
3. **Test on mobile devices** - Ensure smooth performance on lower-powered devices
4. **Provide fallbacks** - Consider users with motion sensitivity
5. **Use spring physics** - Add `useSpring` for natural-feeling animations
6. **Optimize transform ranges** - Keep input/output ranges reasonable
7. **Consider viewport size** - Adapt parallax intensity based on screen size

## Common Parallax Patterns

### Hero Section Parallax

```jsx
const HeroParallax = () => {
    const { scrollY } = useScroll();

    const backgroundY = useTransform(scrollY, [0, 500], [0, -250]);
    const titleY = useTransform(scrollY, [0, 500], [0, -100]);
    const subtitleOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="relative h-screen overflow-hidden">
            {/* Background image parallax */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 bg-cover bg-center bg-[url('/hero-bg.jpg')]"
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center text-white">
                    <motion.h1
                        style={{ y: titleY }}
                        className="text-6xl font-bold mb-4"
                    >
                        Hero Title
                    </motion.h1>
                    <motion.p
                        style={{ opacity: subtitleOpacity }}
                        className="text-xl"
                    >
                        Hero subtitle with fade effect
                    </motion.p>
                </div>
            </div>
        </div>
    );
};
```

### Content Reveal Parallax

```jsx
const RevealParallax = () => {
    const { scrollY } = useScroll();

    const revealOpacity = useTransform(scrollY, [200, 500], [0, 1]);
    const revealY = useTransform(scrollY, [200, 500], [50, 0]);
    const revealScale = useTransform(scrollY, [200, 500], [0.8, 1]);

    return (
        <motion.div
            style={{
                opacity: revealOpacity,
                y: revealY,
                scale: revealScale,
            }}
            className="p-12 bg-white rounded-2xl shadow-2xl max-w-2xl mx-auto"
        >
            <h2 className="text-3xl font-bold mb-4">Revealing Content</h2>
            <p className="text-gray-600">
                This content reveals with parallax effects as you scroll.
            </p>
        </motion.div>
    );
};
```

### Background Image Parallax

```jsx
const BackgroundParallax = () => {
    const { scrollY } = useScroll();

    const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
    const overlayOpacity = useTransform(scrollY, [0, 500], [0.3, 0.7]);

    return (
        <div className="relative h-screen">
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 bg-cover bg-center bg-[url('/parallax-bg.jpg')]"
            />

            <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-black"
            />

            <div className="relative z-10 flex items-center justify-center h-full">
                <h1 className="text-5xl font-bold text-white">
                    Background Parallax
                </h1>
            </div>
        </div>
    );
};
```

### Card Hover Parallax

```jsx
const CardHoverParallax = () => {
    const { scrollY } = useScroll();

    const cards = Array.from({ length: 6 }, (_, i) => {
        const y = useTransform(scrollY, [i * 200, i * 200 + 400], [100, -100]);
        const opacity = useTransform(
            scrollY,
            [i * 200, i * 200 + 200, i * 200 + 400],
            [0, 1, 0],
        );
        const scale = useTransform(
            scrollY,
            [i * 200, i * 200 + 200, i * 200 + 400],
            [0.9, 1, 0.9],
        );

        return { y, opacity, scale };
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    style={{
                        y: card.y,
                        opacity: card.opacity,
                        scale: card.scale,
                    }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h3 className="text-xl font-semibold mb-2">Card {i + 1}</h3>
                    <p className="text-gray-600">
                        This card has scroll-based parallax effects.
                    </p>
                </motion.div>
            ))}
        </div>
    );
};
```

This comprehensive guide covers various parallax techniques using Framer Motion's built-in hooks. Experiment with different combinations to create unique and engaging scroll-based animations for your projects!
