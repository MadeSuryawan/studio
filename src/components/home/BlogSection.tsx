"use client";

import * as React from "react";
import Gradient from "./Gradient";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { SectionCard, CardData, ButtonFunc } from "./SectionCard";

const blogPosts: CardData[] = [
    {
        name: "What to Pack for Your Bali Trip: The Essentials",
        description:
            "Packing for Bali can be tricky. It's hot and humid, but you also need to be respectful at temples. Here's our essential packing list to make sure you're prepared for everything.",
        image: "https://placehold.co/600x400.png",
        aiHint: "packing list travel",
        link: "#",
    },
    {
        name: "Top 5 Must-Visit Waterfalls in Bali",
        description:
            "Bali is famous for its stunning waterfalls. From the majestic Sekumpul to the hidden gem of Tibumana, we've rounded up the top 5 cascades you can't miss on your trip.",
        image: "https://placehold.co/600x400.png",
        aiHint: "bali waterfall",
        link: "#",
    },
    {
        name: "A Food Lover's Guide to Balinese Cuisine",
        description:
            "From the famous Babi Guling to the fragrant Nasi Campur, Balinese food is a feast for the senses. Discover the must-try dishes that will make your culinary journey unforgettable.",
        image: "https://placehold.co/600x400.png",
        aiHint: "balinese food",
        link: "#",
    },
    {
        name: "The Hidden Gems of Nusa Penida",
        description:
            "Venture off the beaten path to discover the untouched beauty of Nusa Penida, from pristine beaches to breathtaking cliffside views.",
        image: "https://placehold.co/600x400.png",
        link: "/blog/nusa-penida-gems",
        aiHint: "Nusa Penida cliffside",
    },
];

const Titles: React.FC = () => (
    <div>
        <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline">
            From Our Blog
        </h2>
        <p className="text-lg text-muted-foreground mt-2">
            Get inspired for your Bali adventure.
        </p>
    </div>
);

export default function BlogSection(): React.JSX.Element {
    const cardRef = React.useRef<HTMLDivElement>(null);
    return (
        <section id="blog" className="relative w-full py-8">
            {/* <Gradient /> */}
            {/* Desktop view */}
            <div className="container px-6 z-10 hidden md:block">
                <div className="flex justify-between items-center mb-12">
                    <Titles />
                </div>
                <div className="grid grid-cols-4 gap-3 mb-12">
                    {blogPosts.map((post) => (
                        // <BlogCard key={post.name} post={post} />
                        <SectionCard
                            ref={cardRef}
                            key={post.name}
                            data={post}
                            buttonText="Read More"
                            buttonLink={post.link}
                            // spotlight={true}
                        />
                    ))}
                </div>
                <div className="flex justify-end mt-auto">
                    <ButtonFunc
                        text="View All Posts"
                        ariaLabel="View all posts"
                    />
                </div>
            </div>

            {/* Mobile view */}
            <Carousel className="mx-auto max-w-xs sm:max-w-sm md:hidden z-10">
                <div className="text-center py-4">
                    <Titles />
                </div>
                <CarouselContent paginationMt="mt-32">
                    {blogPosts.map((post) => (
                        <CarouselItem key={post.name}>
                            {/* <BlogCard post={post} /> */}
                            <SectionCard
                                ref={cardRef}
                                key={post.name}
                                data={post}
                                buttonText="Read More"
                                buttonLink={post.link}
                                // spotlight={true}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <ButtonFunc
                    text="View All Posts"
                    className="relative left-1/2 -translate-x-1/2 mt-8"
                    ariaLabel="View all posts"
                />
            </Carousel>
        </section>
    );
}
