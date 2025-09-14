// src/constants/chat.ts
import { cn } from "@/lib/utils";

export const CHAT_CONSTANTS = {
    // Message limits
    MAX_MESSAGE_LENGTH: 500,
    MAX_MESSAGES: 100,

    // Retry configuration
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,

    // Animation durations (respecting reduced motion)
    SCROLL_DURATION: 300,
    LOADING_ANIMATION_DURATION: 1000,

    // Accessibility
    SCROLL_BEHAVIOR: "smooth" as ScrollBehavior,
    SCROLL_BEHAVIOR_REDUCED: "auto" as ScrollBehavior,

    // UI Constants
    AVATAR_SIZE: "w-8 h-8",
    MESSAGE_MAX_WIDTH: "max-w-[80%]",

    // ARIA Labels
    ARIA_LABELS: {
        CHAT_REGION: "AI Travel Assistant Chat",
        MESSAGE_LIST: "Chat messages",
        MESSAGE_INPUT: "Type your message about Bali travel",
        SEND_BUTTON: "Send message",
        LOADING_MESSAGE: "AI is typing a response",
        USER_MESSAGE: "Your message",
        ASSISTANT_MESSAGE: "AI assistant response",
    },

    // Error Messages
    ERROR_MESSAGES: {
        GENERIC: "I'm sorry, I encountered an error. Please try again.",
        NETWORK: "Network error. Please check your connection and try again.",
        RATE_LIMIT: "Too many requests. Please wait a moment and try again.",
        VALIDATION: "Please enter a valid message.",
    },

    // Placeholder texts
    PLACEHOLDERS: {
        INPUT: "Ask about Bali...",
        LOADING: "AI is thinking...",
    },

    // Initial message
    INITIAL_MESSAGE:
        "Hello! I'm your BaliBlissed travel assistant. How can I help you plan your trip to Bali today?",
} as const;

// Message styling configurations
export const MESSAGE_STYLES = {
    user: {
        container: "flex items-start gap-3 rounded-md p-2 justify-end",
        bubble: cn(
            "p-3 rounded-lg max-w-[80%] bg-teal-400 text-primary-foreground",
        ),
        avatar: "w-8 h-8 ml-1",
        avatarFallback: "bg-accent text-accent-foreground",
    },
    assistant: {
        container: cn(
            "flex items-start gap-3 rounded-md p-2 justify-start bg-black/20",
        ),
        bubble: "p-3 rounded-lg max-w-[80%] bg-muted",
        avatar: "w-8 h-8 mr-1",
        avatarFallback: "bg-primary text-primary-foreground",
    },
} as const;
