"use client";

import { forwardRef } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "@/components/ui/spotlightcard";
import { GradientButton } from "../ui/gradient-button";
import { ChevronRight } from "lucide-react";

// A generic type for the card's data, usable by any section
export type CardData = {
    name: string;
    description?: string;
    image: string;
    aiHint: string;
    link: string;
    features?: {
        icon: React.ReactNode;
        text: string;
    }[];
};

// Props for the new component
type CardProps = {
    data: CardData;
    buttonText: string;
    buttonLink: string;
    spotlight?: boolean;
    className?: string;
    packageCard?: boolean;
    baliMap?: boolean;
};

const SectionCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const {
        data,
        buttonText,
        buttonLink,
        spotlight,
        className,
        packageCard,
        baliMap,
    } = props;
    const UseCard = spotlight ? SpotlightCard : Card;
    return (
        // The forwarded ref is attached to the root element of the card
        <UseCard
            ref={ref}
            className={cn(
                "flex flex-col shadow-lg",
                "hover:shadow-xl hover:scale-[1.02]",
                "will-change-transform transition-all duration-300 ease-in-out",
                "bg-card border-t-[0px]",
                className,
            )}
        >
            {/* Image */}
            <div
                className={cn(
                    `card-image ${packageCard ? "py-1 px-1 md:pr-0 w-full md:w-1/2" : "p-1"}`,
                )}
            >
                <Image
                    src={data.image}
                    alt={data.name}
                    width={600}
                    height={400}
                    className={`h-48 object-cover rounded-t-md ${
                        packageCard
                            ? "rounded-t-md md:h-full md:rounded-l-md md:rounded-r-none"
                            : ""
                    }`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    data-ai-hint={data.aiHint}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                />
            </div>

            <CardContent
                className={cn(
                    "card-content flex flex-col p-3 justify-between flex-grow",
                    // "bg-purple-600/60",
                )}
            >
                <CardTitle
                    className={cn(
                        "card-title text-special-card-fg text-xl font-bold leading-relaxed line-clamp-1",
                        // "bg-green-400",
                    )}
                >
                    {data.name}
                </CardTitle>
                {data.description && (
                    <p
                        className={cn(
                            "card-description my-3 text-muted-foreground text-sm leading-relaxed",
                            baliMap ? "min-h-[4.5rem]" : "",
                            "line-clamp-3",
                        )}
                    >
                        {data.description}
                    </p>
                )}
                {data.features && (
                    <ul className="my-4 space-y-2 text-sm text-special-card-fg mb-2">
                        {data.features.map((feature) => (
                            <li
                                key={feature.text}
                                className="flex items-center gap-3"
                            >
                                {feature.icon}
                                <span className="line-clamp-1">
                                    {feature.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
                <div
                    className={cn(
                        "card-button relative flex flex-shrink-0 place-content-start",
                        "place-items-start bottom-0 mt-auto h-auto",
                        `${baliMap ? "left-1/2 -translate-x-1/2 mr-auto" : "ml-auto"} `,
                        // "bg-orange-300/60",
                    )}
                >
                    <ButtonFunc
                        className={cn(
                            "shadow-lg",
                            "bg-gradient-to-b from-[#143c4e] to-[#0e2c38] border-2",
                            "hover:shadow-black/30 hover:scale-100",
                            "hover:from-[#163f53] hover:to-[#0f2f3b]",
                            "transtition-all duration-300 ease-in-out",
                            "shadow-sm",
                            "border-none",
                        )}
                        text={buttonText}
                        link={buttonLink}
                        arrow={false}
                        ariaLabel={`${buttonText} for ${data.name}`}
                    />
                </div>
            </CardContent>
        </UseCard>
    );
});

SectionCard.displayName = "SectionCard";
export default SectionCard;

export const ButtonFunc = ({
    className,
    text,
    link,
    ariaLabel,
    arrow = true,
    onClick,
}: {
    text: string;
    className?: string;
    link?: string;
    ariaLabel?: string;
    arrow?: boolean;
    onClick?: () => void;
}) => {
    return (
        <GradientButton
            variant={"secondary"}
            size="sm"
            icon={arrow && <ChevronRight className="icon-shadow-lg" />}
            iconPosition={arrow ? "right" : "none"}
            fullWidth={false}
            hapticFeedback={true}
            textShadow="large"
            className={cn(
                "shadow-md mx-auto text-white/70 mt-8 md:mt-auto",
                "md:flex flex-row items-center justify-center",
                "left-1/2 -translate-x-1/2",
                "hover:scale-[1.02]",
                className,
            )}
            aria-label={ariaLabel}
            aria-describedby={text}
            aria-expanded={false}
            aria-pressed={true}
            onClick={onClick}
        >
            <Link href={link || "#"}>{text}</Link>
        </GradientButton>
    );
};
