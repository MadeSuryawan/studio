"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    CalendarIcon,
    Car,
    MapPin,
    Search,
    Waves,
    Utensils,
    Users,
    BedDouble,
    Plane,
    Loader2,
    ShieldCheck,
    Clock,
    UserCheck,
    Mail,
    MessageCircle,
    Copy,
} from "lucide-react";
import { handleItineraryRequest, handleContactRequest } from "./actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const TempleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11.99 2.25L2.69 9.33l-1.39 1.58v1.8l4.6-1.58v6.75h1.5v-4.5l1.88-.63v5.13h1.5v-4.5l1.88-.63v5.13h1.5v-4.5l1.88-.63v5.13h1.5V11.13l4.6 1.58v-1.8l-1.39-1.58L11.99 2.25zM9.25 11.25H14.75"></path></svg>
)

const DanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 4a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 14.5a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0v6a.5.5 0 0 1-.5.5z"/><path d="M6.5 11.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5zM17.5 11.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5z"/><path d="M12 14.5a6 6 0 0 0-6-6H4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H6"/><path d="M12 14.5a6 6 0 0 1 6-6h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H18"/></svg>
)


const HeroSection = (): React.JSX.Element => (
    <section className="relative w-full h-[80vh] min-h-[480px]">
        <Image
            src="https://placehold.co/1600x900.png"
            alt="Lush rice paddies in Bali"
            fill
            className="object-cover brightness-50"
            priority
            sizes="100vw"
            data-ai-hint="bali rice paddies"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground p-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline">
                Discover Your Bali Bliss
            </h1>
            <p className="max-w-2xl mt-4 text-lg md:text-xl text-primary-foreground/90">
                We craft personalized, unforgettable journeys to the Island of
                the Gods. Let your story in Bali begin with us.
            </p>
            <div className="mt-8">
                <Button
                    asChild
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                    <Link href="#packages">Explore Packages</Link>
                </Button>
            </div>
        </div>
    </section>
);

const searchSchema = z.object({
    interests: z.string().min(1, "Please select an interest"),
    date: z
        .object({
            from: z.date().optional(),
            to: z.date().optional(),
        })
        .optional(),
    budget: z.string().min(2, "Please provide a budget"),
});

const SearchSection = (): React.JSX.Element => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [itinerary, setItinerary] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [showWhatsAppInput, setShowWhatsAppInput] = React.useState(false);
    const [whatsAppNumber, setWhatsAppNumber] = React.useState("");
    const { toast } = useToast();

    const form = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            interests: "",
            budget: "",
        },
    });

    const closeDialog = () => {
        setItinerary(null);
        setError(null);
        setShowWhatsAppInput(false);
        setWhatsAppNumber("");
    };

    async function onSubmit(data: z.infer<typeof searchSchema>): Promise<void> {
        setIsLoading(true);
        setError(null);
        setItinerary(null);

        let travelDates = "any time";
        if (data.date?.from) {
            if (data.date.to) {
                travelDates = `${format(data.date.from, "yyyy-MM-dd")} to ${format(data.date.to, "yyyy-MM-dd")}`;
            } else {
                travelDates = format(data.date.from, "yyyy-MM-dd");
            }
        }

        const result = await handleItineraryRequest({
            interests: data.interests,
            travelDates: travelDates,
            budget: data.budget,
        });

        setIsLoading(false);

        if (result.success && result.data) {
            setItinerary(result.data.itinerary);
        } else {
            setError(result.error ?? "An unexpected error occurred.");
        }
    }

    const handleCopyToClipboard = () => {
        if (!itinerary) return;
        navigator.clipboard.writeText(itinerary).then(() => {
            toast({
                title: "Itinerary copied",
            });
        }, (err) => {
            toast({
                variant: "destructive",
                title: "Failed to copy",
                description: "Could not copy itinerary to clipboard.",
            });
            console.error('Could not copy text: ', err);
        });
    };

    const whatsAppMessage = `Here is my Bali itinerary from BaliBlissed Journeys:\n\n${itinerary}`;
    const businessWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello! I created a custom itinerary and would like to ask some questions.`)}`;
    const userWhatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(whatsAppMessage)}`;

    return (
        <section className="w-full py-12 md:py-24 bg-background">
            <div className="container px-4 md:px-6">
                <Card className="max-w-4xl mx-auto shadow-lg -mt-32 relative z-20 border-border/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <Search /> Find Your Perfect Trip
                        </CardTitle>
                        <CardDescription>
                            Fill out your preferences and let our AI create a
                            custom itinerary just for you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                            >
                                <FormField
                                    control={form.control}
                                    name="interests"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Interests</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="e.g., Culture, Adventure, Relaxation" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="culture">
                                                        Culture & Temples
                                                    </SelectItem>
                                                    <SelectItem value="adventure">
                                                        Adventure & Nature
                                                    </SelectItem>
                                                    <SelectItem value="relaxation">
                                                        Relaxation & Wellness
                                                    </SelectItem>
                                                    <SelectItem value="culinary">
                                                        Culinary Delights
                                                    </SelectItem>
                                                    <SelectItem value="surfing">
                                                        Surfing & Beaches
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Travel Dates (Optional)
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "pl-3 text-left font-normal",
                                                                !field.value
                                                                    ?.from &&
                                                                    "text-muted-foreground",
                                                            )}
                                                        >
                                                            {field.value
                                                                ?.from ? (
                                                                field.value
                                                                    .to ? (
                                                                    <>
                                                                        {format(
                                                                            field.value.from,
                                                                            "LLL dd, y",
                                                                        )}{" "}
                                                                        -{" "}
                                                                        {format(
                                                                            field.value.to,
                                                                            "LLL dd, y",
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    format(
                                                                        field.value.from,
                                                                        "LLL dd, y",
                                                                    )
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pick a date
                                                                    range
                                                                </span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="range"
                                                        selected={
                                                            field.value as DateRange
                                                        }
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        disabled={(
                                                            date: Date,
                                                        ) =>
                                                            date <
                                                            new Date(
                                                                new Date().setHours(
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    0,
                                                                ),
                                                            )
                                                        }
                                                        initialFocus
                                                        numberOfMonths={2}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="budget"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Budget (e.g., $1000)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Your budget"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="md:col-start-3 bg-primary hover:bg-primary/90"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Create My Itinerary"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <AlertDialog
                open={!!itinerary || !!error}
                onOpenChange={closeDialog}
            >
                <AlertDialogContent className="max-w-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {error
                                ? "Oh no!"
                                : "Your Custom Bali Itinerary is Ready!"}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="whitespace-pre-wrap text-sm max-h-[60vh] overflow-y-auto">
                            {error || itinerary}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-4">
                        {!error && showWhatsAppInput && (
                            <div className="space-y-2">
                                <Label htmlFor="whatsapp-input">
                                    Enter your WhatsApp number (with country code)
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="whatsapp-input"
                                        type="tel"
                                        placeholder="e.g. 14155552671"
                                        value={whatsAppNumber}
                                        onChange={(e) => setWhatsAppNumber(e.target.value)}
                                    />
                                    <Button asChild disabled={!whatsAppNumber}>
                                        <a href={userWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                                            Send
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex flex-col sm:flex-row gap-2">
                           {!error && (
                             <>
                               <Button variant="outline" className="w-full" onClick={handleCopyToClipboard}>
                                   <Copy /> Copy Itinerary
                               </Button>
                               <Button
                                   variant="outline"
                                   className="w-full"
                                   onClick={() => setShowWhatsAppInput(true)}
                               >
                                   <MessageCircle /> Send to my WhatsApp
                               </Button>
                             </>
                           )}
                        </div>
                        <Button
                            asChild
                            variant="default"
                            className="w-full sm:w-auto"
                        >
                           <a href={businessWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                             Contact Us
                           </a>
                        </Button>
                        <AlertDialogAction
                            onClick={closeDialog}
                            className="w-full sm:w-auto"
                            variant="secondary"
                        >
                            Close
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
};

const destinations = [
    {
        name: "Ubud",
        description:
            "The cultural heart of Bali, known for its lush rice paddies, art galleries, and spiritual retreats.",
        image: "https://placehold.co/600x400.png",
        hint: "bali ubud",
    },
    {
        name: "Canggu",
        description:
            "A vibrant coastal town with a laid-back surf culture, trendy cafes, and lively beach clubs.",
        image: "https://placehold.co/600x400.png",
        hint: "bali canggu",
    },
    {
        name: "Seminyak",
        description:
            "Bali's hub for luxury resorts, high-end shopping, and world-class dining experiences.",
        image: "https://placehold.co/600x400.png",
        hint: "bali seminyak",
    },
    {
        name: "Nusa Penida",
        description:
            "A rugged island paradise offering dramatic cliffs, pristine beaches, and incredible diving spots.",
        image: "https://placehold.co/600x400.png",
        hint: "nusa penida",
    },
];

const DestinationsSection = (): React.JSX.Element => (
    <section id="destinations" className="w-full py-12 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                    Featured Destinations
                </h2>
                <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Explore the diverse landscapes and vibrant culture that make
                    Bali a world-renowned destination.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {destinations.map((dest) => (
                    <Card
                        key={dest.name}
                        className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <CardHeader className="p-0">
                            <Image
                                src={dest.image}
                                alt={dest.name}
                                width={600}
                                height={400}
                                className="w-full h-48 object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                data-ai-hint={dest.hint}
                            />
                        </CardHeader>
                        <CardContent className="p-6">
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="text-primary h-5 w-5" />
                                {dest.name}
                            </CardTitle>
                            <CardDescription className="mt-2">
                                {dest.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const packages = [
    {
        title: "Cultural Heartbeat of Ubud",
        duration: "5 Days / 4 Nights",
        price: "$750",
        image: "https://placehold.co/600x400.png",
        hint: "bali temple",
        features: [
            {
                icon: <TempleIcon className="w-5 h-5 text-accent" />,
                text: "Temple Tours",
            },
            {
                icon: <DanceIcon className="w-5 h-5 text-accent" />,
                text: "Traditional Dance Show",
            },
            {
                icon: <Utensils className="w-5 h-5 text-accent" />,
                text: "Cooking Class",
            },
        ],
    },
    {
        title: "Coastal Vibe & Surf",
        duration: "7 Days / 6 Nights",
        price: "$1200",
        image: "https://placehold.co/600x400.png",
        hint: "bali beach",
        features: [
            {
                icon: <Waves className="w-5 h-5 text-accent" />,
                text: "Surf Lessons",
            },
            {
                icon: <BedDouble className="w-5 h-5 text-accent" />,
                text: "Beachfront Villa",
            },
            {
                icon: <Users className="w-5 h-5 text-accent" />,
                text: "Yoga Sessions",
            },
        ],
    },
    {
        title: "Luxury & Relaxation",
        duration: "4 Days / 3 Nights",
        price: "$1500",
        image: "https://placehold.co/600x400.png",
        hint: "bali spa",
        features: [
            {
                icon: <BedDouble className="w-5 h-5 text-accent" />,
                text: "5-Star Resort",
            },
            {
                icon: <Users className="w-5 h-5 text-accent" />,
                text: "Private Spa Treatments",
            },
            {
                icon: <Utensils className="w-5 h-5 text-accent" />,
                text: "Fine Dining",
            },
        ],
    },
    {
        title: "The Ultimate Bali Adventure",
        duration: "10 Days / 9 Nights",
        price: "$2500",
        image: "https://placehold.co/600x400.png",
        hint: "bali volcano",
        features: [
            {
                icon: <Plane className="w-5 h-5 text-accent" />,
                text: "All-inclusive",
            },
            {
                icon: <TempleIcon className="w-5 h-5 text-accent" />,
                text: "Volcano Sunrise Trek",
            },
            {
                icon: <Waves className="w-5 h-5 text-accent" />,
                text: "Scuba Diving",
            },
        ],
    },
];

const PackagesSection = (): React.JSX.Element => (
    <section id="packages" className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                    Curated Travel Packages
                </h2>
                <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Hand-picked experiences designed to give you the very best
                    of Bali, hassle-free.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {packages.map((pkg) => (
                    <Card
                        key={pkg.title}
                        className="flex flex-col md:flex-row overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <Image
                            src={pkg.image}
                            alt={pkg.title}
                            width={600}
                            height={400}
                            className="w-full md:w-1/3 h-64 md:h-auto object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            data-ai-hint={pkg.hint}
                        />
                        <div className="flex flex-col p-6 justify-between flex-1">
                            <div>
                                <CardDescription>
                                    {pkg.duration}
                                </CardDescription>
                                <CardTitle className="mt-1">
                                    {pkg.title}
                                </CardTitle>
                                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                    {pkg.features.map((feature) => (
                                        <li
                                            key={feature.text}
                                            className="flex items-center gap-3"
                                        >
                                            {feature.icon}
                                            <span>{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-end justify-between mt-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        From
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {pkg.price}
                                    </p>
                                </div>
                                <Button
                                    asChild
                                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                                >
                                    <Link
                                        href={`/#contact?message=I'm interested in the "${pkg.title}" package.`}
                                    >
                                        Book Now
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const CarCharterSection = (): React.JSX.Element => (
    <section id="car-charter" className="w-full py-12 md:py-24 bg-secondary">
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

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    message: z.string().min(10, "Message must be at least 10 characters."),
});

const ContactForm = (): React.JSX.Element => {
    const searchParams = useSearchParams();
    const initialMessage = searchParams.get("message") || "";
    const [isLoading, setIsLoading] = React.useState(false);
    const [dialogState, setDialogState] = React.useState<{
        title: string;
        description: string;
    } | null>(null);

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: "", email: "", message: initialMessage },
    });

    React.useEffect(() => {
        form.setValue("message", initialMessage);
    }, [initialMessage, form]);

    async function onSubmit(
        data: z.infer<typeof contactSchema>,
    ): Promise<void> {
        setIsLoading(true);
        setDialogState(null);

        const result = await handleContactRequest(data);

        setIsLoading(false);

        if (result.success && result.data) {
            setDialogState({
                title: "Message Sent!",
                description: result.data.confirmation,
            });
            form.reset({ name: "", email: "", message: "" });
        } else {
            setDialogState({
                title: "Oh no!",
                description: result.error ?? "An unexpected error occurred.",
            });
        }
    }

    return (
        <>
            <div className="mx-auto w-full max-w-sm lg:max-w-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Your Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Your Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Your Message"
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Send Message"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
            <AlertDialog
                open={!!dialogState}
                onOpenChange={() => setDialogState(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {dialogState?.title}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogState?.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setDialogState(null)}>
                            Close
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

const ContactSection = (): React.JSX.Element => (
    <section id="contact" className="w-full py-12 md:py-24 bg-background">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                    Get in Touch
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Have a question or ready to plan your trip? Send us a
                    message!
                </p>
            </div>
            <React.Suspense fallback={<div>Loading form...</div>}>
                <ContactForm />
            </React.Suspense>
        </div>
    </section>
);

export default function Home(): React.JSX.Element {
    return (
        <>
            <HeroSection />
            <React.Suspense>
               <SearchSection />
            </React.Suspense>
            <DestinationsSection />
            <PackagesSection />
            <CarCharterSection />
            <ContactSection />
        </>
    );
}

    