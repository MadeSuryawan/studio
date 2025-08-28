"use client";

import * as React from "react";
import SectionCard, { SectionCardData, ButtonFunc } from "./SectionCard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import BaliMapDark from "@/components/icons/BaliMapDark";
import BaliMapLight from "@/components/icons/BaliMapLight";
import { useTheme } from "next-themes";
import Gradient from "./Gradient";

// The Location type is compatible with GenericCardData
type Location = SectionCardData & {
    x: string;
    y: string;
    link: string;
};

const mapPins: Location[] = [
    {
        title: "Ubud",
        description:
            "The cultural heart of Bali, known for its lush rice paddies, art galleries, and spiritual retreats.",
        image: "https://placehold.co/600x400.png",
        hint: "bali ubud",
        x: "66%",
        y: "55%",
        link: "/#",
    },
    {
        title: "Canggu",
        description:
            "A vibrant coastal town with a laid-back surf culture, trendy cafes, and lively beach clubs.",
        image: "https://placehold.co/600x400.png",
        hint: "bali canggu",
        x: "56%",
        y: "66%",
        link: "/#",
    },
    {
        title: "Kintamani",
        description:
            "Home to the majestic Mount Batur volcano and a stunning caldera lake, offering breathtaking views.",
        image: "https://placehold.co/600x400.png",
        hint: "mount batur",
        x: "70%",
        y: "33%",
        link: "/#",
    },
    {
        title: "Nusa Penida",
        description:
            "A rugged island paradise offering dramatic cliffs, pristine beaches, and incredible diving spots.",
        image: "https://placehold.co/600x400.png",
        hint: "nusa penida",
        x: "85%",
        y: "71%",
        link: "/#",
    },
    {
        title: "Uluwatu",
        description:
            "Famous for its cliff-top temple, stunning sunsets, and world-class surf breaks.",
        image: "https://placehold.co/600x400.png",
        hint: "uluwatu temple",
        x: "52%",
        y: "78%",
        link: "/#",
    },
    {
        title: "Seminyak",
        description:
            "Bali's hub for luxury resorts, high-end shopping, and world-class dining experiences.",
        image: "https://placehold.co/600x400.png",
        hint: "bali seminyak",
        x: "57%",
        y: "69%",
        link: "/#",
    },
    {
        title: "Amed",
        description:
            "A string of quiet fishing villages in East Bali, known for black sand beaches and spectacular diving.",
        image: "https://placehold.co/600x400.png",
        hint: "amed beach",
        x: "93%",
        y: "40%",
        link: "/#",
    },
    {
        title: "Lovina",
        description:
            "Located on the North coast, Lovina is famous for its black sand beaches and early morning dolphin tours.",
        image: "https://placehold.co/600x400.png",
        hint: "bali dolphins",
        x: "50%",
        y: "25%",
        link: "/#",
    },
    {
        title: "Pemuteran",
        description:
            "A small, laid-back village in Northwest Bali, perfect for diving, snorkeling, and relaxation away from the crowds.",
        image: "https://placehold.co/600x400.png",
        hint: "bali snorkeling",
        x: "20%",
        y: "27%",
        link: "/#",
    },
    {
        title: "Jatiluwih",
        description:
            "Famous for its dramatic and exotic landscapes. The Jatiluwih rice terraces are a UNESCO Cultural Heritage Site.",
        image: "https://placehold.co/600x400.png",
        hint: "jatiluwih rice terraces",
        x: "53%",
        y: "45%",
        link: "/#",
    },
    {
        title: "Bedugul (Lake Beratan)",
        description:
            "Home to the iconic Ulun Danu Beratan Temple, this highland area offers cool weather and stunning lake views.",
        image: "https://placehold.co/600x400.png",
        hint: "beratan temple bali",
        x: "58%",
        y: "39%",
        link: "/#",
    },
    {
        title: "Munduk",
        description:
            "A charming mountain village known for its scenic treks, stunning waterfalls, and coffee plantations.",
        image: "https://placehold.co/600x400.png",
        hint: "munduk bali",
        x: "49%",
        y: "37%",
        link: "/#",
    },
    {
        title: "West Bali National Park",
        description:
            "A conservation area featuring diverse ecosystems, from rainforests to coral reefs, home to the rare Bali Starling.",
        image: "https://placehold.co/600x400.png",
        hint: "west bali park",
        x: "5%",
        y: "25%",
        link: "/#",
    },
    {
        title: "Medewi Beach",
        description:
            "A quiet, black-sand beach on the west coast, famous for its long, gentle left-hand wave, perfect for longboarding.",
        image: "https://placehold.co/600x400.png",
        hint: "medewi beach surf",
        x: "35%",
        y: "48%",
        link: "/#",
    },
    {
        title: "Sekumpul Waterfall",
        description:
            "Often called the most beautiful waterfall in Bali, Sekumpul is a collection of seven stunning cascades in a lush jungle valley.",
        image: "https://placehold.co/600x400.png",
        hint: "sekumpul waterfall",
        x: "59%",
        y: "26%",
        link: "/#",
    },
    {
        title: "Denpasar",
        description:
            "Bali's bustling capital city, a center of commerce and home to historical sites and vibrant local markets.",
        image: "https://placehold.co/600x400.png",
        hint: "denpasar bali",
        x: "62%",
        y: "66%",
        link: "/#",
    },
    {
        title: "Candidasa",
        description:
            "A quiet coastal town in East Bali, offering a tranquil escape with beautiful beaches and a laid-back atmosphere.",
        image: "https://placehold.co/600x400.png",
        hint: "candidasa beach",
        x: "86%",
        y: "53%",
        link: "/#",
    },
];

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
        onClick={() => onClick(location)}
        aria-label={`Show details for ${location.title}`}
    >
        <span
            className={cn(
                "block h-3 w-3 rounded-full bg-accent ring-accent/50 transition-transform duration-300",
                isActive
                    ? "scale-150 ring-2"
                    : "scale-100 group-hover:scale-125",
            )}
        ></span>
        <span
            className={cn(
                "absolute left-1/2 -translate-x-1/2 -bottom-6 whitespace-nowrap rounded bg-primary px-2 py-1 text-xs text-primary-foreground opacity-0 shadow-lg transition-opacity duration-300 pointer-events-none",
                isActive ? "opacity-100" : "",
            )}
        >
            {location.title}
        </span>
    </button>
);

export default function InteractiveMapSection(): React.JSX.Element {
    const [activeLocation, setActiveLocation] = React.useState<Location>(
        mapPins[0],
    );
    const { resolvedTheme } = useTheme();

    const BaliMap = resolvedTheme === "light" ? BaliMapLight : BaliMapDark;

    // Refs for height management
    const cardRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = React.useState<number>(0);

    // Apply custom classes to the card example
    React.useEffect(() => {
        if (cardRef.current) {
            // // Apply custom classes to the card's root element
            // cardRef.current.classList.add("w-full", "max-w-sm");
            // // Find the button wrapper and apply custom classes
            // const buttonWrapper = cardRef.current.querySelector(
            //     ".generic-card-button-wrapper",
            // );
            // if (buttonWrapper) {
            //     buttonWrapper.classList.remove("justify-end");
            //     buttonWrapper.classList.add("justify-center", "pt-2");
            // }
        }
    }, [activeLocation]);

    // Update container height when card changes
    React.useEffect(() => {
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
    React.useEffect(() => {
        if (cardRef.current && containerHeight === 0) {
            const cardHeight = cardRef.current.offsetHeight;
            if (cardHeight > 0) {
                setContainerHeight(cardHeight);
            }
        }
    }, [containerHeight]);

    return (
        <section id="map" className="relative w-full py-4 md:py-8">
            <Gradient />
            <div className="z-10 grid grid-col">
                {/* Title */}
                <div className="text-center mb-1 md:mb-3">
                    <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline">
                        Explore the Island
                    </h2>
                    <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed mt-4">
                        Click on the pins to discover more about Bali&#39;s most
                        popular destinations.
                    </p>
                </div>

                {/* Map */}
                <div className="flex flex-col items-center -my-16 md:-my-8 max-w-md mx-auto">
                    <div className="relative max-h-[500px] aspect-square mx-auto group scale-[0.9] md:scale-[1.2]">
                        <BaliMap className={cn("w-full h-full ")} />
                        {mapPins.map((loc, index) => (
                            <LocationPin
                                key={index}
                                location={loc}
                                isActive={activeLocation.title === loc.title}
                                onClick={setActiveLocation}
                            />
                        ))}
                    </div>
                </div>

                {/* Card */}
                <div
                    ref={containerRef}
                    className="flex flex-col items-center justify-center transition-all duration-300 ease-out overflow-hidden"
                    style={{
                        height:
                            containerHeight > 0
                                ? `${containerHeight}px`
                                : "auto",
                        minHeight:
                            containerHeight > 0
                                ? `${containerHeight}px`
                                : "auto",
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLocation.title}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                            }}
                            className="w-full flex justify-center"
                        >
                            <SectionCard
                                ref={cardRef}
                                data={activeLocation}
                                buttonText="Plan a Trip Here"
                                buttonLink={`/#contact?message=I'm interested in visiting ${activeLocation.title}.`}
                                spotlight={true}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Button */}
                <ButtonFunc
                    bottonClass="mt-6 relative mx-auto"
                    text="Explore All Destinations"
                    link="#destinations"
                    ariaLabel="Explore all destinations"
                />
            </div>
        </section>
    );
}
