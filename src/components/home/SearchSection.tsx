"use client";

import { useState, type JSX } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/config";
import WhatsAppIcon from "../icons/WhatsAppIcon";
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
import {
    GradientButton,
    gradientButtonVariants,
} from "@/components/ui/gradient-button";
import { NotepadText, Send } from "lucide-react";

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

const accentClasses = gradientButtonVariants({
    variant: "accent",
    size: "sm",
    iconPosition: "right",
} as const);

interface SecondaryButtonProps {
    onClick: () => void;
    className?: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    ariaLabel: string;
    fullWidth?: boolean;
}

const SecondaryButton = ({
    className,
    label,
    icon: Icon,
    ariaLabel,
    fullWidth = false,
    onClick,
}: SecondaryButtonProps): JSX.Element => {
    return (
        <GradientButton
            type="button"
            size="sm"
            variant="secondary"
            fullWidth={fullWidth}
            className={cn(
                "shadow-sm border-none hover:scale-1 text-nowrap",
                className,
            )}
            icon={
                <Icon className="scale-[1.1] drop-shadow-[1px_2px_1px_#1f1f1f]" />
            }
            iconPosition="left"
            textShadow="medium"
            aria-label={ariaLabel}
            aria-describedby={ariaLabel}
            aria-expanded={false}
            aria-pressed={true}
            onClick={onClick}
        >
            {label}
        </GradientButton>
    );
};

export default function SearchSection(): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const [itinerary, setItinerary] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);
    const [whatsAppNumber, setWhatsAppNumber] = useState("");
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
            return;
        }
        setError(result.error ?? "An unexpected error occurred.");
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
                <Card
                    className={cn(
                        "max-w-4xl mx-auto shadow-xl -mt-32 relative z-20",
                        "border-border/50 border-b-0 ",
                        "bg-bg-alternate",
                    )}
                >
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
                                <div className="md:col-start-3 relative flex flex-row justify-center">
                                    <GradientButton
                                        type="submit"
                                        size="sm"
                                        variant="accent"
                                        fullWidth={false}
                                        className={cn(
                                            "justify-evenly",
                                            "left-1/2 -translate-x-1/2",
                                            " w-1/2 md:w-48",
                                            "hover:scale-[1.01]",
                                        )}
                                        disabled={isLoading}
                                        loading={isLoading}
                                        textShadow={
                                            isLoading ? "none" : "light"
                                        }
                                        icon={
                                            <NotepadText className="scale-[1.1] drop-shadow-[1px_1px_1px_#1f1f1f]" />
                                        }
                                        iconPosition="right"
                                        loadingText="Processing..."
                                        aria-label="Create My Itinerary"
                                        aria-describedby="Create My Itinerary"
                                        aria-expanded={false}
                                        aria-pressed={true}
                                        hapticFeedback={true}
                                    >
                                        Create My Itinerary
                                    </GradientButton>
                                </div>
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
                                    {/* <Button
                                        disabled={!whatsAppNumber}
                                        className={cn(
                                            "flex flex-row items-center justify-center",
                                            "bg-gradient-to-b from-[#3cd8d8] to-[#278888]",
                                            "hover:from-[#3de0e0] hover:to-[#2db0af]",
                                            "shadow-sm shadow-black/50",
                                            "hover:shadow-sm hover:shadow-black/30",
                                            "transtition-all duration-500 ease-out",
                                            "will-change-auto",
                                            "hover:scale-[1.01]",
                                            "text-white font-bold",
                                            "text-shadow-light",
                                        )}
                                    >
                                        <a
                                            href={userWhatsAppUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Send
                                        </a>
                                        <Send className="h-4 w-4 drop-shadow-[1px_1px_1px_#1f1f1f]" />
                                    </Button> */}
                                    <GradientButton
                                        type="button"
                                        size="sm"
                                        variant="primary"
                                        fullWidth={false}
                                        className={cn(
                                            "hover:scale-[1.02]",
                                            "px-3",
                                            "shadow-sm shadow-black/50",
                                            "hover:shadow-sm hover:shadow-black/30",
                                        )}
                                        icon={
                                            <Send className="scale-[1.1] drop-shadow-[1px_1px_1px_#1f1f1f]" />
                                        }
                                        iconPosition="right"
                                        textShadow="light"
                                        aria-label="Send to my WhatsApp"
                                        aria-describedby="Send to my WhatsApp"
                                        aria-expanded={false}
                                        aria-pressed={true}
                                        disabled={!whatsAppNumber}
                                        onClick={() => {
                                            window.open(
                                                userWhatsAppUrl,
                                                "_blank",
                                                "noopener noreferrer",
                                            );
                                        }}
                                    >
                                        Send
                                    </GradientButton>
                                </div>
                            </div>
                        )}
                    </div>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex flex-col sm:flex-row gap-3">
                            {!error && (
                                <>
                                    <SecondaryButton
                                        className="gap-4"
                                        label="Copy Itinerary"
                                        icon={Copy}
                                        ariaLabel="Copy Itinerary to Clipboard"
                                        onClick={handleCopyToClipboard}
                                        fullWidth={true}
                                    />
                                    <SecondaryButton
                                        label="Send to my WhatsApp"
                                        icon={MessageCircle}
                                        ariaLabel="Send to my WhatsApp"
                                        onClick={() =>
                                            setShowWhatsAppInput(true)
                                        }
                                    />
                                </>
                            )}
                        </div>
                        <GradientButton
                            type="button"
                            size="sm"
                            variant="accent"
                            fullWidth={false}
                            className={cn("hover:scale-[1.02]", "px-3")}
                            icon={
                                <WhatsAppIcon className="scale-[1.1] drop-shadow-[1px_1px_1px_#1f1f1f]" />
                            }
                            iconPosition="right"
                            textShadow="light"
                            aria-label="Contact Us"
                            aria-describedby="Contact Us on WhatsApp"
                            aria-expanded={false}
                            aria-pressed={true}
                            onClick={() => {
                                window.open(
                                    businessWhatsAppUrl,
                                    "_blank",
                                    "noopener noreferrer",
                                );
                            }}
                        >
                            Contact Us
                        </GradientButton>
                        <AlertDialogAction
                            onClick={closeDialog}
                            className={cn(
                                "w-full sm:w-auto hover:scale-[1.02]",
                                "text-shadow-gradient",
                                accentClasses,
                            )}
                        >
                            Close
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
