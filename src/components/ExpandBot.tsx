// src/components/ExpandBot.tsx
"use client";
import React, { useState, useRef, useEffect, type FormEvent } from "react";
import ExpandableDock from "@/components/ui/expandable-dock";
import { Bot, BotMessageSquare, Send, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { handleQuery } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ExpandBot(): React.JSX.Element {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hello! I'm your BaliBlissed travel assistant. How can I help you plan your trip to Bali today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Message styling configurations
    const messageStyles = {
        user: {
            container: "flex items-start gap-3 rounded-md p-2 justify-end",
            bubble: "p-3 rounded-lg max-w-[80%] bg-primary text-primary-foreground",
            avatar: "w-8 h-8 ml-1",
            avatarFallback: "bg-accent text-accent-foreground",
        },
        assistant: {
            container:
                "flex items-start gap-3 rounded-md p-2 justify-start bg-black/20",
            bubble: "p-3 rounded-lg max-w-[80%] bg-muted",
            avatar: "w-8 h-8 mr-1",
            avatarFallback: "bg-primary text-primary-foreground",
        },
    };

    useEffect(() => {
        // Auto scroll to bottom when new messages are added
        if (scrollAreaRef.current) {
            const scrollableView = scrollAreaRef.current.querySelector("div");
            if (scrollableView) {
                scrollableView.scrollTop = scrollableView.scrollHeight;
            }
        }
    }, [messages, isLoading]);

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        const response = await handleQuery({ query: input });
        setIsLoading(false);

        if (response.success && response.data) {
            const assistantMessage: Message = {
                role: "assistant",
                content: response.data.answer,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } else {
            const errorMessage: Message = {
                role: "assistant",
                content: "I'm sorry, I encountered an error. Please try again.",
            };
            setMessages((prev) => [...prev, errorMessage]);
            toast({
                variant: "destructive",
                title: "AI Error",
                description: response.error,
            });
        }
    };

    const chatContent = (
        <div className="flex flex-col h-full w-full">
            {/* Chat Header */}
            <div className="flex flex-row justify-center items-center gap-2 py-2 border-b border-gray-200 dark:border-gray-700">
                <Bot className="text-primary h-5 w-5" />
                <span className="font-medium text-special-card-fg">
                    AI Travel Assistant
                </span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 min-h-0 overflow-hidden pb-16">
                <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                    <div className="space-y-1 pr-2">
                        {messages.map((message, index) => {
                            const styles = messageStyles[message.role];
                            return (
                                <div key={index} className={styles.container}>
                                    {message.role === "assistant" && (
                                        <Avatar className={styles.avatar}>
                                            <AvatarFallback
                                                className={
                                                    styles.avatarFallback
                                                }
                                            >
                                                <Bot className="w-5 h-5" />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={styles.bubble}>
                                        <p className="text-sm">
                                            {message.content}
                                        </p>
                                    </div>
                                    {message.role === "user" && (
                                        <Avatar className={styles.avatar}>
                                            <AvatarFallback
                                                className={
                                                    styles.avatarFallback
                                                }
                                            >
                                                <User className="w-5 h-5" />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            );
                        })}
                        {isLoading && (
                            <div className="flex items-start gap-3 justify-start">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        <Bot className="w-5 h-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="p-3 rounded-lg bg-muted flex items-center">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Input Area */}
            <div className="border-y border-gray-200 dark:border-gray-700 flex-shrink-0 bottom-12 md:bottom-16 left-0 right-0 absolute py-3 px-2">
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full items-center space-x-2"
                >
                    <Input
                        id="ai-chat-input"
                        name="ai-chat-input"
                        autoComplete="off"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about Bali..."
                        disabled={isLoading}
                        className="flex-1 placeholder:text-muted-foreground/60"
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    );

    return <ExpandableDock>{chatContent}</ExpandableDock>;
}
