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
            className="w-12 h-12 md:w-16 md:h-16 rounded-[30%] border-0 shadow-lg hover:scale-110 transition-transform duration-200"
            aria-label="Contact on WhatsApp"
        >
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <WhatsAppIcon className="scale-[3.1] md:scale-[4]" />
            </a>
        </Button>

        // <a
        //     href={whatsappUrl}
        //     target="_blank"
        //     rel="noopener noreferrer"
        //     className="w-12 h-full md:w-16 md:h-16 z-50 transition-transform duration-200 hover:scale-110"
        //     aria-label="Chat on WhatsApp"
        // >
        //     <WhatsAppIcon />
        // </a>
    );
}
