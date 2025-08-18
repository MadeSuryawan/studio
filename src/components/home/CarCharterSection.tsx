"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CarCharterSection(): React.JSX.Element {
    return (
        <section
            id="car-charter"
            className="w-full py-12 md:py-24 text-white"
            style={{ backgroundColor: "#22272f" }}
        >
            <div className="container grid md:grid-cols-2 items-center gap-12 px-4 md:px-6">
                <div className="text-left space-y-4">
                    <div className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                        Our Premier Service
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        Explore Bali Your Way
                    </h2>
                    <p className="mt-4 text-lg md:text-xl text-gray-300">
                        Discover the ultimate freedom with your own private car and
                        English-speaking driver. Create your custom itinerary and
                        explore Bali's hidden gems, famous landmarks, and
                        everything in between at your own pace.
                    </p>
                    <div className="mt-6">
                        <Button asChild size="lg">
                            <Link href="/private-car-charter">
                                View Charter Options
                            </Link>
                        </Button>
                    </div>
                </div>
                 <div>
                    <Image
                        src="https://placehold.co/600x400.png"
                        alt="Private car in Bali"
                        width={600}
                        height={400}
                        className="rounded-xl shadow-lg"
                        data-ai-hint="car bali"
                    />
                </div>
            </div>
        </section>
    );
}
