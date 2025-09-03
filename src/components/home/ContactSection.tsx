// src/components/home/ContactSection.tsx
"use client";

import * as React from "react";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

/**
 * Section wrapper for the contact form on the homepage.
 * It provides the title and description for the section and
 * dynamically loads the ContactForm component.
 */
export default function ContactSection(): React.JSX.Element {
    return (
        <section id="contact" className="relative w-full pb-16">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 z-10">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline">
                        Get in Touch
                    </h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Have a question or ready to plan your trip? Send us a
                        message!
                    </p>
                </div>
                {/* Use Suspense for client-side form rendering */}
                <Suspense fallback={<div>Loading form...</div>}>
                    <ContactForm />
                </Suspense>
            </div>
        </section>
    );
}
