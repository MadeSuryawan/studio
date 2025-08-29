import * as React from "react";
import Image from "next/image";

export default function HeroSection(): React.JSX.Element {
    return (
        <section
            aria-labelledby="hero-heading"
            className="relative isolate w-full h-[80vh] min-h-[480px] -mt-16 sm:-mt-36  pt-16 sm:pt-36 scroll-mt-16 sm:scroll-mt-36"
        >
            <Image
                src="/images/hero/IMG_7508_DxO.webp"
                alt="Bali Kecak Dance in Ululuwatu"
                fill
                className="object-cover object-[center_.9rem]" // Tailwind: move image down
                priority
                sizes="100vw"
                data-ai-hint="bali kecak dance in uluwatu"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#808080] mix-blend-multiply brightness-[.98]" />

            <div className="absolute z-10 grid grid-rows-1 items-center h-auto text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:-translate-y-6 w-full md:w-auto mx-auto">
                <p
                    aria-label="Om Swastyastu"
                    lang="ban-Bali"
                    className="relative font-baliBanat text-5xl md:text-8xl  tracking-widest leading-relaxed text-hero-title pb-4 md:pb-2 will-change:color hover:text-accent hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    ᬒᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ᭟​
                </p>
                <h1
                    id="hero-heading"
                    className="relative text-3xl sm:text-4xl md:text-6xl font-bold tracking-normal lg:leading-relaxed text-hero-title md:translate-y-8"
                >
                    Discover Your Bali Bliss
                </h1>
                <p className="relative text-center max-w-sm md:max-w-screen-md md:mt-4 px-3 mx-auto sm:text-lg md:text-2xl text-hero-title">
                    We craft personalized, unforgettable journeys to the Island
                    of the Gods. Let your story in Bali begin with us.
                </p>
            </div>
        </section>
    );
}
