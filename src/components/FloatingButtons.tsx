"use client";

import React from "react";
import AIAssistant from "./AIAssistant";
import ScrollToTopButton from "./ScrollToTopButton";
import WhatsAppButton from "./WhatsAppButton";

export default function FloatingButtons(): React.JSX.Element {
    return (
        <>
            <div className="fixed bottom-4 right-4 flex flex-col items-center gap-3 z-50">
                <ScrollToTopButton />
                <WhatsAppButton />
            </div>
            <AIAssistant />
        </>
    );
}
