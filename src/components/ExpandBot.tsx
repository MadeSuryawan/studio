"use client";
import ExpandableDock from "@/components/ui/expandable-dock";
import AIAssistant from "./AIAssistant";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ExpandBot() {
    return (
        <ExpandableDock
            headerContent={<div>Chat with us</div>}
            className="bg-white dark:bg-black align-center"
        >
            <AIAssistant />
        </ExpandableDock>
    );
}
