"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { ArrowRight, MapPin } from "lucide-react";
import Gradient from "./Gradient";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

type Destination = {
    name: string;
    description: string;
    image: string;
    hint: string;
    link: string;
};

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

const Texts = () => (
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

const ButtonFunc = ({
    className,
    buttonText,
    link,
    arrow = true,
}: {
    className?: string;
    buttonText?: string;
    link?: string;
    arrow?: boolean;
}) => (
    <Button
        asChild
        variant="outline"
        className={`bg-bg-alternate text-special-card-fg border-accent text-center ${className}`}
    >
        <Link href={link || "#"}>
            {buttonText || "View All Destinations"}
            {arrow && <ArrowRight className="h-4 w-4" />}
        </Link>
    </Button>
);

const DestinationCard = ({ dest }: { dest: Destination }) => (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl  hover:scale-[1.02] transition-all duration-500 ease-in-out bg-card text-special-card-fg">
        <div className="p-1">
            <Image
                src={dest.image}
                alt={dest.name}
                width={600}
                height={400}
                className="w-full h-48 object-cover rounded-t-md"
                sizes="(max-width: 768px) 100vw, 33vw"
                data-ai-hint={dest.hint}
            />
        </div>
        <CardContent className="lex flex-col p-3 justify-between flex-grow">
            <CardTitle className="text-xl leading-relaxed font-bold overflow-hidden text-ellipsis text-nowrap">
                {dest.name}
            </CardTitle>
            <p className="my-3 text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {dest.description}
            </p>
            <div className="flex justify-end mt-auto">
                <ButtonFunc
                    className="bg-background border-none"
                    buttonText="View Details"
                    arrow={false}
                    link={dest.link}
                ></ButtonFunc>
            </div>
        </CardContent>
    </Card>
);

export default function DestinationsSection(): React.JSX.Element {
    return (
        <section id="destinations" className=" w-full py-12 md:py-24">
            {/* Desktop view */}
            <div className="container px-6 z-10 hidden md:block">
                <div className="flex justify-between items-center mb-12">
                    <Texts />
                </div>
                <div className="grid grid-cols-4 gap-3 mb-12">
                    {destinations.map((dest, index) => (
                        <DestinationCard key={index} dest={dest} />
                    ))}
                </div>
                <div className="flex justify-end mt-auto">
                    <ButtonFunc />
                </div>
            </div>
            {/* Mobile view */}
            <Carousel className="mx-auto max-w-xs sm:max-w-sm md:hidden z-10">
                <div className="text-center py-4">
                    <Texts />
                </div>
                <CarouselContent paginationMt="mt-24">
                    {destinations.map((dest, index) => (
                        <CarouselItem key={index}>
                            <DestinationCard dest={dest} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <ButtonFunc className="relative left-1/2 -translate-x-1/2 mt-8" />
            </Carousel>
        </section>
    );
}
