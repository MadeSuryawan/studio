
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, ShieldCheck, Clock, UserCheck, Car, Users } from "lucide-react"

const includedFeatures = [
    { icon: <Car className="w-5 h-5 text-accent"/>, text: "Modern, air-conditioned vehicle" },
    { icon: <UserCheck className="w-5 h-5 text-accent"/>, text: "Experienced English-speaking driver" },
    { icon: <Users className="w-5 h-5 text-accent"/>, text: "Up to 5 passengers (more on request)" },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M14 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"></path><path d="M20 12H8"></path><path d="m18 10 2 2-2 2"></path></svg>, text: "Petrol and parking fees included" },
];

const pricingTiers = [
    { duration: "Half Day", hours: "Up to 6 hours", price: "IDR 450,000", priceUsd: "~$30 USD" },
    { duration: "Full Day", hours: "Up to 10 hours", price: "IDR 650,000", priceUsd: "~$45 USD" },
    { duration: "Overtime", hours: "Per extra hour", price: "IDR 75,000", priceUsd: "~$5 USD" },
];

export default function PrivateCarCharterPage(): React.JSX.Element {
  return (
    <div className="bg-background">
      <section className="relative w-full h-[50vh] min-h-[300px]">
        <Image
          src="https://placehold.co/1600x800.png"
          alt="A scenic road in Bali with a car"
          fill
          className="object-cover brightness-50"
          priority
          data-ai-hint="car driving bali"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline">Private Car Charter</h1>
          <p className="max-w-2xl mt-4 text-lg md:text-xl text-primary-foreground/90">
            Your personal key to unlocking the best of Bali, with complete freedom and comfort.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Discover Bali on Your Own Terms</h2>
                    <p className="text-muted-foreground md:text-lg">
                        Forget the rigid schedules of group tours and the hassle of navigating unfamiliar roads. With our private car charter service, you have the freedom to explore Bali at your own pace. 
                    </p>
                    <p className="text-muted-foreground md:text-lg">
                        Your professional, English-speaking driver will take you wherever you want to go, from the iconic temples and terraced rice paddies to hidden beaches and local villages. Just sit back, relax, and enjoy the journey in your private, air-conditioned vehicle.
                    </p>
                     <Button asChild size="lg" className="mt-4">
                        <Link href="/#contact">Book Your Car Now</Link>
                    </Button>
                </div>
                <div>
                    <Image
                        src="https://placehold.co/600x600.png"
                        alt="Happy tourists in a car in Bali"
                        width={600}
                        height={600}
                        className="rounded-xl shadow-lg"
                        data-ai-hint="tourists car bali"
                    />
                </div>
            </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">What&apos;s Included</h2>
                <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed mt-4">
                    We provide a comprehensive service to ensure your trip is seamless and enjoyable.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {includedFeatures.map((feature, index) => (
                <Card key={index} className="text-center p-6 flex flex-col items-center">
                    <div className="mb-4">{feature.icon}</div>
                    <p className="font-medium">{feature.text}</p>
                </Card>
                ))}
            </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Simple, Transparent Pricing</h2>
                 <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed mt-4">
                    No hidden fees. Choose the plan that works best for your adventure.
                </p>
            </div>
            <Card className="max-w-2xl mx-auto shadow-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40%]">Charter Type</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pricingTiers.map((tier) => (
                        <TableRow key={tier.duration}>
                            <TableCell className="font-medium">{tier.duration}</TableCell>
                            <TableCell>{tier.hours}</TableCell>
                            <TableCell className="text-right">
                                <div>{tier.price}</div>
                                <div className="text-xs text-muted-foreground">{tier.priceUsd}</div>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
             <div className="text-center mt-8 text-sm text-muted-foreground">
                <p>* Prices are per car, not per person. Contact us for larger groups or special requests.</p>
            </div>
        </div>
      </section>

       <section className="py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
             <h2 className="text-3xl font-bold tracking-tighter font-headline">Ready to Explore?</h2>
              <p className="mx-auto max-w-3xl md:text-xl/relaxed mt-4">
                    Let us be your guide to the wonders of Bali. Book your private car charter today!
                </p>
                <div className="mt-8">
                     <Button asChild size="lg" variant="secondary">
                        <Link href="/#contact">Send Booking Request</Link>
                    </Button>
                </div>
        </div>
      </section>

    </div>
  );
}
