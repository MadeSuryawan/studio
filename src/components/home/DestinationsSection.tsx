"use client";

import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { SectionCard, CardData, ButtonFunc } from "./SectionCard";

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
];

const Titles = () => (
    <div>
        <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline">
            Featured Destinations
        </h2>
        <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
            Explore the diverse landscapes and vibrant culture that make Bali a
            world-renowned destination.
        </p>
    </div>
);

export default function DestinationsSection(): React.JSX.Element {
    const cardRef = React.useRef<HTMLDivElement>(null);
    return (
        <section id="destinations" className=" w-full py-12 md:py-24">
            {/* Desktop view */}
            <div className="container px-6 z-10 hidden md:block">
                <div className="flex justify-between items-center mb-12">
                    <Titles />
                </div>
                <div className="grid grid-cols-4 gap-3 mb-12">
                    {destinations.map((dest) => (
                        // <DestinationCard key={dest.name} dest={dest} />
                        <SectionCard
                            ref={cardRef}
                            key={dest.name}
                            data={dest}
                            buttonText="View Details"
                            buttonLink={dest.link}
                            // spotlight={true}
                        />
                    ))}
                </div>
                <div className="flex justify-end mt-auto">
                    <ButtonFunc
                        text="View All Destinations"
                        ariaLabel="View all destinations"
                    />
                </div>
            </div>
            {/* Mobile view */}
            <Carousel className="mx-auto max-w-xs sm:max-w-sm md:hidden z-10">
                <div className="text-center py-4">
                    <Titles />
                </div>
                <CarouselContent paginationMt="mt-24">
                    {destinations.map((dest) => (
                        <CarouselItem key={dest.name}>
                            {/* <DestinationCard dest={dest} /> */}
                            <SectionCard
                                ref={cardRef}
                                key={dest.name}
                                data={dest}
                                buttonText="View Details"
                                buttonLink={dest.link}
                                // spotlight={true}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <ButtonFunc
                    text="View All Destinations"
                    className="relative left-1/2 -translate-x-1/2 mt-8"
                    ariaLabel="View all destinations"
                />
            </Carousel>
        </section>
    );
}
