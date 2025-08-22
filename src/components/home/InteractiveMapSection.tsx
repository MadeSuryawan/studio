"use client";

import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import BaliMapDark from "@/components/icons/BaliMapDark";
import BaliMapLight from "@/components/icons/BaliMapLight";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Gradient from "./Gradient";
import { SpotlightCard } from "@/components/ui/spotlightcard";

const locations = [
    {
        name: "Ubud",
        description:
            "The cultural heart of Bali, known for its lush rice paddies, art galleries, and spiritual retreats.",
        image: "https://placehold.co/600x400.png",
        hint: "bali ubud",
        x: "66%",
        y: "55%",
    },
    {
        name: "Canggu",
        description:
            "A vibrant coastal town with a laid-back surf culture, trendy cafes, and lively beach clubs.",
        image: "https://placehold.co/600x400.png",
        hint: "bali canggu",
        x: "56%",
        y: "66%",
    },
    {
        name: "Kintamani",
        description:
            "Home to the majestic Mount Batur volcano and a stunning caldera lake, offering breathtaking views.",
        image: "https://placehold.co/600x400.png",
        hint: "mount batur",
        x: "70%",
        y: "33%",
    },
    {
        name: "Nusa Penida",
        description:
            "A rugged island paradise offering dramatic cliffs, pristine beaches, and incredible diving spots.",
        image: "https://placehold.co/600x400.png",
        hint: "nusa penida",
        x: "85%",
        y: "71%",
    },
    {
        name: "Uluwatu",
        description:
            "Famous for its cliff-top temple, stunning sunsets, and world-class surf breaks.",
        image: "https://placehold.co/600x400.png",
        hint: "uluwatu temple",
        x: "52%",
        y: "78%",
    },
    {
        name: "Seminyak",
        description:
            "Bali's hub for luxury resorts, high-end shopping, and world-class dining experiences.",
        image: "https://placehold.co/600x400.png",
        hint: "bali seminyak",
        x: "57%",
        y: "69%",
    },
    {
        name: "Amed",
        description:
            "A string of quiet fishing villages in East Bali, known for black sand beaches and spectacular diving.",
        image: "https://placehold.co/600x400.png",
        hint: "amed beach",
        x: "93%",
        y: "40%",
    },
    {
        name: "Lovina",
        description:
            "Located on the North coast, Lovina is famous for its black sand beaches and early morning dolphin tours.",
        image: "https://placehold.co/600x400.png",
        hint: "bali dolphins",
        x: "50%",
        y: "25%",
    },
    {
        name: "Pemuteran",
        description:
            "A small, laid-back village in Northwest Bali, perfect for diving, snorkeling, and relaxation away from the crowds.",
        image: "https://placehold.co/600x400.png",
        hint: "bali snorkeling",
        x: "20%",
        y: "27%",
    },
    {
        name: "Jatiluwih",
        description:
            "Famous for its dramatic and exotic landscapes. The Jatiluwih rice terraces are a UNESCO Cultural Heritage Site.",
        image: "https://placehold.co/600x400.png",
        hint: "jatiluwih rice terraces",
        x: "53%",
        y: "45%",
    },
    {
        name: "Bedugul (Lake Beratan)",
        description:
            "Home to the iconic Ulun Danu Beratan Temple, this highland area offers cool weather and stunning lake views.",
        image: "https://placehold.co/600x400.png",
        hint: "beratan temple bali",
        x: "58%",
        y: "39%",
    },
    {
        name: "Munduk",
        description:
            "A charming mountain village known for its scenic treks, stunning waterfalls, and coffee plantations.",
        image: "https://placehold.co/600x400.png",
        hint: "munduk bali",
        x: "49%",
        y: "37%",
    },
    {
        name: "West Bali National Park",
        description:
            "A conservation area featuring diverse ecosystems, from rainforests to coral reefs, home to the rare Bali Starling.",
        image: "https://placehold.co/600x400.png",
        hint: "west bali park",
        x: "5%",
        y: "25%",
    },
    {
        name: "Medewi Beach",
        description:
            "A quiet, black-sand beach on the west coast, famous for its long, gentle left-hand wave, perfect for longboarding.",
        image: "https://placehold.co/600x400.png",
        hint: "medewi beach surf",
        x: "35%",
        y: "48%",
    },
    {
        name: "Sekumpul Waterfall",
        description:
            "Often called the most beautiful waterfall in Bali, Sekumpul is a collection of seven stunning cascades in a lush jungle valley.",
        image: "https://placehold.co/600x400.png",
        hint: "sekumpul waterfall",
        x: "59%",
        y: "26%",
    },
    {
        name: "Denpasar",
        description:
            "Bali's bustling capital city, a center of commerce and home to historical sites and vibrant local markets.",
        image: "https://placehold.co/600x400.png",
        hint: "denpasar bali",
        x: "62%",
        y: "66%",
    },
    {
        name: "Candidasa",
        description:
            "A quiet coastal town in East Bali, offering a tranquil escape with beautiful beaches and a laid-back atmosphere.",
        image: "https://placehold.co/600x400.png",
        hint: "candidasa beach",
        x: "86%",
        y: "53%",
    },
];

type Location = (typeof locations)[0];

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
        aria-label={`Show details for ${location.name}`}
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
                isActive ? "opacity-100" : "group-hover:opacity-100",
            )}
        >
            {location.name}
        </span>
    </button>
);

export default function InteractiveMapSection(): React.JSX.Element {
    const [activeLocation, setActiveLocation] = React.useState<Location>(
        locations[0],
    );
    const { resolvedTheme } = useTheme();

    const BaliMap = resolvedTheme === "light" ? BaliMapLight : BaliMapDark;

    return (
        <section id="map" className="relative w-full py-4 md:py-8">
            <Gradient />
            <div className="container px-4 md:px-6 z-10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline">
                        Explore the Island
                    </h2>
                    <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed mt-4">
                        Click on the pins to discover more about Bali&#39;s most
                        popular destinations.
                    </p>
                </div>

                <div className="flex flex-col items-center mt-[-3rem]">
                    <div className="relative aspect-square max-h-[500px] mx-auto group">
                        <BaliMap
                            className={cn(
                                "w-full h-full",
                                resolvedTheme === "light"
                                    ? "text-primary/10"
                                    : "text-primary/30",
                            )}
                        />
                        {locations.map((loc) => (
                            <LocationPin
                                key={loc.name}
                                location={loc}
                                isActive={activeLocation.name === loc.name}
                                onClick={setActiveLocation}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-center mt-[-3rem]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeLocation.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <SpotlightCard className="overflow-hidden shadow-lg w-full max-w-sm bg-bg-alternate">
                                    <Image
                                        src={activeLocation.image}
                                        alt={activeLocation.name}
                                        width={600}
                                        height={400}
                                        className="w-full h-56 object-cover rounded-t-md"
                                        data-ai-hint={activeLocation.hint}
                                    />
                                    <CardHeader>
                                        <CardTitle>
                                            {activeLocation.name}
                                        </CardTitle>
                                        <CardDescription className="pt-2">
                                            {activeLocation.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button asChild>
                                            <Link
                                                href={`/#contact?message=I'm interested in visiting ${activeLocation.name}.`}
                                            >
                                                Plan a Trip Here
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </SpotlightCard>
                            </motion.div>
                        </AnimatePresence>
                        <Button
                            asChild
                            variant="outline"
                            className="bg-bg-alternate mt-6 text-special-card-fg border-accent"
                        >
                            <Link href="#destinations">
                                Explore More Destinations
                                <ArrowRight className=" h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
