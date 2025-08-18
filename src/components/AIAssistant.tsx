"use client";
import React, { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";
import { handleQuery } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function AIAssistant(): React.JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    role: "assistant",
                    content:
                        "Hello! I'm your BaliBlissed travel assistant. How can I help you plan your trip to Bali today?",
                },
            ]);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        // Auto scroll to bottom when new messages are added
        if (scrollAreaRef.current) {
            const scrollableView = scrollAreaRef.current.querySelector("div");
            if (scrollableView) {
                scrollableView.scrollTop = scrollableView.scrollHeight;
            }
        }
    }, [messages]);

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

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="h-14 w-14 rounded-full shadow-lg bg-accent hover:bg-accent/90"
                        size="icon"
                        aria-label="Toggle AI Assistant"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <MessageSquare className="h-6 w-6" />
                        )}
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-sm h-[60vh] flex flex-col shadow-2xl z-50 p-0 font-body">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle className="flex items-center gap-2">
                            <Bot className="text-primary" /> AI Travel Assistant
                        </DialogTitle>
                    </DialogHeader>
                    <CardContent className="flex-grow overflow-hidden p-0">
                        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                            <div className="space-y-4">
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
                                            <Avatar className="w-8 h-8">
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
                                            <p className="text-sm">
                                                {message.content}
                                            </p>
                                        </div>
                                        {message.role === "user" && (
                                            <Avatar className="w-8 h-8">
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
                    </CardContent>
                    <CardFooter className="p-4 border-t">
                        <form
                            onSubmit={handleSubmit}
                            className="flex w-full items-center space-x-2"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about Bali..."
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading}
                            >
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </CardFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}