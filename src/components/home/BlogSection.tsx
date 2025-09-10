"use client";

import { JSX, memo, useRef, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import SectionCard, { CardData, ButtonFunc } from "./SectionCard";
import { cn } from "@/lib/utils";

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
] as CardData[];

const SectionTitle = ({ divClass }: { divClass: string }) => {
    return (
        <div className={cn(divClass)}>
            <h2
                className={cn(
                    "font-bold tracking-normal font-headline text-special-card-fg",
                    "text-3xl md:text-5xl",
                )}
            >
                From Our Blog
            </h2>
            <p className={cn("text-lg text-muted-foreground mt-2")}>
                Get inspired for your Bali adventure.
            </p>
        </div>
    );
};
SectionTitle.displayName = "BlogTitle";

const BlogCard = memo(
    ({
        cardRef,
        post,
    }: {
        cardRef: React.RefObject<HTMLDivElement>;
        post: CardData;
    }) => {
        return (
            <>
                <SectionCard
                    ref={cardRef}
                    data={post}
                    buttonText="Read More"
                    buttonLink={post.link}
                />
            </>
        );
    },
);
BlogCard.displayName = "BlogCard";

const SectionButton = () => {
    return (
        <ButtonFunc
            className="mt-8 md:mt-0"
            text="View All Posts"
            link="#blog"
            ariaLabel="View All Posts"
        />
    );
};
SectionButton.displayName = "BlogsButton";

export default function BlogSection(): JSX.Element {
    const cardRef = useRef<HTMLDivElement>(null);
    // Apply custom classes to the card example
    useEffect(() => {
        if (cardRef.current) {
            // // Apply custom classes to the card's root element
            // cardRef.current.classList.add("w-full", "max-w-sm");
            // // Find the button wrapper and apply custom classes
            // console.log(cardRef.current);
            // const buttonWrapper = cardRef.current.querySelector(".card-button");
            // if (buttonWrapper) {
            //     console.log(buttonWrapper);
            //     buttonWrapper.classList.remove("justify-end");
            //     buttonWrapper.classList.add("justify-center", "mb-12");
            // }
        }
    }, []);
    return (
        <section id="blog">
            {/* Desktop view */}
            <div className="hidden md:block container px-6">
                <SectionTitle divClass="mb-12 text-left" />
                <div className="grid grid-cols-4 gap-3 mb-12">
                    {blogPosts.map((post) => (
                        <BlogCard
                            key={post.name}
                            cardRef={cardRef}
                            post={post}
                        />
                    ))}
                </div>
                <SectionButton />
            </div>

            {/* Mobile view */}
            <Carousel className="md:hidden mx-auto max-w-xs sm:max-w-sm">
                <SectionTitle divClass="text-center mb-8" />
                <CarouselContent paginationMt="mt-36">
                    {blogPosts.map((post) => (
                        <CarouselItem key={post.name}>
                            <BlogCard cardRef={cardRef} post={post} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <SectionButton />
            </Carousel>
        </section>
    );
}
