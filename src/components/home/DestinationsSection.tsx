import { type JSX } from "react";
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
            "A vibrant coastal town with a laid-back surf culture, trendy cafes, and lively beach clubs. Blend in with the locals and soak up the island vibes.",
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

const DestinationCard = ({ destination }: { destination: CardData }) => {
    return (
        <>
            <SectionCard
                data={destination}
                buttonText="View Details"
                buttonLink={destination.link}
            />
        </>
    );
};

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
    return (
        <section id="destinations">
            {/* Desktop view */}
            <div className="hidden md:block container px-6">
                <SectionTitle divClass="mb-12 text-left" />
                <div className="grid grid-cols-4 gap-3 mb-12">
                    {destinations.map((destination) => (
                        <DestinationCard
                            key={destination.name}
                            destination={destination}
                        />
                    ))}
                </div>
                <SectionButton />
            </div>

            {/* Mobile view */}
            <Carousel className="md:hidden mx-auto max-w-xs sm:max-w-sm">
                <SectionTitle divClass="text-center mb-8" />
                <CarouselContent paginationMt="mt-36">
                    {destinations.map((destination) => (
                        <CarouselItem key={destination.name}>
                            <DestinationCard destination={destination} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <SectionButton />
            </Carousel>
        </section>
    );
}
