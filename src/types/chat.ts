// src/types/chat.ts

/**
 * Represents a single chat message
 */
export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

/**
 * Chat state management interface
 */
export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
}

/**
 * Message styling configuration interface
 */
export interface MessageStyles {
    container: string;
    bubble: string;
    avatar: string;
    avatarFallback: string;
}

/**
 * Hook options for chat functionality
 */
export interface ChatHookOptions {
    initialMessage?: string;
    maxRetries?: number;
    enableRetry?: boolean;
}

/**
 * Return type for chat hooks
 */
export interface ChatHookReturn {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    sendMessage: (message: string) => Promise<void>;
    retryLastMessage?: () => void;
}
