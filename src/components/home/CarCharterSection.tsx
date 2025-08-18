"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CarCharterSection(): React.JSX.Element {
    return (
        <section
            id="car-charter"
            className="w-full py-12 md:py-24"
            style={{ backgroundColor: "#22272f" }}
        >
            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-left">
                    <div className="inline-block bg-white text-gray-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                        Our Premier Service
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-white">
                        Explore Bali Your Way
                    </h2>
                    <p className="mt-4 text-lg md:text-xl text-gray-300">
                        Discover the ultimate freedom with your own private car and
                        English-speaking driver. Create your custom itinerary and
                        explore Bali's hidden gems, famous landmarks, and
                        everything in between at your own pace.
                    </p>
                    <div className="mt-10">
                        <Button asChild size="lg" variant="outline">
                            <Link href="/private-car-charter">
                                View Charter Options
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
