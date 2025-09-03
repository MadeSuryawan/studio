"use client";

import { useEffect, useState, useRef, JSX, memo } from "react";
import SectionCard, { CardData, ButtonFunc } from "./SectionCard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import BaliMapDark from "@/components/icons/BaliMapDark";
import BaliMapLight from "@/components/icons/BaliMapLight";
import { useTheme } from "next-themes";

// Animation configuration constants
const ANIMATION_CONFIG = {
    cardTransition: {
        duration: 0.4,
        ease: "easeOut" as const,
    },
    cardVariants: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    },
    pinTransition: {
        duration: 300, // in milliseconds for CSS transitions
    },
} as const;

// Styling constants
const STYLING_CONFIG = {
    pin: {
        base: cn(
            "block h-3 w-3 rounded-full bg-accent ring-accent/50",
            "transition-transform duration-300",
        ),
        active: "scale-150 ring-2",
        inactive: "scale-100 group-hover:scale-125",
        tooltip: cn(
            "absolute left-1/2 -translate-x-1/2 -bottom-6",
            "whitespace-nowrap rounded bg-primary px-2 py-1",
            "text-xs text-primary-foreground opacity-0 shadow-lg",
            "transition-opacity duration-300 pointer-events-none",
        ),
        tooltipActive: "opacity-100",
    },
    desktop: {
        mapContainer: "relative aspect-square group scale-[1.3] z-10",
    },
    mobile: {
        mapContainer: "relative aspect-square mx-auto group scale-[0.9] -my-16",
    },
} as const;

// The Location type is compatible with GenericCardData
type Location = CardData & {
    x: string;
    y: string;
};

const mapPins: Location[] = [
    {
        name: "Ubud",
        description:
            "The cultural heart of Bali, known for its lush rice paddies, art galleries, and spiritual retreats.",
        image: "https://placehold.co/600x400.png",
        aiHint: "bali ubud",
        x: "66%",
        y: "55%",
        link: "/#",
    },
    {
        name: "Canggu",
        description:
            "A vibrant coastal town with a laid-back surf culture, trendy cafes, and lively beach clubs.",
        image: "https://placehold.co/600x400.png",
        aiHint: "bali canggu",
        x: "56%",
        y: "66%",
        link: "#",
    },
    {
        name: "Kintamani",
        description:
            "Home to the majestic Mount Batur volcano and a stunning caldera lake, offering breathtaking views.",
        image: "https://placehold.co/600x400.png",
        aiHint: "mount batur",
        x: "70%",
        y: "33%",
        link: "/#",
    },
    {
        name: "Nusa Penida",
        description:
            "A rugged island paradise offering dramatic cliffs, pristine beaches, and incredible diving spots.",
        image: "https://placehold.co/600x400.png",
        aiHint: "nusa penida",
        x: "85%",
        y: "71%",
        link: "/#",
    },
    {
        name: "Uluwatu",
        description:
            "Famous for its cliff-top temple, stunning sunsets, and world-class surf breaks.",
        image: "https://placehold.co/600x400.png",
        aiHint: "uluwatu temple",
        x: "52%",
        y: "78%",
        link: "/#",
    },
    {
        name: "Seminyak",
        description:
            "Bali's hub for luxury resorts, high-end shopping, and world-class dining experiences.",
        image: "https://placehold.co/600x400.png",
        aiHint: "bali seminyak",
        x: "57%",
        y: "69%",
        link: "/#",
    },
    {
        name: "Amed",
        description:
            "A string of quiet fishing villages in East Bali, known for black sand beaches and spectacular diving.",
        image: "https://placehold.co/600x400.png",
        aiHint: "amed beach",
        x: "93%",
        y: "40%",
        link: "/#",
    },
    {
        name: "Lovina",
        description:
            "Located on the North coast, Lovina is famous for its black sand beaches and early morning dolphin tours.",
        image: "https://placehold.co/600x400.png",
        aiHint: "bali dolphins",
        x: "50%",
        y: "25%",
        link: "/#",
    },
    {
        name: "Pemuteran",
        description:
            "A small, laid-back village in Northwest Bali, perfect for diving, snorkeling, and relaxation away from the crowds.",
        image: "https://placehold.co/600x400.png",
        aiHint: "bali snorkeling",
        x: "20%",
        y: "27%",
        link: "/#",
    },
    {
        name: "Jatiluwih",
        description:
            "Famous for its dramatic and exotic landscapes. The Jatiluwih rice terraces are a UNESCO Cultural Heritage Site.",
        image: "https://placehold.co/600x400.png",
        aiHint: "jatiluwih rice terraces",
        x: "53%",
        y: "45%",
        link: "/#",
    },
    {
        name: "Bedugul (Lake Beratan)",
        description:
            "Home to the iconic Ulun Danu Beratan Temple, this highland area offers cool weather and stunning lake views.",
        image: "https://placehold.co/600x400.png",
        aiHint: "beratan temple bali",
        x: "58%",
        y: "39%",
        link: "/#",
    },
    {
        name: "Munduk",
        description:
            "A charming mountain village known for its scenic treks, stunning waterfalls, and coffee plantations.",
        image: "https://placehold.co/600x400.png",
        aiHint: "munduk bali",
        x: "49%",
        y: "37%",
        link: "/#",
    },
    {
        name: "West Bali National Park",
        description:
            "A conservation area featuring diverse ecosystems, from rainforests to coral reefs, home to the rare Bali Starling.",
        image: "https://placehold.co/600x400.png",
        aiHint: "west bali park",
        x: "5%",
        y: "25%",
        link: "/#",
    },
    {
        name: "Medewi Beach",
        description:
            "A quiet, black-sand beach on the west coast, famous for its long, gentle left-hand wave, perfect for longboarding.",
        image: "https://placehold.co/600x400.png",
        aiHint: "medewi beach surf",
        x: "35%",
        y: "48%",
        link: "/#",
    },
    {
        name: "Sekumpul Waterfall",
        description:
            "Often called the most beautiful waterfall in Bali, Sekumpul is a collection of seven stunning cascades in a lush jungle valley.",
        image: "https://placehold.co/600x400.png",
        aiHint: "sekumpul waterfall",
        x: "59%",
        y: "26%",
        link: "/#",
    },
    {
        name: "Denpasar",
        description:
            "Bali's bustling capital city, a center of commerce and home to historical sites and vibrant local markets.",
        image: "https://placehold.co/600x400.png",
        aiHint: "denpasar bali",
        x: "62%",
        y: "66%",
        link: "/#",
    },
    {
        name: "Candidasa",
        description:
            "A quiet coastal town in East Bali, offering a tranquil escape with beautiful beaches and a laid-back atmosphere.",
        image: "https://placehold.co/600x400.png",
        aiHint: "candidasa beach",
        x: "86%",
        y: "53%",
        link: "/#",
    },
] as Location[];

// ===== HELPER FUNCTIONS =====

/**
 * Generates a contact message URL for a specific location
 */
const generateContactMessage = (locationName: string): string => {
    return `/#contact?message=I'm interested in visiting ${locationName}.`;
};

/**
 * Handles location pin click events
 */
const handleLocationClick = (
    location: Location,
    setActiveLocation: (location: Location) => void,
) => {
    setActiveLocation(location);
};

// ===== COMPONENTS =====

/**
 * Interactive pin component for map locations
 * Displays a clickable pin with hover effects and tooltip
 */
const LocationPin = ({
    location,
    isActive,
    onClick,
}: {
    location: Location;
    isActive: boolean;
    onClick: (location: Location) => void;
}) => (
    <button
        type="button"
        className="absolute -translate-x-1/2 -translate-y-1/2 group"
        style={{ left: location.x, top: location.y }}
        onClick={() => handleLocationClick(location, onClick)}
        aria-label={`Show details for ${location.name}`}
    >
        <span
            className={cn(
                STYLING_CONFIG.pin.base,
                isActive
                    ? STYLING_CONFIG.pin.active
                    : STYLING_CONFIG.pin.inactive,
            )}
        ></span>
        <span
            className={cn(
                STYLING_CONFIG.pin.tooltip,
                isActive ? STYLING_CONFIG.pin.tooltipActive : "",
            )}
        >
            {location.name}
        </span>
    </button>
);

/**
 * Bali map component that switches between light and dark themes
 */
const BaliMap = memo(({ className }: { className?: string }) => {
    const { resolvedTheme } = useTheme();
    const MapComponent = resolvedTheme === "light" ? BaliMapLight : BaliMapDark;

    return <MapComponent className={className} />;
});
// Set the display name for better debugging and to satisfy ESLint
BaliMap.displayName = "BaliMap";

const SectionTitle = ({ isMobile = false }: { isMobile?: boolean }) => {
    return (
        <div className={cn("text-center")}>
            <h2
                className={cn(
                    "font-bold tracking-normal font-headline",
                    isMobile ? "text-3xl" : "text-5xl",
                )}
            >
                Explore the Island
            </h2>
            <p
                className={cn(
                    "mx-auto max-w-3xl text-muted-foreground",
                    "md:text-xl/relaxed",
                    "mt-2 md:mt-4",
                )}
            >
                Click on the pins to discover more about Bali&#39;s most popular
                destinations.
            </p>
        </div>
    );
};
SectionTitle.displayName = "MapSectionTitle";

const MapSectionCard = memo(
    ({
        activeLocation,
        cardRef,
        containerHeight,
        isMobile,
    }: {
        activeLocation: Location;
        cardRef: React.RefObject<HTMLDivElement>;
        containerHeight: number;
        isMobile: boolean;
    }) => {
        return (
            <div
                className={cn("shadow-xl")}
                style={{
                    height:
                        containerHeight > 0 ? `${containerHeight}px` : "auto",
                    minHeight:
                        containerHeight > 0 ? `${containerHeight}px` : "auto",
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeLocation.name}
                        initial={ANIMATION_CONFIG.cardVariants.initial}
                        animate={ANIMATION_CONFIG.cardVariants.animate}
                        exit={ANIMATION_CONFIG.cardVariants.exit}
                        transition={ANIMATION_CONFIG.cardTransition}
                        className="w-full flex justify-center"
                    >
                        <SectionCard
                            ref={cardRef}
                            data={activeLocation}
                            buttonText="Plan a Trip Here"
                            buttonLink={generateContactMessage(
                                activeLocation.name,
                            )}
                            className={
                                isMobile
                                    ? "max-w-xs sm:max-w-sm"
                                    : "md:max-w-sm"
                            }
                            spotlight={true}
                            baliMap={true}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    },
);
MapSectionCard.displayName = "MapSectionCard";

const SectionButton = ({ isMobile = false }: { isMobile?: boolean }) => {
    return (
        <ButtonFunc
            className={isMobile ? "mt-9" : "mt-0 left-0 translate-x-0"}
            text="Explore All Destinations"
            link="#destinations"
            ariaLabel="Explore all destinations"
        />
    );
};
SectionButton.displayName = "MapSectionButton";

export default function InteractiveMapSection(): JSX.Element {
    const [activeLocation, setActiveLocation] = useState<Location>(mapPins[0]);

    // Refs for height management
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    // Update container height when card changes
    useEffect(() => {
        const updateHeight = () => {
            if (cardRef.current) {
                // Use requestAnimationFrame to ensure DOM has updated
                requestAnimationFrame(() => {
                    if (cardRef.current) {
                        const cardHeight = cardRef.current.offsetHeight;
                        if (cardHeight > 0) {
                            setContainerHeight(cardHeight);
                        }
                    }
                });
            }
        };

        // Use requestAnimationFrame for better performance
        const frameId = requestAnimationFrame(updateHeight);
        return () => cancelAnimationFrame(frameId);
    }, [activeLocation]);

    // Set initial height after first render
    useEffect(() => {
        if (cardRef.current && containerHeight === 0) {
            const cardHeight = cardRef.current.offsetHeight;
            if (cardHeight > 0) {
                setContainerHeight(cardHeight);
            }
        }
    }, [containerHeight]);

    const MapAndCard = ({
        divClass,
        mapConfig,
        cardConfig,
        isMobile = false,
    }: {
        divClass: string;
        mapConfig: {
            divClass: string;
            mapClass?: string;
        };
        cardConfig?: {
            divClass: string;
        };
        isMobile?: boolean;
    }) => {
        return (
            <div className={cn("flex items-center", divClass)}>
                <div className={cn(mapConfig.divClass)}>
                    <BaliMap
                        className={cn("w-full h-full", mapConfig.mapClass)}
                    />
                    {mapPins.map((loc, index) => (
                        <LocationPin
                            key={index}
                            location={loc}
                            isActive={activeLocation.name === loc.name}
                            onClick={setActiveLocation}
                        />
                    ))}
                </div>
                <div ref={containerRef} className={cn(cardConfig?.divClass)}>
                    <MapSectionCard
                        activeLocation={activeLocation}
                        cardRef={cardRef}
                        containerHeight={containerHeight}
                        isMobile={isMobile}
                    />
                </div>
            </div>
        );
    };

    return (
        <section id="map" className={cn("relative")}>
            {/* Desktop view */}
            <div className={cn("hidden md:block py-10")}>
                <SectionTitle />
                <MapAndCard
                    divClass={cn("flex-row-reverse justify-evenly")}
                    mapConfig={{
                        divClass: STYLING_CONFIG.desktop.mapContainer,
                    }}
                />
                <SectionButton />
            </div>

            {/* Mobile view */}
            <div className={cn("block md:hidden pt-12")}>
                <SectionTitle />

                <MapAndCard
                    divClass={cn("flex-col")}
                    mapConfig={{
                        divClass: cn(STYLING_CONFIG.mobile.mapContainer),
                    }}
                    isMobile={true}
                />

                <SectionButton isMobile={true} />
            </div>
        </section>
    );
}
