"use client";

import { JSX, memo, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, SlidersHorizontal, Phone, Sparkles } from "lucide-react";

interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const benefits: Benefit[] = [
    {
        icon: <Users />,
        title: "Local Expertise",
        description:
            "Our team is based in Bali and has intimate knowledge of the island, ensuring you get an authentic, insider experience.",
    },
    {
        icon: <SlidersHorizontal />,
        title: "Fully Customizable",
        description:
            "Every itinerary is a starting point. We work with you to tailor your trip to your exact interests, style, and budget.",
    },
    {
        icon: <Phone />,
        title: "24/7 On-Trip Support",
        description:
            "Travel with peace of mind knowing that our team is available around the clock to assist you with anything you need.",
    },
    {
        icon: <Sparkles />,
        title: "Unique Experiences",
        description:
            "We go beyond the typical tourist spots to offer unique cultural interactions and hidden gems you won't find elsewhere.",
    },
] as Benefit[];

const SectionTitle = ({ divClass }: { divClass?: string }) => {
    return (
        <div className={cn("text-center mb-12", divClass)}>
            <h2
                className={cn(
                    "font-bold tracking-normal font-headline text-special-card-fg",
                    "text-3xl md:text-5xl",
                )}
            >
                Why Choose BaliBlissed?
            </h2>
            <p
                className={cn(
                    "mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed mt-4",
                )}
            >
                We&rsquo;re more than just a travel agency. We&rsquo;re your
                personal guide to the Island of the Gods.
            </p>
        </div>
    );
};
SectionTitle.displayName = "BlogTitle";

const BenefitCard = memo(({ benefit }: { benefit: Benefit }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Card
            className={cn(
                "text-center p-1 md:p-4 flex flex-col items-center justify-between shadow-xl",
                "hover:shadow-lg transition-shadow duration-300 h-44 sm:h-48 md:h-full",
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <CardHeader
                className={cn(
                    "p-0 mb-1 md:my-2 flex-shrink-0 mx-auto text-accent",
                    "neumorphic-icon-container",
                    "rounded-md",
                    "p-2 md:p-3",
                )}
            >
                {benefit.icon}
            </CardHeader>

            <CardContent className="p-0 flex-1 flex flex-col justify-center min-h-0 my-2 md:my-0">
                <CardTitle
                    className={cn(
                        "text-md md:text-xl mb-2 md:mb-6 flex-shrink-0",
                        "leading-relaxed text-special-card-fg",
                        isHovered && "text-accent dark:text-primary",
                    )}
                >
                    {benefit.title}
                </CardTitle>
                <p className="text-muted-foreground text-xs md:text-sm leading-normal -mt-1 md:mt-0">
                    {benefit.description}
                </p>
            </CardContent>
        </Card>
    );
});
BenefitCard.displayName = "BenefitCard";

export default function WhyChooseUsSection(): JSX.Element {
    return (
        <section id="why-choose-us">
            <div className="container px-4 md:px-6">
                <SectionTitle />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 md:auto-rows-fr">
                    {benefits.map((benefit) => (
                        <BenefitCard key={benefit.title} benefit={benefit} />
                    ))}
                </div>
            </div>
        </section>
    );
}
