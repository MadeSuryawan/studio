"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CalendarIcon, MapPin, Search, Waves, Utensils, Users, BedDouble, Plane } from "lucide-react"
import { TempleIcon } from "@/components/icons/TempleIcon"
import { DanceIcon } from "@/components/icons/DanceIcon"


const HeroSection = () => (
  <section className="relative w-full h-[80vh] min-h-[480px]">
    <Image
      src="https://placehold.co/1600x900.png"
      alt="Lush rice paddies in Bali"
      layout="fill"
      objectFit="cover"
      className="brightness-50"
      data-ai-hint="bali rice paddies"
    />
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground p-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline">Discover Your Bali Bliss</h1>
      <p className="max-w-2xl mt-4 text-lg md:text-xl text-primary-foreground/90">
        We craft personalized, unforgettable journeys to the Island of the Gods. Let your story in Bali begin with us.
      </p>
      <div className="mt-8">
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="#packages">Explore Packages</Link>
        </Button>
      </div>
    </div>
  </section>
);

const searchSchema = z.object({
  interests: z.string().min(1, "Please select an interest"),
  date: z.date().optional(),
});

const SearchSection = () => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  function onSubmit(data: z.infer<typeof searchSchema>) {
    console.log(data);
    // In a real app, this would trigger a search or navigation
  }
  
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <Card className="max-w-4xl mx-auto shadow-lg -mt-32 relative z-20 border-border/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl"><Search/> Find Your Perfect Trip</CardTitle>
            <CardDescription>Filter by your interests and travel dates.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interests</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="e.g., Culture, Adventure, Relaxation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="culture">Culture & Temples</SelectItem>
                          <SelectItem value="adventure">Adventure & Nature</SelectItem>
                          <SelectItem value="relaxation">Relaxation & Wellness</SelectItem>
                          <SelectItem value="culinary">Culinary Delights</SelectItem>
                          <SelectItem value="surfing">Surfing & Beaches</SelectItem>
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
                      <FormLabel>Travel Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="md:col-start-3 bg-primary hover:bg-primary/90">Search</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
};

const destinations = [
  { name: "Ubud", description: "The cultural heart of Bali, known for its lush rice paddies, art galleries, and spiritual retreats.", image: "https://placehold.co/600x400.png", hint: "bali ubud" },
  { name: "Canggu", description: "A vibrant coastal town with a laid-back surf culture, trendy cafes, and lively beach clubs.", image: "https://placehold.co/600x400.png", hint: "bali canggu" },
  { name: "Seminyak", description: "Bali's hub for luxury resorts, high-end shopping, and world-class dining experiences.", image: "https://placehold.co/600x400.png", hint: "bali seminyak" },
  { name: "Nusa Penida", description: "A rugged island paradise offering dramatic cliffs, pristine beaches, and incredible diving spots.", image: "https://placehold.co/600x400.png", hint: "nusa penida" },
];

const DestinationsSection = () => (
  <section id="destinations" className="w-full py-12 md:py-24 bg-secondary">
    <div className="container px-4 md:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Featured Destinations</h2>
        <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          Explore the diverse landscapes and vibrant culture that make Bali a world-renowned destination.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <Card key={dest.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <Image src={dest.image} alt={dest.name} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={dest.hint} />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="flex items-center gap-2"><MapPin className="text-primary h-5 w-5"/>{dest.name}</CardTitle>
              <CardDescription className="mt-2">{dest.description}</CardDescription>
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
      { icon: <TempleIcon className="w-5 h-5 text-accent"/>, text: "Temple Tours" },
      { icon: <DanceIcon className="w-5 h-5 text-accent"/>, text: "Traditional Dance Show" },
      { icon: <Utensils className="w-5 h-5 text-accent"/>, text: "Cooking Class" },
    ] 
  },
  { 
    title: "Coastal Vibe & Surf", 
    duration: "7 Days / 6 Nights", 
    price: "$1200",
    image: "https://placehold.co/600x400.png",
    hint: "bali beach",
    features: [
      { icon: <Waves className="w-5 h-5 text-accent"/>, text: "Surf Lessons" },
      { icon: <BedDouble className="w-5 h-5 text-accent"/>, text: "Beachfront Villa" },
      { icon: <Users className="w-5 h-5 text-accent"/>, text: "Yoga Sessions" },
    ]
  },
   { 
    title: "Luxury & Relaxation", 
    duration: "4 Days / 3 Nights", 
    price: "$1500",
    image: "https://placehold.co/600x400.png",
    hint: "bali spa",
    features: [
      { icon: <BedDouble className="w-5 h-5 text-accent"/>, text: "5-Star Resort" },
      { icon: <Users className="w-5 h-5 text-accent"/>, text: "Private Spa Treatments" },
      { icon: <Utensils className="w-5 h-5 text-accent"/>, text: "Fine Dining" },
    ]
  },
  { 
    title: "The Ultimate Bali Adventure", 
    duration: "10 Days / 9 Nights", 
    price: "$2500",
    image: "https://placehold.co/600x400.png",
    hint: "bali volcano",
    features: [
      { icon: <Plane className="w-5 h-5 text-accent"/>, text: "All-inclusive" },
      { icon: <TempleIcon className="w-5 h-5 text-accent"/>, text: "Volcano Sunrise Trek" },
      { icon: <Waves className="w-5 h-5 text-accent"/>, text: "Scuba Diving" },
    ]
  },
];

const PackagesSection = () => (
  <section id="packages" className="w-full py-12 md:py-24 bg-background">
     <div className="container px-4 md:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Curated Travel Packages</h2>
        <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          Hand-picked experiences designed to give you the very best of Bali, hassle-free.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {packages.map((pkg) => (
           <Card key={pkg.title} className="flex flex-col md:flex-row overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
             <Image src={pkg.image} alt={pkg.title} width={600} height={400} className="w-full md:w-1/3 h-64 md:h-auto object-cover" data-ai-hint={pkg.hint}/>
             <div className="flex flex-col p-6 justify-between flex-1">
               <div>
                <CardDescription>{pkg.duration}</CardDescription>
                <CardTitle className="mt-1">{pkg.title}</CardTitle>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {pkg.features.map(feature => (
                    <li key={feature.text} className="flex items-center gap-3">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
               </div>
               <div className="flex items-end justify-between mt-6">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="text-2xl font-bold">{pkg.price}</p>
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Book Now</Button>
               </div>
             </div>
           </Card>
        ))}
      </div>
     </div>
  </section>
);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const ContactSection = () => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  function onSubmit(data: z.infer<typeof contactSchema>) {
    console.log("Form submitted:", data);
    // Here you would typically send the data to a server
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 bg-secondary">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Get in Touch</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a question or ready to plan your trip? Send us a message!
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
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
                      <Input type="email" placeholder="Your Email" {...field} />
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
                      <Textarea placeholder="Your Message" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};


export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <DestinationsSection />
      <PackagesSection />
      <ContactSection />
    </>
  );
}
