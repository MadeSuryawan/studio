"use client";

import * as React from "react";
import { forwardRef } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlightcard";

// A generic type for the card's data, usable by any section
export type SectionCardData = {
    title: string;
    description: string;
    image: string;
    hint?: string;
};

// Props for the new component
type GenericCardProps = {
    data: SectionCardData;
    spotlight?: boolean;
    buttonText: string;
    buttonLink: string;
};

const SectionCard = forwardRef<HTMLDivElement, GenericCardProps>(
    ({ data, spotlight, buttonText, buttonLink }, ref) => {
        const UseCard = spotlight ? SpotlightCard : Card;
        return (
            // The forwarded ref is attached to the root element of the card
            <UseCard
                ref={ref}
                className={cn(
                    "flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out bg-card text-special-card-fg max-w-xs sm:max-w-sm md:max-w-sm",
                )}
            >
                <div className="p-1">
                    <Image
                        src={data.image}
                        alt={data.title}
                        width={600}
                        height={400}
                        className="object-cover h-48 rounded-t-md"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        data-ai-hint={data.hint}
                    />
                </div>
                <CardContent className="flex flex-col p-3 justify-between flex-grow">
                    <CardTitle className="text-xl leading-relaxed font-bold overflow-hidden text-ellipsis text-nowrap">
                        {data.title}
                    </CardTitle>
                    <div className="flex-grow flex flex-col justify-between">
                        <p className="my-3 text-muted-foreground text-sm leading-relaxed line-clamp-3 min-h-[4.5rem]">
                            {data.description}
                        </p>
                        <div
                            id="button-wrapper"
                            className={cn("flex justify-center mt-auto")}
                        >
                            <ButtonFunc
                                bottonClass="bg-background border-none"
                                text={buttonText}
                                arrow={false}
                                link={buttonLink || "#"}
                                ariaLabel={`${buttonText} ${data.title}`}
                            />
                        </div>
                    </div>
                </CardContent>
            </UseCard>
        );
    },
);

SectionCard.displayName = "SectionCard";

export default SectionCard;

export const ButtonFunc = ({
    bottonClass,
    text,
    link,
    ariaLabel,
    arrow = true,
    onClick,
}: {
    text: string;
    bottonClass?: string;
    link?: string;
    ariaLabel?: string;
    arrow?: boolean;
    onClick?: () => void;
}) => (
    <Button
        asChild
        variant="outline"
        className={`bg-bg-alternate text-special-card-fg border-accent text-center ${bottonClass}`}
        onClick={onClick}
        aria-label={ariaLabel}
    >
        <Link href={link || "#"}>
            {text}
            {arrow && <ArrowRight className="h-4 w-4" />}
        </Link>
    </Button>
);
