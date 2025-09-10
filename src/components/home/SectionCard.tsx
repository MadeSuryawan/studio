"use client";

import { forwardRef, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GradientButton } from "../ui/gradient-button";
import { ChevronRight } from "lucide-react";
import { useReducedMotion, motion } from "framer-motion";

// A generic type for the card's data, usable by any section
export type CardData = {
    name: string;
    description?: string;
    image: string;
    imageClass?: string;
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
    className?: string;
    packageCard?: boolean;
    baliMap?: boolean;
};

const SectionCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const { data, buttonText, buttonLink, className, packageCard, baliMap } =
        props;
    const [isHovered, setIsHovered] = useState(false);
    const reducedMotion = useReducedMotion();
    const MotionImage = motion.create(Image);
    return (
        // The forwarded ref is attached to the root element of the card
        <Card
            ref={ref}
            className={cn(
                "flex flex-col shadow-lg",
                "hover:shadow-xl",
                !reducedMotion &&
                    cn(
                        "will-change-transform",
                        "transition-all duration-300 ease-out",
                        // "hover:scale-[1.01]",
                    ),

                "bg-card border-t-[0px]",
                className,
                "overflow-hidden",
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            {/* Image */}
            <div
                className={cn(
                    "rounded-t-md ",
                    packageCard &&
                        "w-fit md:w-1/2 md:h-fit md:rounded-l-md md:rounded-r-none",
                    "overflow-hidden",
                    "relative",
                    "m-1",
                )}
            >
                <MotionImage
                    src={data.image}
                    alt={data.name}
                    width={600}
                    height={400}
                    className={cn(
                        "h-48 object-cover",
                        data.imageClass && data.imageClass,
                        "brightness-[1.02] dark:brightness-95",
                        "overflow-hidden",
                    )}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    data-ai-hint={data.aiHint}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    animate={
                        !reducedMotion && {
                            scale: isHovered ? 1.03 : 1,
                        }
                    }
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                        duration: 0.3,
                        mass: 0.6,
                        restDelta: 0.001,
                        restSpeed: 0.001,
                    }}
                    quality={85}
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
                        "will-change-colors",
                        "transition-all duration-300 ease-out",
                        isHovered && "text-accent dark:text-primary",
                    )}
                >
                    {data.name}
                </CardTitle>
                {data.description && (
                    <p
                        className={cn(
                            "card-description my-3 text-muted-foreground text-sm leading-relaxed",
                            baliMap && "min-h-[4.5rem]",
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
                        baliMap
                            ? "left-1/2 -translate-x-1/2 mr-auto"
                            : "ml-auto",
                    )}
                >
                    <ButtonFunc
                        text={buttonText}
                        link={buttonLink}
                        arrow={false}
                        ariaLabel={`${buttonText} for ${data.name}`}
                    />
                </div>
            </CardContent>
        </Card>
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
            variant={"outline"}
            size="sm"
            icon={arrow && <ChevronRight />}
            iconPosition={arrow ? "right" : "none"}
            fullWidth={false}
            hapticFeedback={true}
            textShadow="none"
            className={cn(
                "mx-auto",
                "mt-8 md:mt-auto",
                "md:flex flex-row items-center justify-center",
                "left-1/2 -translate-x-1/2",
                "border-black/10",
                "dark:border-blue-400/20",
                "neumorphic-button",
                "will-change-auto",
                className,
            )}
            aria-label={ariaLabel}
            aria-describedby={text}
            aria-expanded={false}
            aria-pressed={true}
            onClick={onClick}
        >
            <Link href={link || "#"}>{text}</Link>
            {/* {arrow && <ChevronRight className="icon-shadow-lg" />} */}
        </GradientButton>
    );
};
