"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlightcard";

const destinations = [
    {
        name: "Ubud",
        description:
            "The cultural heart of Bali, known for its lush rice paddies, art galleries, and spiritual retreats.",
        image: "https://placehold.co/600x400.png",
        hint: "bali ubud",
    },
    {
        name: "Canggu",
        description:
            "A vibrant coastal town with a laid-back surf culture, trendy cafes, and lively beach clubs.",
        image: "https://placehold.co/600x400.png",
        hint: "bali canggu",
    },
    {
        name: "Seminyak",
        description:
            "Bali's hub for luxury resorts, high-end shopping, and world-class dining experiences.",
        image: "https://placehold.co/600x400.png",
        hint: "bali seminyak",
    },
    {
        name: "Nusa Penida",
        description:
            "A rugged island paradise offering dramatic cliffs, pristine beaches, and incredible diving spots.",
        image: "https://placehold.co/600x400.png",
        hint: "nusa penida",
    },
];

export default function DestinationsSection(): React.JSX.Element {
    return (
        <section id="destinations" className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 text-center md:text-left">
                    <div>
                        <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline">
                            Featured Destinations
                        </h2>
                        <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                            Explore the diverse landscapes and vibrant culture
                            that make Bali a world-renowned destination.
                        </p>
                    </div>
                    <Button
                        asChild
                        variant="outline"
                        className="hidden md:flex mt-4 md:mt-0 bg-bg-alternate text-special-card-fg border-accent"
                    >
                        <Link href="#">
                            View All Destinations
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest) => (
                        <Card
                            key={dest.name}
                            className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <CardHeader className="p-0">
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover rounded-t-md"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    data-ai-hint={dest.hint}
                                />
                            </CardHeader>
                            <CardContent className="p-6">
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="text-accent h-5 w-5" />
                                    {dest.name}
                                </CardTitle>
                                <CardDescription className="mt-2">
                                    {dest.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Button
                        asChild
                        variant="outline"
                        className="bg-bg-alternate text-special-card-fg border-accent"
                    >
                        <Link href="#">
                            View All Destinations
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
