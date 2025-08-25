"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Gradient from "./Gradient";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

const destinations = [
    {
        name: "Ubud",
        description:
            "The cultural heart of Bali, known for its lush rice paddies, art galleries, and spiritual retreats.",
        image: "https://placehold.co/600x400.png",
        hint: "bali ubud",
        link: "#",
    },
    {
        name: "Canggu",
        description:
            "A vibrant coastal town with a laid-back surf culture, trendy cafes, and lively beach clubs.",
        image: "https://placehold.co/600x400.png",
        hint: "bali canggu",
        link: "#",
    },
    {
        name: "Seminyak",
        description:
            "Bali's hub for luxury resorts, high-end shopping, and world-class dining experiences.",
        image: "https://placehold.co/600x400.png",
        hint: "bali seminyak",
        link: "#",
    },
    {
        name: "Nusa Penida",
        description:
            "A rugged island paradise offering dramatic cliffs, pristine beaches, and incredible diving spots.",
        image: "https://placehold.co/600x400.png",
        hint: "nusa penida",
        link: "#",
    },
];

export default function DestinationsSection(): React.JSX.Element {
    return (
        <section id="destinations" className="w-full my-8">
            <Gradient />

            {/* Mobile view */}
            <Carousel className="mx-auto w-full max-w-xs md:hidden z-10">
                <div className="text-center py-4">
                    <h2 className="text-3xl font-bold tracking-normal font-headline">
                        Featured Destinations
                    </h2>
                    <p className="text-lg text-muted-foreground my-2">
                        Explore the diverse landscapes and vibrant culture that
                        make Bali a world-renowned destination.
                    </p>
                </div>
                <CarouselContent paginationMt="mt-16">
                    {destinations.map((dest, index) => (
                        <CarouselItem key={index}>
                            <Link href={dest.link}>
                                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col bg-card -space-y-2">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        width={600}
                                        height={400}
                                        className="w-full h-48 object-cover rounded-t-md"
                                        sizes="320px"
                                        data-ai-hint={dest.hint}
                                    />
                                    <CardContent className="p-6 flex flex-col flex-grow">
                                        <CardTitle className="text-xl font-bold leading-tight">
                                            {dest.name}
                                        </CardTitle>
                                        <p className="mt-2 text-muted-foreground text-sm flex-grow">
                                            {dest.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className=" text-center md:hidden mt-6 pb-8">
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
            </Carousel>

            {/* Desktop view */}
            <div>
                <div className="container px-4 md:px-6 z-10 hidden md:block">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline">
                                Featured Destinations
                            </h2>
                            <p className="text-lg text-muted-foreground mt-2">
                                Explore the diverse landscapes and vibrant
                                culture that make Bali a world-renowned
                                destination.
                            </p>
                        </div>
                        <Button
                            asChild
                            variant="outline"
                            className="hidden bg-bg-alternate md:flex text-special-card-fg border-accent"
                        >
                            <Link href="#">
                                View All Destinations{" "}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {destinations.map((dest, index) => (
                            <Link key={index} href={dest.link}>
                                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col bg-card">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        width={600}
                                        height={400}
                                        className="w-full h-48 object-cover rounded-t-md"
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        data-ai-hint={dest.hint}
                                    />
                                    <CardContent className="p-6 flex flex-col flex-grow">
                                        <CardTitle className="text-xl font-bold leading-tight">
                                            {dest.name}
                                        </CardTitle>
                                        <p className="mt-2 text-muted-foreground text-sm flex-grow">
                                            {dest.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
