"use client";

import { JSX, memo, useRef } from "react";
import { Waves, Utensils, Users, BedDouble, Plane } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import SectionCard, { CardData, ButtonFunc } from "./SectionCard";
import { cn } from "@/lib/utils";

const TempleIcon = memo((props: React.SVGProps<SVGSVGElement>) => (
    <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M11.99 2.25L2.69 9.33l-1.39 1.58v1.8l4.6-1.58v6.75h1.5v-4.5l1.88-.63v5.13h1.5v-4.5l1.88-.63v5.13h1.5v-4.5l1.88-.63v5.13h1.5V11.13l4.6 1.58v-1.8l-1.39-1.58L11.99 2.25zM9.25 11.25H14.75"></path>
    </svg>
));
TempleIcon.displayName = "TempleIcon";

const DanceIcon = memo((props: React.SVGProps<SVGSVGElement>) => (
    <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 4a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 14.5a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0v6a.5.5 0 0 1-.5.5z" />
        <path d="M6.5 11.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5zM17.5 11.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5z" />
        <path d="M12 14.5a6 6 0 0 0-6-6H4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H6" />
        <path d="M12 14.5a6 6 0 0 1 6-6h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H18" />
    </svg>
));
DanceIcon.displayName = "DanceIcon";

const packages: CardData[] = [
    {
        name: "Cultural Heartbeat of Ubud",
        features: [
            {
                icon: <TempleIcon className="w-5 h-5 text-accent" />,
                text: "Temple Tours",
            },
            {
                icon: <DanceIcon className="w-5 h-5 text-accent" />,
                text: "Traditional Dance Show",
            },
            {
                icon: (
                    <Utensils
                        aria-hidden="true"
                        focusable="false"
                        className="w-5 h-5 text-accent"
                    />
                ),
                text: "Cooking Class",
            },
        ],
        image: "https://placehold.co/600x400.png",
        aiHint: "bali temple",
        link: "#",
    },
    {
        name: "Coastal Vibe & Surf",
        features: [
            {
                icon: (
                    <Waves aria-hidden="true" className="w-5 h-5 text-accent" />
                ),
                text: "Surf Lessons",
            },
            {
                icon: (
                    <BedDouble
                        aria-hidden="true"
                        focusable="false"
                        className="w-5 h-5 text-accent"
                    />
                ),
                text: "Beachfront Villa",
            },
            {
                icon: (
                    <Users
                        aria-hidden="true"
                        focusable="false"
                        className="w-5 h-5 text-accent"
                    />
                ),
                text: "Yoga Sessions",
            },
        ],
        image: "https://placehold.co/600x400.png",
        aiHint: "bali beach",
        link: "#",
    },
    {
        name: "Luxury & Relaxation",
        features: [
            {
                icon: <BedDouble className="w-5 h-5 text-accent" />,
                text: "5-Star Resort",
            },
            {
                icon: <Users className="w-5 h-5 text-accent" />,
                text: "Private Spa Treatments",
            },
            {
                icon: <Utensils className="w-5 h-5 text-accent" />,
                text: "Fine Dining",
            },
        ],
        image: "https://placehold.co/600x400.png",
        aiHint: "bali spa",
        link: "#",
    },
    {
        name: "The Ultimate Bali Adventure",
        features: [
            {
                icon: <Plane className="w-5 h-5 text-accent" />,
                text: "All-inclusive",
            },
            {
                icon: <TempleIcon className="w-5 h-5 text-accent" />,
                text: "Volcano Sunrise Trek",
            },
            {
                icon: <Waves className="w-5 h-5 text-accent" />,
                text: "Scuba Diving",
            },
        ],
        image: "https://placehold.co/600x400.png",
        aiHint: "bali volcano",
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
                Curated Travel Packages
            </h2>
            <p className={cn("text-lg text-muted-foreground mt-2")}>
                Hand-picked experiences designed to give you the very best of
                Bali.
            </p>
        </div>
    );
};
SectionTitle.displayName = "PackageTitle";

const PackageCard = memo(
    ({
        cardRef,
        pkg,
        className,
    }: {
        cardRef: React.RefObject<HTMLDivElement>;
        pkg: CardData;
        className?: string;
    }) => {
        return (
            <>
                <SectionCard
                    ref={cardRef}
                    data={pkg}
                    buttonText="View Details"
                    buttonLink={pkg.link}
                    packageCard={true}
                    className={className}
                />
            </>
        );
    },
);
PackageCard.displayName = "PackageCard";

const SectionButton = ({ buttonClass }: { buttonClass?: string }) => {
    return (
        <ButtonFunc
            className={buttonClass}
            text="View All Packages"
            ariaLabel="View all packages"
        />
    );
};
SectionButton.displayName = "PackagesButton";

export default function PackagesSection(): JSX.Element {
    const cardRef = useRef<HTMLDivElement>(null);
    return (
        <section id="packages">
            {/* Desktop view */}
            <div className="hidden md:block container px-6">
                <SectionTitle divClass="items-center mb-12 text-left" />
                <div className="grid grid-cols-2 gap-3 mb-12">
                    {packages.map((pkg) => (
                        <PackageCard
                            key={pkg.name}
                            cardRef={cardRef}
                            pkg={pkg}
                            className="flex-row"
                        />
                    ))}
                </div>
                <SectionButton />
            </div>

            {/* Mobile view */}
            <Carousel className="md:hidden mx-auto max-w-xs">
                <SectionTitle divClass="text-center py-4" />
                <CarouselContent paginationMt="mt-40">
                    {packages.map((pkg) => (
                        <CarouselItem key={pkg.name}>
                            <PackageCard cardRef={cardRef} pkg={pkg} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <SectionButton />
            </Carousel>
        </section>
    );
}
