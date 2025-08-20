"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, SlidersHorizontal, Phone, Sparkles } from "lucide-react";

const benefits = [
    {
        icon: <Users className="w-8 h-8 text-accent" />,
        title: "Local Expertise",
        description:
            "Our team is based in Bali and has intimate knowledge of the island, ensuring you get an authentic, insider experience.",
    },
    {
        icon: <SlidersHorizontal className="w-8 h-8 text-accent" />,
        title: "Fully Customizable",
        description:
            "Every itinerary is a starting point. We work with you to tailor your trip to your exact interests, style, and budget.",
    },
    {
        icon: <Phone className="w-8 h-8 text-accent" />,
        title: "24/7 On-Trip Support",
        description:
            "Travel with peace of mind knowing that our team is available around the clock to assist you with anything you need.",
    },
    {
        icon: <Sparkles className="w-8 h-8 text-accent" />,
        title: "Unique Experiences",
        description:
            "We go beyond the typical tourist spots to offer unique cultural interactions and hidden gems you won't find elsewhere.",
    },
];

export default function WhyChooseUsSection(): React.JSX.Element {
    return (
        <section id="why-choose-us" className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-lighter sm:text-4xl md:text-5xl font-headline">
                        Why Choose BaliBlissed?
                    </h2>
                    <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed mt-4">
                        We&rsquo;re more than just a travel agency. We&rsquo;re
                        your personal guide to the Island of the Gods.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <Card
                            key={index}
                            className="text-center p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <CardHeader className="p-0 mb-4">
                                {benefit.icon}
                            </CardHeader>
                            <CardContent className="p-0">
                                <CardTitle className="text-xl mb-2">
                                    {benefit.title}
                                </CardTitle>
                                <p className="text-muted-foreground text-sm">
                                    {benefit.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
