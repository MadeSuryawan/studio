// src/hooks/use-chat-messages.ts

import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    Message,
    ChatState,
    ChatHookOptions,
    ChatHookReturn,
} from "@/types/chat";
import { CHAT_CONSTANTS } from "@/constants/chat";
import { handleQuery } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

/**
 * Enhanced custom hook for managing chat messages and state
 * Consolidates functionality from multiple chat hooks
 * Handles message operations, API calls, error management, and retry logic
 *
 * @param options - Optional configuration for the chat hook
 * @returns Chat state and methods for interaction
 */
export function useChatMessages(options: ChatHookOptions = {}): ChatHookReturn {
    const {
        initialMessage = CHAT_CONSTANTS.INITIAL_MESSAGE,
        maxRetries = CHAT_CONSTANTS.MAX_RETRY_ATTEMPTS,
        enableRetry = true,
    } = options;

    const { toast } = useToast();
    const retryCountRef = useRef(0);

    const [chatState, setChatState] = useState<ChatState>({
        messages: [
            {
                id: uuidv4(),
                role: "assistant",
                content: initialMessage,
                timestamp: new Date(),
            },
        ],
        isLoading: false,
        error: null,
    });

    // Validate message input
    const validateMessage = useCallback((message: string): string | null => {
        if (!message.trim()) {
            return CHAT_CONSTANTS.ERROR_MESSAGES.VALIDATION;
        }
        if (message.length > CHAT_CONSTANTS.MAX_MESSAGE_LENGTH) {
            return `Message too long. Maximum ${CHAT_CONSTANTS.MAX_MESSAGE_LENGTH} characters allowed.`;
        }
        return null;
    }, []);

    // Add a new message to the chat
    const addMessage = useCallback((role: Message["role"], content: string) => {
        const newMessage: Message = {
            id: uuidv4(),
            role,
            content,
            timestamp: new Date(),
        };

        setChatState((prev) => ({
            ...prev,
            messages: [
                ...prev.messages.slice(-CHAT_CONSTANTS.MAX_MESSAGES + 1),
                newMessage,
            ],
            error: null,
        }));

        return newMessage;
    }, []);

    // Handle API call with retry logic
    const sendMessage = useCallback(
        async (userInput: string): Promise<void> => {
            // Validate input
            const validationError = validateMessage(userInput);
            if (validationError) {
                toast({
                    variant: "destructive",
                    title: "Invalid Input",
                    description: validationError,
                });
                return;
            }

            // Add user message
            addMessage("user", userInput);

            // Set loading state
            setChatState((prev) => ({ ...prev, isLoading: true, error: null }));

            try {
                const response = await handleQuery({ query: userInput });

                if (response.success && response.data) {
                    addMessage("assistant", response.data.answer);
                    retryCountRef.current = 0; // Reset retry count on success
                } else {
                    throw new Error(
                        response.error || CHAT_CONSTANTS.ERROR_MESSAGES.GENERIC,
                    );
                }
            } catch (error) {
                console.error("Chat API Error:", error);

                // Determine error type and message
                let errorMessage: string =
                    CHAT_CONSTANTS.ERROR_MESSAGES.GENERIC;
                if (error instanceof Error) {
                    if (
                        error.message.includes("network") ||
                        error.message.includes("fetch")
                    ) {
                        errorMessage = CHAT_CONSTANTS.ERROR_MESSAGES.NETWORK;
                    } else if (error.message.includes("rate limit")) {
                        errorMessage = CHAT_CONSTANTS.ERROR_MESSAGES.RATE_LIMIT;
                    }
                }

                addMessage("assistant", errorMessage);

                setChatState((prev) => ({
                    ...prev,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Unknown error",
                }));

                toast({
                    variant: "destructive",
                    title: "AI Error",
                    description: errorMessage,
                });
            } finally {
                setChatState((prev) => ({ ...prev, isLoading: false }));
            }
        },
        [addMessage, validateMessage, toast],
    );

    // Retry last message with configurable options
    const retryLastMessage = useCallback(() => {
        if (!enableRetry) {
            toast({
                variant: "destructive",
                title: "Retry Disabled",
                description: "Retry functionality is not enabled.",
            });
            return;
        }

        if (retryCountRef.current >= maxRetries) {
            toast({
                variant: "destructive",
                title: "Max Retries Reached",
                description: "Please try again later.",
            });
            return;
        }

        const lastUserMessage = chatState.messages
            .slice()
            .reverse()
            .find((msg) => msg.role === "user");

        if (lastUserMessage) {
            retryCountRef.current += 1;
            sendMessage(lastUserMessage.content);
        }
    }, [chatState.messages, sendMessage, toast, enableRetry, maxRetries]);

    return {
        messages: chatState.messages,
        isLoading: chatState.isLoading,
        error: chatState.error,
        sendMessage,
        ...(enableRetry && { retryLastMessage }),
    };
}
