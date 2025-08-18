"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ShieldCheck,
    Clock,
    UserCheck,
} from "lucide-react";

export default function CarCharterSection(): React.JSX.Element {
    return (
        <section id="car-charter" className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">
                        Our Premier Service
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-foreground">
                        Explore Bali Your Way
                    </h2>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground">
                        Enjoy the ultimate freedom and flexibility with our private
                        car charter service. Your personal driver, your custom
                        itinerary.
                    </p>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                        <div className="flex items-start gap-4">
                            <ShieldCheck className="w-12 h-12 text-accent flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-foreground">Safe & Reliable</h3>
                                <p className="text-sm text-muted-foreground">
                                    Professional, experienced drivers and
                                    well-maintained vehicles for your peace of mind.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Clock className="w-12 h-12 text-accent flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-foreground">Flexible Hours</h3>
                                <p className="text-sm text-muted-foreground">
                                    Choose from half-day (6 hours) or full-day (10
                                    hours) charters to suit your schedule.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <UserCheck className="w-12 h-12 text-accent flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-foreground">Expert Local Drivers</h3>
                                <p className="text-sm text-muted-foreground">
                                    Our drivers are also your local guides, ready to
                                    share insights and hidden gems.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Button
                            asChild
                            size="lg"
                            variant="default"
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            <Link href="/private-car-charter">
                                Learn More & Book
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}