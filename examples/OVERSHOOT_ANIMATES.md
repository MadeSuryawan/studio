# Framer Motion Overshoot Examples

This document provides comprehensive examples of overshoot animations using Framer Motion, demonstrating various techniques to create smooth, bouncy, and engaging animations.

## Table of Contents

- [Framer Motion Overshoot Examples](#framer-motion-overshoot-examples)
    - [Table of Contents](#table-of-contents)
    - [Basic Overshoot Animation](#basic-overshoot-animation)
    - [Spring Configuration](#spring-configuration)
    - [Button Hover Effects](#button-hover-effects)
    - [Card Animations](#card-animations)
    - [Modal Entrance](#modal-entrance)
    - [List Item Stagger](#list-item-stagger)
    - [Scale and Rotate Overshoot](#scale-and-rotate-overshoot)
    - [Custom Easing Functions](#custom-easing-functions)
    - [Advanced Spring Physics](#advanced-spring-physics)
    - [Performance Tips](#performance-tips)
        - [1. Use `transform` properties for better performance](#1-use-transform-properties-for-better-performance)
        - [2. Optimize with `will-change`](#2-optimize-with-will-change)
        - [3. Use `layoutId` for shared element transitions](#3-use-layoutid-for-shared-element-transitions)
    - [Best Practices](#best-practices)
    - [Common Overshoot Patterns](#common-overshoot-patterns)
        - [Entrance Animations](#entrance-animations)
        - [Hover Effects](#hover-effects)
        - [Button Interactions](#button-interactions)
        - [Loading States](#loading-states)

## Basic Overshoot Animation

The simplest way to create an overshoot effect is using the `type: "spring"` transition with appropriate damping and stiffness values.

```jsx
import { motion } from "framer-motion";

const BasicOvershoot = () => {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                restDelta: 0.001,
            }}
            className="w-32 h-32 bg-blue-500 rounded-lg"
        />
    );
};
```

## Spring Configuration

Different spring configurations create various overshoot effects:

```jsx
const SpringVariations = () => {
    const springConfigs = {
        // Gentle overshoot
        gentle: {
            type: "spring",
            damping: 20,
            stiffness: 300,
        },

        // Bouncy overshoot
        bouncy: {
            type: "spring",
            damping: 8,
            stiffness: 400,
        },

        // Wobbly overshoot
        wobbly: {
            type: "spring",
            damping: 5,
            stiffness: 200,
        },

        // Quick settle
        quick: {
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    };

    return (
        <div className="space-y-4">
            {Object.entries(springConfigs).map(([name, config]) => (
                <motion.div
                    key={name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={config}
                    className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                />
            ))}
        </div>
    );
};
```

## Button Hover Effects

Create engaging button interactions with overshoot animations:

```jsx
const OvershootButton = ({ children, onClick }) => {
    return (
        <motion.button
            whileHover={{
                scale: 1.05,
                transition: {
                    type: "spring",
                    damping: 15,
                    stiffness: 400,
                },
            }}
            whileTap={{
                scale: 0.95,
                transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 600,
                },
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

// Advanced button with multiple properties
const AdvancedOvershootButton = () => {
    return (
        <motion.button
            initial={{ y: 0 }}
            whileHover={{
                y: -2,
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                transition: {
                    type: "spring",
                    damping: 12,
                    stiffness: 300,
                },
            }}
            whileTap={{
                y: 0,
                scale: 0.98,
                transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 500,
                },
            }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold"
        >
            Click Me!
        </motion.button>
    );
};
```

## Card Animations

Animate cards with overshoot effects for engaging user interfaces:

```jsx
const OvershootCard = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{
                y: 50,
                opacity: 0,
                scale: 0.9,
            }}
            animate={{
                y: 0,
                opacity: 1,
                scale: 1,
            }}
            transition={{
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: delay,
            }}
            whileHover={{
                y: -5,
                scale: 1.02,
                transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 400,
                },
            }}
            className="p-6 bg-white rounded-xl shadow-lg border border-gray-200"
        >
            {children}
        </motion.div>
    );
};

// Grid of cards with staggered animation
const CardGrid = () => {
    const cards = Array.from({ length: 6 }, (_, i) => i);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((index) => (
                <OvershootCard key={index} delay={index * 0.1}>
                    <h3 className="text-xl font-bold mb-2">Card {index + 1}</h3>
                    <p className="text-gray-600">
                        This is card content with overshoot animation.
                    </p>
                </OvershootCard>
            ))}
        </div>
    );
};
```

## Modal Entrance

Create impressive modal entrances with overshoot effects:

```jsx
const OvershootModal = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{
                            scale: 0.8,
                            opacity: 0,
                            y: 50,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            scale: 0.8,
                            opacity: 0,
                            y: 50,
                        }}
                        transition={{
                            type: "spring",
                            damping: 15,
                            stiffness: 300,
                        }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    >
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
```

## List Item Stagger

Animate list items with staggered overshoot effects:

```jsx
const StaggeredList = ({ items }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: {
            x: -50,
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    };

    return (
        <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
        >
            {items.map((item, index) => (
                <motion.li
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                        x: 10,
                        transition: {
                            type: "spring",
                            damping: 20,
                            stiffness: 400,
                        },
                    }}
                    className="p-4 bg-gray-100 rounded-lg cursor-pointer"
                >
                    {item}
                </motion.li>
            ))}
        </motion.ul>
    );
};
```

## Scale and Rotate Overshoot

Combine scaling and rotation for dynamic effects:

```jsx
const ScaleRotateOvershoot = () => {
    return (
        <motion.div
            initial={{
                scale: 0,
                rotate: -180,
                opacity: 0,
            }}
            animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
            }}
            transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                duration: 0.8,
            }}
            whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: {
                    type: "spring",
                    damping: 15,
                    stiffness: 400,
                },
            }}
            className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
        >
            🚀
        </motion.div>
    );
};
```

## Custom Easing Functions

Create custom easing functions for unique overshoot effects:

```jsx
import { cubicBezier } from "framer-motion";

const CustomEasingOvershoot = () => {
    // Custom cubic-bezier for overshoot effect
    const customEase = cubicBezier(0.68, -0.55, 0.265, 1.55);

    return (
        <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                duration: 0.8,
                ease: customEase,
            }}
            className="w-24 h-24 bg-green-500 rounded-full"
        />
    );
};

// Multiple custom easing examples
const EasingShowcase = () => {
    const easings = {
        backOut: cubicBezier(0.175, 0.885, 0.32, 1.275),
        backInOut: cubicBezier(0.68, -0.55, 0.265, 1.55),
        elasticOut: cubicBezier(0.25, 0.46, 0.45, 0.94),
    };

    return (
        <div className="space-y-6">
            {Object.entries(easings).map(([name, ease]) => (
                <motion.div
                    key={name}
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{
                        duration: 1,
                        ease: ease,
                    }}
                    className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm"
                >
                    {name}
                </motion.div>
            ))}
        </div>
    );
};
```

## Advanced Spring Physics

Fine-tune spring physics for precise overshoot control:

```jsx
const AdvancedSpringPhysics = () => {
    const springConfigs = {
        // Mass affects the "weight" of the animation
        heavy: {
            type: "spring",
            damping: 15,
            stiffness: 200,
            mass: 2,
        },

        // Light and snappy
        light: {
            type: "spring",
            damping: 10,
            stiffness: 400,
            mass: 0.5,
        },

        // Velocity for initial momentum
        momentum: {
            type: "spring",
            damping: 12,
            stiffness: 300,
            velocity: 50,
        },

        // Rest delta for precision
        precise: {
            type: "spring",
            damping: 20,
            stiffness: 400,
            restDelta: 0.0001,
            restSpeed: 0.0001,
        },
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {Object.entries(springConfigs).map(([name, config]) => (
                <motion.div
                    key={name}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={config}
                    className="p-4 bg-blue-500 text-white rounded-lg text-center"
                >
                    {name}
                </motion.div>
            ))}
        </div>
    );
};
```

## Performance Tips

### 1. Use `transform` properties for better performance

```jsx
// Good - uses transform
<motion.div
  animate={{ x: 100, scale: 1.2 }}
  transition={{ type: "spring", damping: 15, stiffness: 300 }}
/>

// Avoid - triggers layout
<motion.div
  animate={{ left: 100, width: 200 }}
  transition={{ type: "spring", damping: 15, stiffness: 300 }}
/>
```

### 2. Optimize with `will-change`

```jsx
<motion.div
    style={{ willChange: "transform" }}
    animate={{ x: 100, y: 50 }}
    transition={{ type: "spring", damping: 15, stiffness: 300 }}
/>
```

### 3. Use `layoutId` for shared element transitions

```jsx
const SharedElementTransition = ({ isExpanded }) => {
    return (
        <motion.div
            layoutId="shared-element"
            animate={{
                scale: isExpanded ? 1.2 : 1,
                borderRadius: isExpanded ? 20 : 8,
            }}
            transition={{
                type: "spring",
                damping: 15,
                stiffness: 300,
            }}
            className="bg-indigo-500 w-32 h-32"
        />
    );
};
```

## Best Practices

1. **Start with gentle overshoots** - Use damping values between 15-25 for subtle effects
2. **Adjust stiffness for speed** - Higher values (300-500) for quick animations, lower (100-200) for slower
3. **Consider mass for realism** - Heavier elements should have higher mass values
4. **Test on different devices** - Ensure animations perform well on mobile devices
5. **Use `restDelta` for precision** - Set to 0.001 or lower for animations that need to settle exactly
6. **Combine with other transitions** - Mix spring animations with duration-based ones for variety

## Common Overshoot Patterns

### Entrance Animations

- Scale from 0 to 1 with spring
- Slide in with overshoot
- Fade in with bounce

### Hover Effects

- Gentle scale increase
- Slight upward movement
- Shadow enhancement

### Button Interactions

- Scale down on press
- Quick spring back on release
- Color transitions

### Loading States

- Pulsing with overshoot
- Rotating with spring physics
- Sequential element reveals

This comprehensive guide should help you implement various overshoot effects in your Framer Motion projects. Experiment with different values to achieve the perfect feel for your animations!
