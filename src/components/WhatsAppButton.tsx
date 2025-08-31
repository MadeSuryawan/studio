"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const encodedMessage = encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
const whatsappUrl: string = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(encodedMessage)}`;

export default function WhatsAppButton(): React.JSX.Element {
    return (
        <Button
            size="icon"
            asChild
            className="w-12 h-12 md:w-16 md:h-16 rounded-[21%_9%_21%_9%_/_21%_9%_21%_9%] shadow-lg hover:scale-110 transition-transform duration-200"
            aria-label="Contact on WhatsApp"
        >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="scale-[3.1] md:scale-[4]" />
            </a>
        </Button>
    );
}
