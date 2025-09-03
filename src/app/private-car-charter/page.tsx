"use client";
import { type JSX, cloneElement, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Check, Car, Clock, MapPin, UserCheck, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CarOption {
    name: string;
    capacity: string;
    description: string;
    imageUrl: string;
}

interface PricingTier {
    name: string;
    slug: string;
    duration: string;
    price: string;
    priceUnit: string;
    description: string;
    included: string[];
}

interface Feature {
    icon: JSX.Element;
    title: string;
    description: string;
}

const carOptions: CarOption[] = [
    {
        name: "Standard MPV",
        capacity: "4-5 Passengers",
        description:
            "Comfortable and efficient, perfect for couples, solo travelers, or small families.",
        imageUrl:
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1920&auto=format&fit=crop",
    },
    {
        name: "Comfort SUV",
        capacity: "6-7 Passengers",
        description:
            "Spacious and stylish, offering extra comfort and luggage space for families and groups.",
        imageUrl:
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1920&auto=format&fit=crop",
    },
    {
        name: "Group Van",
        capacity: "10-14 Passengers",
        description:
            "The ideal choice for large groups or families traveling together, ensuring everyone stays in one vehicle.",
        imageUrl:
            "https://images.unsplash.com/photo-1605152276825-9514f0373340?q=80&w=1920&auto=format&fit=crop",
    },
];

const pricingTiers: PricingTier[] = [
    {
        name: "Half Day Charter",
        slug: "half-day",
        duration: "Up to 6 Hours",
        price: "$35",
        priceUnit: "USD",
        description:
            "Perfect for exploring a specific area like Ubud or the southern beaches.",
        included: [
            "Private Car & Driver",
            "Gasoline",
            "Parking Fees",
            "Up to 4 passengers",
        ],
    },
    {
        name: "Full Day Charter",
        slug: "full-day",
        duration: "Up to 10 Hours",
        price: "$50",
        priceUnit: "USD",
        description:
            "Ideal for a full-day trip across different regions of Bali.",
        included: [
            "Private Car & Driver",
            "Gasoline",
            "Parking Fees",
            "Mineral Water",
            "Up to 4 passengers",
        ],
    },
    {
        name: "Airport Transfer",
        slug: "airport-transfer",
        duration: "One Way",
        price: "$25",
        priceUnit: "USD",
        description:
            "Hassle-free pickup or drop-off from/to Ngurah Rai International Airport.",
        included: [
            "Private Car & Driver",
            "Gasoline",
            "Airport Parking",
            "Toll Fees",
        ],
    },
];

const features: Feature[] = [
    {
        icon: <Car className="w-10 h-10 text-primary" />,
        title: "Comfortable & Clean Vehicles",
        description:
            "Travel in modern, air-conditioned cars that are regularly cleaned and maintained for your comfort.",
    },
    {
        icon: <UserCheck className="w-10 h-10 text-primary" />,
        title: "Professional English-Speaking Drivers",
        description:
            "Our drivers are not just drivers; they are friendly, knowledgeable local guides who speak English.",
    },
    {
        icon: <MapPin className="w-10 h-10 text-primary" />,
        title: "Customizable Itinerary",
        description:
            "You are in complete control. Go wherever you want, whenever you want. We help you build your perfect day.",
    },
    {
        icon: <Clock className="w-10 h-10 text-primary" />,
        title: "Flexible Durations",
        description:
            "Choose from half-day, full-day, or multi-day charters to fit your travel plans perfectly.",
    },
];

function HeroSection1(): React.JSX.Element {
    return (
        <section
            className="relative w-full h-[50vh] flex items-center justify-center text-center bg-cover bg-center"
            style={{
                backgroundImage: "url(https://placehold.co/600x400.png)",
            }}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />
            <div className="relative z-20 container px-4 md:px-6">
                <h1 className="text-4xl font-bold tracking-normal sm:text-5xl md:text-6xl text-white">
                    Private Car Charter in Bali
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200 md:text-xl">
                    Explore the Island of the Gods at Your Own Pace. Your Car,
                    Your Driver, Your Itinerary.
                </p>
            </div>
        </section>
    );
}
function HeroSection(): React.JSX.Element {
    return (
        <section className="relative w-full h-[50vh] min-h-[480px]">
            <Image
                src="https://placehold.co/1600x800.png"
                alt="Car Charter in Bali"
                fill
                className="object-cover"
                priority
                data-ai-hint="private car charter in bali"
            />
            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#808080] blur-lg mix-blend-multiply brightness-110 z-10" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-hero-title p-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-normal font-headline">
                    Private Car Charter in Bali
                </h1>
                <p className="max-w-2xl mt-4 text-lg md:text-xl text-hero-title/90">
                    Explore the Island of the Gods at Your Own Pace. Your Car,
                    Your Driver, Your Itinerary.
                </p>
            </div>
        </section>
    );
}

function FleetOptionsSection(): React.JSX.Element {
    return (
        <section id="fleet-options" className="relative w-full py-12 md:py-20">
            <div className="container px-4 md:px-6 z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-normal sm:text-4xl text-special-card-fg">
                        Our Fleet Options
                    </h2>
                    <p className="mt-2 text-gray-500 md:text-lg dark:text-gray-400">
                        Choose the perfect vehicle for your group size and
                        comfort needs.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {carOptions.map((car, idx) => (
                        <Card
                            key={car.name}
                            className="overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:bg-gray-950"
                        >
                            <CardHeader className="p-0">
                                <Image
                                    src="https://placehold.co/600x400.png"
                                    width={600}
                                    height={400}
                                    priority={idx === 0}
                                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                    alt={car.name}
                                    className="w-full h-48 object-cover"
                                />
                            </CardHeader>
                            <CardContent className="p-6">
                                <CardTitle className="text-special-card-fg">
                                    {car.name}
                                </CardTitle>
                                <div className="flex items-center gap-2 text-muted-foreground mt-2">
                                    <Users className="w-5 h-5" />
                                    <span>{car.capacity}</span>
                                </div>
                                <p className="text-muted-foreground mt-4">
                                    {car.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-8 text-sm text-muted-foreground">
                    <p>
                        Standard MPV is included in the base price. SUVs and
                        Vans are available upon request (additional charges may
                        apply).
                    </p>
                </div>
            </div>
        </section>
    );
}

function PricingSection(): React.JSX.Element {
    return (
        <section id="pricing" className="relative w-full py-12 md:py-16">
            <div className="container px-4 md:px-6 z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-normal sm:text-4xl text-special-card-fg">
                        Our Charter Rates
                    </h2>
                    <p className="mt-2 text-gray-500 md:text-lg dark:text-gray-400">
                        Simple, transparent pricing. No hidden fees.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                    {pricingTiers.map((tier) => (
                        <Card
                            key={tier.slug}
                            className="flex flex-col hover:shadow-xl transition-shadow duration-300 bg-bg-alternate"
                        >
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl text-special-card-fg">
                                    {tier.name}
                                </CardTitle>
                                <CardDescription>
                                    {tier.duration}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="text-center my-4">
                                        <span className="text-4xl font-bold text-special-card-fg">
                                            {tier.price}
                                        </span>
                                        <span className="text-muted-foreground">
                                            {" "}
                                            / {tier.priceUnit}
                                        </span>
                                    </div>
                                    <p className="text-center text-muted-foreground mb-6">
                                        {tier.description}
                                    </p>
                                    <ul className="space-y-3">
                                        {tier.included.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-center gap-2 text-special-card-fg"
                                            >
                                                <Check className="w-5 h-5 text-green-500" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full mt-6">
                                    <Button className="w-full" asChild>
                                        <Link
                                            href={`/booking/car-charter?tier=${tier.slug}`}
                                        >
                                            Book Now
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-8 text-sm text-muted-foreground">
                    <p>* Extra hour is available at $5 USD / hour.</p>
                    <p>
                        * Prices may vary for trips to remote areas like Amed,
                        Tulamben, or West Bali.
                    </p>
                </div>
            </div>
        </section>
    );
}

function WhyChooseSection(): React.JSX.Element {
    return (
        <section id="why-choose-us" className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline text-special-card-fg">
                        Why Charter a Car with Us?
                    </h2>
                    <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed mt-4">
                        Experience the ultimate freedom and comfort while
                        exploring Bali.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 md:auto-rows-fr">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            className="text-center p-2 md:p-4 flex flex-col items-center justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 h-44 sm:h-48 md:h-full "
                        >
                            <CardHeader className="p-0 my-1 md:my-2 flex-shrink-0 mx-auto text-accent">
                                <div>
                                    {cloneElement(feature.icon, {
                                        className:
                                            "w-5 h-full lg:w-8 md:w-8 text-accent",
                                    })}
                                </div>
                            </CardHeader>

                            <CardContent className="p-0 flex-1 flex flex-col justify-center min-h-0 my-2 md:my-0">
                                <CardTitle className="text-md md:text-xl mb-3 md:mb-6 flex-shrink-0 leading-light text-special-card-fg">
                                    {feature.title}
                                </CardTitle>
                                <p className="text-muted-foreground text-xs md:text-sm leading-light -mt-1 md:mt-0">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function CarCharter(): JSX.Element {
    const pageSections = [
        FleetOptionsSection,
        PricingSection,
        WhyChooseSection,
    ];
    return (
        <>
            <HeroSection />
            <Suspense fallback={<div>Loading...</div>}>
                {pageSections.map((Section, index) => (
                    <Section key={index} />
                ))}
            </Suspense>
        </>
    );
}
