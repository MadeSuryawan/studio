"use client";

import { type JSX, type RefAttributes, memo } from "react";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";
import { cn } from "@/lib/utils";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GradientButton } from "./ui/gradient-button";

const encodedMessage = encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
const whatsappUrl: string = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(encodedMessage)}`;

const WhatsAppIcon = memo(
    ({
        className,
        ...props
    }: { className?: string } & RefAttributes<SVGSVGElement>): JSX.Element => (
        <>
            <FontAwesomeIcon
                icon={faWhatsapp}
                className={cn("relative", className)}
                fill="#ffffff"
                {...props}
            />
        </>
    ),
);
WhatsAppIcon.displayName = "WhatsAppIcon";
export { WhatsAppIcon };

const WhatsAppButton = ({ className }: { className?: string }): JSX.Element => {
    return (
        <GradientButton
            type="button"
            size="sm"
            variant="accent"
            fullWidth={false}
            textShadow="none"
            className={cn(
                "bg-[#25d366]",
                "hover:bg-[#128747]",
                "border-none rounded-lg",
                "aspect-square",
                "w-auto",
                "h-[52px] md:h-[64px]",
                "gap-6",
            )}
            icon={<WhatsAppIcon className="scale-[2.9] md:scale-[3.4]" />}
            iconPosition="right"
            aria-label="Contact Us on WhatsApp"
            aria-describedby="Contact Us on WhatsApp"
            aria-expanded={false}
            aria-pressed={false}
            onClick={() => {
                window.open(whatsappUrl, "_blank", "noopener noreferrer");
            }}
        ></GradientButton>
    );
};
export default WhatsAppButton;
