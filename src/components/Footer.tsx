import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import type { JSX } from "react";
import { WHATSAPP_NUMBER } from "@/lib/config";
import LogoIcon from "@/components/icons/LogoIcon";

const SocialLink = ({
    href,
    children,
    "aria-label": ariaLabel,
}: {
    href: string;
    children: React.ReactNode;
    "aria-label": string;
}) => (
    <Link
        href={href}
        className="text-gray-400 hover:text-white transition-colors"
        aria-label={ariaLabel}
    >
        {children}
    </Link>
);

export default function Footer(): JSX.Element {
    return (
        <footer
            className="container px-4 md:px-6 py-3 md:py-7 bg-[#212224] text-gray-300"
            style={{
                backgroundImage: `linear-gradient(rgba(35, 37, 39, 0.97), rgba(29, 31, 32, 0.97)), url('/images/footer/ruben-hutabarat-VvJ0DL_PLR8-unsplash.webp')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "brightness(0.78)",
            }}
        >
            <div className="grid grid-row md:grid-cols-4">
                {/* Company Info */}
                <div className="grid grid-rows-2 mb-4 md:mb-0 md:col-span-3 md:gap-4">
                    <Link href="/">
                        <LogoIcon className="relative h-full w-[96px] md:w-[150px] left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0" />
                    </Link>
                    <p className="max-w-sm text-sm pb-4 text-center md:text-left md:max-w-md">
                        Crafting personalized and unforgettable travel
                        experiences on the Island of the Gods. Let us help you
                        create your dream Bali vacation.
                    </p>
                </div>
                <div className="flex flex-cols-2 justify-between">
                    {/* Quick Links */}
                    <div className="md:-translate-x-32">
                        <h3 className="font-semibold text-white mb-4">
                            Quick Links
                        </h3>
                        <nav className="flex flex-col gap-2 pb-4">
                            <Link
                                href="/"
                                className="text-sm hover:text-white hover:underline underline-offset-4"
                            >
                                Home
                            </Link>
                            <Link
                                href="/private-car-charter"
                                className="text-sm hover:text-white hover:underline underline-offset-4"
                            >
                                Car Charter
                            </Link>
                            <Link
                                href="/#destinations"
                                className="text-sm hover:text-white hover:underline underline-offset-4"
                            >
                                Destinations
                            </Link>
                            <Link
                                href="/#packages"
                                className="text-sm hover:text-white hover:underline underline-offset-4"
                            >
                                Packages
                            </Link>
                            <Link
                                href="/#contact"
                                className="text-sm hover:text-white hover:underline underline-offset-4"
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                    {/* Contact & Socials */}
                    <div className="md:-translate-x-12">
                        <h3 className="font-semibold text-white mb-4">
                            Contact Us
                        </h3>
                        <div className="space-y-2 text-sm">
                            <p>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    className="hover:text-white hover:underline"
                                >
                                    WhatsApp: +{WHATSAPP_NUMBER}
                                </a>
                            </p>
                            <p>
                                <a
                                    href="mailto:hello@baliblissed.com"
                                    className="hover:text-white hover:underline"
                                >
                                    hello@baliblissed.com
                                </a>
                            </p>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <SocialLink
                                href="#"
                                aria-label="Follow us on Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </SocialLink>
                            <SocialLink
                                href="#"
                                aria-label="Follow us on Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </SocialLink>
                            <SocialLink
                                href="#"
                                aria-label="Follow us on Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </SocialLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-4 md:pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between">
                <p className="text-sm text-center md:text-left mb-2 md:mb-0 md:pl-16">
                    &copy; {new Date().getFullYear()} BaliBlissed. All rights
                    reserved.
                </p>

                <nav className="flex gap-4 md:gap-7 md:pr-24">
                    <Link
                        href="#"
                        className="text-sm hover:text-white hover:underline underline-offset-4"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="#"
                        className="text-sm hover:text-white hover:underline underline-offset-4"
                    >
                        Terms of Service
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
