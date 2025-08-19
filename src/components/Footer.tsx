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
        <footer className="bg-[#212224] text-gray-400">
            <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link
                            href="/"
                            className="flex items-center gap-4 text-white"
                        >
                            <LogoIcon className="h-full w-[96px] md:w-[150px] text-primary" />
                        </Link>
                        <p className="max-w-md text-sm">
                            Crafting personalized and unforgettable travel
                            experiences on the Island of the Gods. Let us help
                            you create your dream Bali vacation.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="font-semibold text-white mb-4">
                            Quick Links
                        </h3>
                        <nav className="flex flex-col gap-2">
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
                    <div className="col-span-1">
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
                        {/* <div className="flex gap-4 mt-6">
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
                        </div> */}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-sm text-center sm:text-left mb-4 sm:mb-0 md:pl-[4rem]">
                        &copy; {new Date().getFullYear()} BaliBlissed. All
                        rights reserved.
                    </p>
                    <nav className="flex gap-4 sm:gap-6 md:pr-[4.9rem]">
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
            </div>
        </footer>
    );
}
