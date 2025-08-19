"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const blogPosts = [
    {
        title: "What to Pack for Your Bali Trip: The Essentials",
        description:
            "Packing for Bali can be tricky. It's hot and humid, but you also need to be respectful at temples. Here's our essential packing list to make sure you're prepared for everything.",
        image: "https://placehold.co/600x400.png",
        hint: "packing list travel",
        link: "#",
    },
    {
        title: "Top 5 Must-Visit Waterfalls in Bali",
        description:
            "Bali is famous for its stunning waterfalls. From the majestic Sekumpul to the hidden gem of Tibumana, we've rounded up the top 5 cascades you can't miss on your trip.",
        image: "https://placehold.co/600x400.png",
        hint: "bali waterfall",
        link: "#",
    },
    {
        title: "A Food Lover's Guide to Balinese Cuisine",
        description:
            "From the famous Babi Guling to the fragrant Nasi Campur, Balinese food is a feast for the senses. Discover the must-try dishes that will make your culinary journey unforgettable.",
        image: "https://placehold.co/600x400.png",
        hint: "balinese food",
        link: "#",
    },
];

export default function BlogSection(): React.JSX.Element {
    return (
        <section id="blog" className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                            From Our Blog
                        </h2>
                        <p className="text-lg text-muted-foreground mt-2">
                            Get inspired for your Bali adventure.
                        </p>
                    </div>
                    <Button
                        asChild
                        variant="outline"
                        className="hidden md:flex"
                    >
                        <Link href="#">
                            View All Posts{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Link key={post.title} href={post.link}>
                            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col bg-card">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    data-ai-hint={post.hint}
                                />
                                <CardContent className="p-6 flex flex-col flex-grow">
                                    <CardTitle className="text-xl font-bold leading-tight">
                                        {post.title}
                                    </CardTitle>
                                    <p className="mt-2 text-muted-foreground text-sm flex-grow">
                                        {post.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Button asChild variant="outline">
                        <Link href="#">
                            View All Posts{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
