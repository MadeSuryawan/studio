"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import {
    Waves,
    Utensils,
    Users,
    BedDouble,
    Plane,
    ArrowRight,
} from "lucide-react";

const TempleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11.99 2.25L2.69 9.33l-1.39 1.58v1.8l4.6-1.58v6.75h1.5v-4.5l1.88-.63v5.13h1.5v-4.5l1.88-.63v5.13h1.5v-4.5l1.88-.63v5.13h1.5V11.13l4.6 1.58v-1.8l-1.39-1.58L11.99 2.25zM9.25 11.25H14.75"></path></svg>
)

const DanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 4a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 14.5a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0v6a.5.5 0 0 1-.5.5z"/><path d="M6.5 11.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.M17.5 11.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5z"/><path d="M12 14.5a6 6 0 0 0-6-6H4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H6"/><path d="M12 14.5a6 6 0 0 1 6-6h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H18"/></svg>
)

const packages = [
    {
        title: "Cultural Heartbeat of Ubud",
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
                icon: <Utensils className="w-5 h-5 text-accent" />,
                text: "Cooking Class",
            },
        ],
        image: "https://placehold.co/600x400.png",
        hint: "bali temple",
    },
    {
        title: "Coastal Vibe & Surf",
        features: [
            {
                icon: <Waves className="w-5 h-5 text-accent" />,
                text: "Surf Lessons",
            },
            {
                icon: <BedDouble className="w-5 h-5 text-accent" />,
                text: "Beachfront Villa",
            },
            {
                icon: <Users className="w-5 h-5 text-accent" />,
                text: "Yoga Sessions",
            },
        ],
        image: "https://placehold.co/600x400.png",
        hint: "bali beach",
    },
    {
        title: "Luxury & Relaxation",
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
        hint: "bali spa",
    },
    {
        title: "The Ultimate Bali Adventure",
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
        hint: "bali volcano",
    },
];

export default function PackagesSection(): React.JSX.Element {
    return (
        <section id="packages" className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                            Curated Travel Packages
                        </h2>
                        <p className="text-lg text-muted-foreground mt-2">
                           Hand-picked experiences designed to give you the very best of Bali.
                        </p>
                    </div>
                    <Button asChild className="hidden md:flex bg-special-card-bg text-special-card-fg hover:bg-special-card-bg/90">
                        <Link href="#">
                            View All Packages <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {packages.map((pkg) => (
                        <Card
                            key={pkg.title}
                            className="flex flex-col md:flex-row overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-special-card-bg text-special-card-fg border-border/20"
                        >
                            <Image
                                src={pkg.image}
                                alt={pkg.title}
                                width={600}
                                height={400}
                                className="w-full md:w-1/3 h-64 md:h-auto object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                data-ai-hint={pkg.hint}
                            />
                            <div className="flex flex-col p-6 justify-between flex-1">
                                <div>
                                    <CardTitle className="text-special-card-fg">
                                        {pkg.title}
                                    </CardTitle>
                                    <ul className="mt-4 space-y-2 text-sm text-special-card-fg/80">
                                        {pkg.features.map((feature) => (
                                            <li
                                                key={feature.text}
                                                className="flex items-center gap-3"
                                            >
                                                {feature.icon}
                                                <span>{feature.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex items-end justify-end mt-6">
                                    <Button
                                        asChild
                                        variant="secondary"
                                    >
                                        <Link
                                            href={`/#contact?message=I'd like more details about the "${pkg.title}" package.`}
                                        >
                                            View Details
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                 <div className="mt-8 text-center md:hidden">
                     <Button asChild className="bg-special-card-bg text-special-card-fg hover:bg-special-card-bg/90">
                        <Link href="#">
                            View All Packages <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
