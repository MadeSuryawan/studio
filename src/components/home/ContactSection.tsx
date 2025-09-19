// src/components/home/ContactSection.tsx
"use client";

import { type JSX } from "react";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { cn } from "@/lib/utils";

/**
 * Section wrapper for the contact form on the homepage.
 * It provides the title and description for the section and
 * dynamically loads the ContactForm component.
 */
const ContactSection = (): JSX.Element => {
    return (
        <section id="contact">
            <div
                className={cn(
                    "container flex flex-col justify-center",
                    "gap-4 px-4 text-center md:px-6 z-10",
                    "md:max-w-screen-md",
                    "mx-auto",
                )}
            >
                <div className="space-y-3 bg-blue-400/0">
                    <h2
                        className={cn(
                            "text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline",
                            "text-special-card-fg",
                        )}
                    >
                        Get in Touch
                    </h2>
                    <p
                        className={cn(
                            "mx-auto max-w-[600px] text-muted-foreground",
                            "md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed",
                            "md:tracking-wide",
                        )}
                    >
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
};

export default ContactSection;
