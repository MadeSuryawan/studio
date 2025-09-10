"use client";

import { JSX, memo, useRef } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import SectionCard, { CardData, ButtonFunc } from "./SectionCard";
import { cn } from "@/lib/utils";

const destinations: CardData[] = [
    {
        name: "Ubud",
        description:
            "The cultural heart of Bali, known for its lush rice paddies, art galleries, and spiritual retreats.",
        image: "https://placehold.co/600x400.png",
        aiHint: "bali ubud",
        link: "#",
    },
    {
        name: "Canggu",
        description:
            "A vibrant coastal town with a laid-back surf culture, trendy cafes, and lively beach clubs.",
        image: "https://placehold.co/600x400.png",
        aiHint: "bali canggu",
        link: "#",
    },
    {
        name: "Seminyak",
        description:
            "Bali's hub for luxury resorts, high-end shopping, and world-class dining experiences.",
        image: "https://placehold.co/600x400.png",
        aiHint: "bali seminyak",
        link: "#",
    },
    {
        name: "Nusa Penida",
        description:
            "A rugged island paradise offering dramatic cliffs, pristine beaches, and incredible diving spots.",
        image: "https://placehold.co/600x400.png",
        aiHint: "nusa penida",
        link: "#",
    },
] as CardData[];

const SectionTitle = ({ divClass }: { divClass: string }) => {
    return (
        <div className={cn(divClass)}>
            <h2
                className={cn(
                    "font-bold tracking-normal font-headline text-special-card-fg",
                    "text-3xl md:text-5xl",
                )}
            >
                Featured Destinations
            </h2>
            <p className={cn("text-lg text-muted-foreground mt-2")}>
                Explore the diverse landscapes and vibrant culture that make
                Bali a world-renowned destination.
            </p>
        </div>
    );
};
SectionTitle.displayName = "DestinationsTitle";

const DestinationCard = memo(
    ({
        cardRef,
        destination,
    }: {
        cardRef: React.RefObject<HTMLDivElement>;
        destination: CardData;
    }) => {
        return (
            <>
                <SectionCard
                    ref={cardRef}
                    data={destination}
                    buttonText="View Details"
                    buttonLink={destination.link}
                />
            </>
        );
    },
);
DestinationCard.displayName = "DestinationCard";

const SectionButton = () => {
    return (
        <ButtonFunc
            className="mt-8 md:mt-0"
            text="View All Destinations"
            ariaLabel="View all destinations"
        />
    );
};
SectionButton.displayName = "DestinationsButton";

export default function DestinationsSection(): JSX.Element {
    const cardRef = useRef<HTMLDivElement>(null);
    return (
        <section id="destinations" className="relative w-full">
            {/* Desktop view */}
            <div className="hidden md:block container px-6 z-10">
                <SectionTitle divClass="mb-12 text-left" />
                <div className="grid grid-cols-4 gap-3 mb-12">
                    {destinations.map((destination) => (
                        <DestinationCard
                            key={destination.name}
                            cardRef={cardRef}
                            destination={destination}
                        />
                    ))}
                </div>
                <SectionButton />
            </div>

            {/* Mobile view */}
            <Carousel className="md:hidden mx-auto max-w-xs sm:max-w-sm z-10">
                <SectionTitle divClass="text-center mb-8" />
                <CarouselContent paginationMt="mt-32">
                    {destinations.map((destination) => (
                        <CarouselItem key={destination.name}>
                            <DestinationCard
                                cardRef={cardRef}
                                destination={destination}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <SectionButton />
            </Carousel>
        </section>
    );
}
