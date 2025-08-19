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
import BaliMap from "@/components/icons/BaliMap";

const locations = [
    {
        name: "Ubud",
        description:
            "The cultural heart of Bali, known for its lush rice paddies, art galleries, and spiritual retreats.",
        image: "https://placehold.co/600x400.png",
        hint: "bali ubud",
        x: "53%",
        y: "62%",
    },
    {
        name: "Canggu",
        description:
            "A vibrant coastal town with a laid-back surf culture, trendy cafes, and lively beach clubs.",
        image: "https://placehold.co/600x400.png",
        hint: "bali canggu",
        x: "51%",
        y: "80%",
    },
    {
        name: "Kintamani",
        description:
            "Home to the majestic Mount Batur volcano and a stunning caldera lake, offering breathtaking views.",
        image: "https://placehold.co/600x400.png",
        hint: "mount batur",
        x: "65%",
        y: "35%",
    },
    {
        name: "Nusa Penida",
        description:
            "A rugged island paradise offering dramatic cliffs, pristine beaches, and incredible diving spots.",
        image: "https://placehold.co/600x400.png",
        hint: "nusa penida",
        x: "82%",
        y: "75%",
    },
    {
        name: "Uluwatu",
        description:
            "Famous for its cliff-top temple, stunning sunsets, and world-class surf breaks.",
        image: "https://placehold.co/600x400.png",
        hint: "uluwatu temple",
        x: "51%",
        y: "94%",
    },
    {
        name: "Seminyak",
        description:
            "Bali's hub for luxury resorts, high-end shopping, and world-class dining experiences.",
        image: "https://placehold.co/600x400.png",
        hint: "bali seminyak",
        x: "50%",
        y: "85%",
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

    return (
        <section id="map" className="w-full py-8 md:py-16">
            <div className="container px-4 md:px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-lighter sm:text-4xl md:text-5xl font-headline">
                        Explore the Island
                    </h2>
                    <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed mt-4">
                        Click on the pins to discover more about Bali's most
                        popular destinations.
                    </p>
                </div>

                <div className="flex flex-col items-center mt-[-3rem]">
                    <div className="relative aspect-square max-h-[500px] mx-auto group">
                        <BaliMap className="w-full h-full text-primary/10" />
                        {locations.map((loc) => (
                            <LocationPin
                                key={loc.name}
                                location={loc}
                                isActive={activeLocation.name === loc.name}
                                onClick={setActiveLocation}
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-center mt-[-3rem]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeLocation.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <Card className="overflow-hidden shadow-lg w-full max-w-md bg-card-alternate">
                                    <Image
                                        src={activeLocation.image}
                                        alt={activeLocation.name}
                                        width={600}
                                        height={400}
                                        className="w-full h-56 object-cover"
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
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
