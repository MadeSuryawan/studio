"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, SlidersHorizontal, Phone, Sparkles } from "lucide-react";

const benefits = [
    {
        icon: <Users />,
        title: "Local Expertise",
        description:
            "Our team is based in Bali and has intimate knowledge of the island, ensuring you get an authentic, insider experience.",
    },
    {
        icon: <SlidersHorizontal />,
        title: "Fully Customizable",
        description:
            "Every itinerary is a starting point. We work with you to tailor your trip to your exact interests, style, and budget.",
    },
    {
        icon: <Phone />,
        title: "24/7 On-Trip Support",
        description:
            "Travel with peace of mind knowing that our team is available around the clock to assist you with anything you need.",
    },
    {
        icon: <Sparkles />,
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
                    <h2
                        className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline
                    text-special-card-fg"
                    >
                        Why Choose BaliBlissed?
                    </h2>
                    <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed mt-4">
                        We&rsquo;re more than just a travel agency. We&rsquo;re
                        your personal guide to the Island of the Gods.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 md:auto-rows-fr">
                    {benefits.map((benefit, index) => (
                        <Card
                            key={index}
                            className="text-center p-2 md:p-4 flex flex-col items-center justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 h-44 sm:h-48 md:h-full "
                        >
                            <CardHeader className="p-0 my-1 md:my-2 flex-shrink-0 mx-auto text-accent">
                                <div>
                                    {React.cloneElement(benefit.icon, {
                                        className:
                                            "w-5 h-full lg:w-8 md:w-8 text-accent",
                                    })}
                                </div>
                            </CardHeader>

                            <CardContent className="p-0 flex-1 flex flex-col justify-center min-h-0 my-2 md:my-0">
                                <CardTitle
                                    className="text-md md:text-xl mb-3 md:mb-6 flex-shrink-0 leading-light
                                text-special-card-fg"
                                >
                                    {benefit.title}
                                </CardTitle>
                                <p className="text-muted-foreground text-xs md:text-sm leading-light -mt-1 md:mt-0">
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
