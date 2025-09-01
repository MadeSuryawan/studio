"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

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
    Search,
    Loader2,
    MessageCircle,
    Copy,
} from "lucide-react";
import { handleItineraryRequest } from "@/app/actions";
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

export default function SearchSection(): React.JSX.Element {
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
        navigator.clipboard.writeText(itinerary).then(
            () => {
                toast({
                    title: "Itinerary copied",
                });
            },
            (err) => {
                toast({
                    variant: "destructive",
                    title: "Failed to copy",
                    description: "Could not copy itinerary to clipboard.",
                });
                console.error("Could not copy text: ", err);
            },
        );
    };

    const whatsAppMessage = `Here is my Bali itinerary from BaliBlissed:\n\n${itinerary}`;
    const businessWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello! I created a custom itinerary and would like to ask some questions.`)}`;
    const userWhatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(whatsAppMessage)}`;

    return (
        <section
            id="search"
            className="relative w-full rounded-t-lg border-t-2"
        >
            <div className="container px-4 md:px-6">
                <Card className="max-w-4xl mx-auto shadow-xl -mt-32 relative z-20 border-border/50 border-t-0 bg-bg-alternate">
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
                                                name="interests"
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="text-muted-foreground">
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
                                                    <FormControl className=" border-[1px] dark:border-white/50 border-black/60 text-muted-foreground bg-bg-alternate">
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "pl-3 text-left font-normal hover:scale-none focus:ring-1 focus:ring-ring",
                                                                !field.value
                                                                    ?.from &&
                                                                    "text-muted-foreground bg-bg-alternate",
                                                            )}
                                                        >
                                                            {field.value
                                                                ?.from ? (
                                                                field.value
                                                                    .to ? (
                                                                    <>
                                                                        {format(
                                                                            field
                                                                                .value
                                                                                .from,
                                                                            "LLL dd, y",
                                                                        )}{" "}
                                                                        -{" "}
                                                                        {format(
                                                                            field
                                                                                .value
                                                                                .to,
                                                                            "LLL dd, y",
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    format(
                                                                        field
                                                                            .value
                                                                            .from,
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
                                                    {...field}
                                                    name="budget"
                                                    autoComplete="off"
                                                    placeholder="Your budget"
                                                    className="border-[1px] dark:border-white/50 border-black/60 bg-bg-alternate text-special-card-fg placeholder:-muted-foreground"
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
                                    Enter your WhatsApp number (with country
                                    code)
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="whatsapp-input"
                                        type="tel"
                                        placeholder="e.g. 14155552671"
                                        value={whatsAppNumber}
                                        onChange={(e) =>
                                            setWhatsAppNumber(e.target.value)
                                        }
                                    />
                                    <Button asChild disabled={!whatsAppNumber}>
                                        <a
                                            href={userWhatsAppUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
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
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={handleCopyToClipboard}
                                    >
                                        <Copy /> Copy Itinerary
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() =>
                                            setShowWhatsAppInput(true)
                                        }
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
                            <a
                                href={businessWhatsAppUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Contact Us
                            </a>
                        </Button>
                        <AlertDialogAction
                            onClick={closeDialog}
                            className="w-full sm:w-auto"
                        >
                            Close
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
