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

    const headerContent = (
        <div className="flex flex-col items-center justify-center text-black dark:text-white font-medium">
            {/* Leave it empty so not raises error, For easier to animate the icon in epandable-dock */}
            {/* <BotMessageSquare className="scale-[2] sm:scale-[2.5] text-primary" /> */}
            {/* <span>Chat with us</span> */}
        </div>
    );

    const chatContent = (
        <div className="flex flex-col h-full w-full">
            {/* Chat Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700 pl-2 pt-2">
                <Bot className="text-primary h-5 w-5" />
                <span className="font-medium text-black dark:text-white">
                    AI Travel Assistant
                </span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 min-h-0 overflow-hidden pb-16">
                <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                    <div className="space-y-4 pr-2">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-start gap-3",
                                    message.role === "user"
                                        ? "justify-end"
                                        : "justify-start",
                                )}
                            >
                                {message.role === "assistant" && (
                                    <Avatar className="w-8 h-8 mr-1">
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            <Bot className="w-5 h-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={cn(
                                        "p-3 rounded-lg max-w-[80%]",
                                        message.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted",
                                    )}
                                >
                                    <p className="text-sm">{message.content}</p>
                                </div>
                                {message.role === "user" && (
                                    <Avatar className="w-8 h-8 ml-1">
                                        <AvatarFallback className="bg-accent text-accent-foreground">
                                            <User className="w-5 h-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
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
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bottom-0 left-0 right-0 absolute mb-16 md:mb-20 px-2">
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

    return (
        <ExpandableDock
            headerContent={headerContent}
            className="bg-white dark:bg-black"
        >
            {chatContent}
        </ExpandableDock>
    );
}
