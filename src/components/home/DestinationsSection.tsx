"use client";

import * as React from "react";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";

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
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        Featured Destinations
                    </h2>
                    <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                        Explore the diverse landscapes and vibrant culture that make
                        Bali a world-renowned destination.
                    </p>
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
                                    className="w-full h-48 object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    data-ai-hint={dest.hint}
                                />
                            </CardHeader>
                            <CardContent className="p-6">
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="text-primary h-5 w-5" />
                                    {dest.name}
                                </CardTitle>
                                <CardDescription className="mt-2">
                                    {dest.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}