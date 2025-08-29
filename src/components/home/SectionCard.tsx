"use client";

import { forwardRef, memo } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlightcard";

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
type GenericCardProps = {
    data: CardData;
    buttonText: string;
    buttonLink: string;
    spotlight?: boolean;
    className?: string;
    packageCard?: boolean;
    baliMap?: boolean;
};

const SectionCard = memo(
    forwardRef<HTMLDivElement, GenericCardProps>((props, ref) => {
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
                    "flex flex-col shadow-lg hover:shadow-xl hover:scale-[1.02] will-change-transform transition-all duration-300 ease-in-out bg-card",
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
                        className={`h-48 object-cover ${
                            packageCard
                                ? "md:h-full md:rounded-l-md md:rounded-r-none"
                                : "rounded-t-md"
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
                    )}
                >
                    <CardTitle
                        className={cn(
                            "card-title text-special-card-fg text-xl font-bold leading-relaxed line-clamp-1",
                        )}
                    >
                        {data.name}
                    </CardTitle>
                    {data.description && (
                        <p
                            className={cn(
                                `card-description my-3 text-muted-foreground text-sm leading-relaxed ${baliMap ? "min-h-[4.5rem]" : ""} line-clamp-3 `,
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
                            `card-button relative bottom-0 mt-auto ${baliMap ? "left-1/2 -translate-x-1/2 mr-auto" : "ml-auto"} `,
                        )}
                    >
                        <ButtonFunc
                            className="bg-background border-none"
                            text={buttonText}
                            link={buttonLink}
                            arrow={false}
                            ariaLabel={`${buttonText} for ${data.name}`}
                        />
                    </div>
                </CardContent>
            </UseCard>
        );
    }),
);

SectionCard.displayName = "SectionCard";
export { SectionCard };

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
    // const safeHref = React.useMemo(() => {
    //     if (!link) return "#";
    //     if (link.startsWith("/")) return link; // same-origin relative
    //     try {
    //         const base =
    //             typeof window !== "undefined"
    //                 ? window.location.origin
    //                 : "https://example.com";
    //         const u = new URL(link, base);
    //         const allowedProtocols = ["https:", "mailto:", "tel:"] as const;
    //         return allowedProtocols.includes(u.protocol as any)
    //             ? u.toString()
    //             : "#";
    //     } catch {
    //         return "#";
    //     }
    // }, [link]);
    // const isExternal = safeHref.startsWith("http");
    return (
        <Button
            asChild
            variant="outline"
            className={cn(
                "section-button bg-bg-alternate text-special-card-fg border-accent text-center",
                className,
            )}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            <Link
                // href={safeHref}
                // prefetch={false}
                // target={isExternal ? "_blank" : undefined}
                // rel={isExternal ? "noopener noreferrer" : undefined}
                href={link || "#"}
            >
                {text}
                {arrow && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
            </Link>
        </Button>
    );
};
