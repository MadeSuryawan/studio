"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Gradient from "./Gradient";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

type Blogs = {
    title: string;
    description: string;
    image: string;
    hint: string;
    link: string;
};

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
    {
        title: "The Hidden Gems of Nusa Penida",
        description:
            "Venture off the beaten path to discover the untouched beauty of Nusa Penida, from pristine beaches to breathtaking cliffside views.",
        image: "https://placehold.co/600x400.png",
        link: "/blog/nusa-penida-gems",
        hint: "Nusa Penida cliffside",
    },
];

const Texts = () => (
    <div>
        <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline">
            From Our Blog
        </h2>
        <p className="text-lg text-muted-foreground mt-2">
            Get inspired for your Bali adventure.
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
            {buttonText || "View All Posts"}
            {arrow && <ArrowRight className="h-4 w-4" />}
        </Link>
    </Button>
);

const BlogCard = ({ post }: { post: Blogs }) => (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-card text-special-card-fg">
        <div className="p-1">
            <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-1/2 md:h-full object-cover rounded-t-md"
                sizes="(max-width: 768px) 100vw, 33vw"
                data-ai-hint={post.hint}
            />
        </div>
        <CardContent className="flex flex-col p-3 justify-between flex-grow">
            <CardTitle className="text-xl font-bold leading-tight overflow-hidden text-ellipsis text-nowrap">
                {post.title}
            </CardTitle>
            <p className="my-3 text-muted-foreground text-sm flex-grow leading-light">
                {post.description}
            </p>
            <div className="flex justify-end mt-auto">
                <ButtonFunc
                    className="bg-background border-none"
                    buttonText="Read More"
                    arrow={false}
                    link={post.link}
                ></ButtonFunc>
            </div>
        </CardContent>
    </Card>
);

export default function BlogSection(): React.JSX.Element {
    return (
        <section id="blog" className="relative w-full py-8">
            <Gradient />
            {/* Desktop view */}
            <div className="container px-6 z-10 hidden md:block">
                <div className="flex justify-between items-center mb-12">
                    <Texts />
                </div>
                <div className="grid grid-cols-4 gap-3 mb-12">
                    {blogPosts.map((post, index) => (
                        <BlogCard key={index} post={post} />
                    ))}
                </div>
                <div className="flex justify-end mt-auto">
                    <ButtonFunc />
                </div>
            </div>

            {/* Mobile view */}
            <Carousel className="mx-auto w-full max-w-sm md:hidden z-10">
                <div className="text-center py-4">
                    <Texts />
                </div>
                <CarouselContent paginationMt="mt-40">
                    {blogPosts.map((post, index) => (
                        <CarouselItem key={index}>
                            <BlogCard post={post} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <ButtonFunc className="relative left-1/2 -translate-x-1/2 mt-8" />
            </Carousel>
        </section>
    );
}
