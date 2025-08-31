// src/components/ExpandBot.tsx
"use client";
import React, {
    useState,
    useCallback,
    useMemo,
    memo,
    type FormEvent,
} from "react";
import ExpandableDock from "@/components/ui/expandable-dock";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useChatMessages } from "@/hooks/use-chat-messages";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { MESSAGE_STYLES, CHAT_CONSTANTS } from "@/constants/chat";
import type { Message } from "../../types/chat";

/**
 * Enhanced ExpandBot component with improved performance, accessibility, and maintainability
 * Features:
 * - Respects user motion preferences
 * - Uses optimized hooks for chat functionality
 * - Implements proper memoization
 * - Enhanced accessibility with ARIA labels
 * - Type-safe implementation
 */
const ExpandBot = memo(function ExpandBot(): React.JSX.Element {
    // Input state management
    const [input, setInput] = useState("");

    // Custom hooks for enhanced functionality
    const prefersReducedMotion = useReducedMotion();
    const { messages, isLoading, sendMessage } = useChatMessages();
    const { scrollAreaRef } = useAutoScroll([messages, isLoading]);

    /**
     * Memoized message styles to prevent unnecessary re-renders
     * Uses constants from the chat constants file
     */
    const messageStyles = useMemo(() => MESSAGE_STYLES, []);

    /**
     * Optimized form submission handler with validation
     * Prevents submission of empty messages and handles loading state
     */
    const handleSubmit = useCallback(
        async (e: FormEvent): Promise<void> => {
            e.preventDefault();

            // Validate input before processing
            const trimmedInput = input.trim();
            if (!trimmedInput || isLoading) return;

            // Validate message length
            if (trimmedInput.length > CHAT_CONSTANTS.MAX_MESSAGE_LENGTH) {
                return;
            }

            // Clear input immediately for better UX
            setInput("");

            // Send message using the optimized hook
            await sendMessage(trimmedInput);
        },
        [input, isLoading, sendMessage],
    );

    /**
     * Optimized input change handler
     */
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
        },
        [],
    );

    /**
     * Memoized loading indicator component
     * Respects reduced motion preferences for animations
     */
    const LoadingIndicator = useMemo(
        () => (
            <div
                className="flex items-start gap-3 justify-start"
                role="status"
                aria-label={CHAT_CONSTANTS.ARIA_LABELS.LOADING_MESSAGE}
            >
                <Avatar className={CHAT_CONSTANTS.AVATAR_SIZE}>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-5 h-5" />
                    </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-muted flex items-center">
                    <Loader2
                        className={cn(
                            "w-5 h-5",
                            !prefersReducedMotion && "animate-spin",
                        )}
                    />
                    <span className="sr-only">
                        {CHAT_CONSTANTS.PLACEHOLDERS.LOADING}
                    </span>
                </div>
            </div>
        ),
        [prefersReducedMotion],
    );

    /**
     * Memoized message component for better performance
     */
    const MessageComponent = memo(
        ({ message, index }: { message: Message; index: number }) => {
            const styles = messageStyles[message.role];
            const isUser = message.role === "user";

            return (
                <div
                    key={message.id || index}
                    className={styles.container}
                    role="article"
                    aria-label={
                        isUser
                            ? CHAT_CONSTANTS.ARIA_LABELS.USER_MESSAGE
                            : CHAT_CONSTANTS.ARIA_LABELS.ASSISTANT_MESSAGE
                    }
                >
                    {!isUser && (
                        <Avatar className={styles.avatar}>
                            <AvatarFallback className={styles.avatarFallback}>
                                <Bot className="w-5 h-5" />
                            </AvatarFallback>
                        </Avatar>
                    )}
                    <div className={styles.bubble}>
                        <p className="text-sm">{message.content}</p>
                    </div>
                    {isUser && (
                        <Avatar className={styles.avatar}>
                            <AvatarFallback className={styles.avatarFallback}>
                                <User className="w-5 h-5" />
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            );
        },
    );

    // Set display name for MessageComponent
    MessageComponent.displayName = "MessageComponent";

    /**
     * Main chat content with enhanced accessibility and performance
     */
    const chatContent = useMemo(
        () => (
            <div className="flex flex-col h-full w-full">
                {/* Chat Header with enhanced accessibility */}
                <header
                    className={cn(
                        "flex flex-row justify-center items-center gap-2 py-2 border-b border-gray-200 dark:border-gray-700",
                    )}
                    role="banner"
                >
                    <Bot className="text-primary h-5 w-5" aria-hidden="true" />
                    <h1 className="font-medium text-special-card-fg">
                        AI Travel Assistant
                    </h1>
                </header>

                {/* Messages Area with enhanced accessibility */}
                <main
                    className={cn("flex-1 min-h-0 overflow-hidden pb-32")}
                    role="main"
                    aria-label={CHAT_CONSTANTS.ARIA_LABELS.CHAT_REGION}
                >
                    <ScrollArea
                        className="h-full p-4"
                        ref={scrollAreaRef}
                        role="log"
                        aria-label={CHAT_CONSTANTS.ARIA_LABELS.MESSAGE_LIST}
                        aria-live="polite"
                    >
                        <div className="space-y-1 pr-2">
                            {messages.map((message, index) => (
                                <MessageComponent
                                    key={message.id || index}
                                    message={message}
                                    index={index}
                                />
                            ))}
                            {isLoading && LoadingIndicator}
                        </div>
                    </ScrollArea>
                </main>

                {/* Enhanced Input Area with better accessibility */}
                <footer
                    className={cn(
                        "border-y border-gray-200 dark:border-gray-700 flex-shrink-0 bottom-12 md:bottom-16 left-0 right-0 absolute py-3 px-2",
                    )}
                    role="contentinfo"
                >
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full items-center space-x-2"
                        role="form"
                        aria-label="Send message form"
                    >
                        <Input
                            id="ai-chat-input"
                            name="ai-chat-input"
                            autoComplete="off"
                            value={input}
                            onChange={handleInputChange}
                            placeholder={CHAT_CONSTANTS.PLACEHOLDERS.INPUT}
                            disabled={isLoading}
                            className="flex-1 placeholder:text-muted-foreground/60"
                            aria-label={
                                CHAT_CONSTANTS.ARIA_LABELS.MESSAGE_INPUT
                            }
                            maxLength={CHAT_CONSTANTS.MAX_MESSAGE_LENGTH}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || !input.trim()}
                            aria-label={CHAT_CONSTANTS.ARIA_LABELS.SEND_BUTTON}
                        >
                            <Send className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">
                                {CHAT_CONSTANTS.ARIA_LABELS.SEND_BUTTON}
                            </span>
                        </Button>
                    </form>
                </footer>
            </div>
        ),
        [
            messages,
            isLoading,
            input,
            handleSubmit,
            handleInputChange,
            LoadingIndicator,
            MessageComponent,
            scrollAreaRef,
        ],
    );

    return <ExpandableDock>{chatContent}</ExpandableDock>;
});

// Set display name for better debugging
ExpandBot.displayName = "ExpandBot";

export default ExpandBot;
