// src/components/Footer.tsx
"use client";
import Link from "next/link";
import type { JSX } from "react";
import { WHATSAPP_NUMBER } from "@/lib/config";
import LogoIcon from "@/components/svg/LogoIcon";
import { ScrollToTop } from "@/lib/utils";
import { useContactModal } from "@/hooks/use-contact-modal";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

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
    const contactModal = useContactModal();
    const pathname = usePathname();

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // If not on the homepage, prevent default and open modal
        if (pathname !== "/") {
            e.preventDefault();
            contactModal.onOpen();
        }
        // On homepage, let the default anchor behavior (#contact) work
    };

    return (
        <footer
            className={cn(
                "relative",
                "py-3 md:py-8",
                "rounded-t-xl",
                "bg-[#212224]",
                "overflow-hidden",
                "text-white/70",
            )}
        >
            <div
                className={cn(
                    "absolute inset-0",
                    "bg-cover bg-center bg-no-repeat",
                    "dark:brightness-[.51]",
                    "brightness-[1]",
                    "blur-[6px]",
                    `bg-[url(/images/footer/ruben-hutabarat-VvJ0DL_PLR8-unsplash.webp)]`,
                    "mix-blend-screen",
                    "pointer-events-none",
                )}
            />
            <div
                className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-b dark:from-[#191b1c] dark:via-[#17191a] from 60% dark:to-[#131516]",
                    "bg-gradient-to-b from-[#1e2022] via-[#1d2021] from 60% to-[#131416]",
                    "opacity-[.93]",
                    "pointer-events-none",
                )}
            />
            <div className="relative flex flex-col justify-start items-center content-start px-4 z-10">
                {/* Top */}
                <div className="size-full self-center">
                    <div className="container grid grid-row md:grid-cols-4">
                        {/* Company Info */}
                        <div className="grid grid-rows-2 mb-4 md:mb-0 md:col-span-3 md:gap-4">
                            <div className="flex flex-row items-start justify-between md:justify-start h-auto gap-12">
                                <LogoIcon
                                    role="button"
                                    onClick={ScrollToTop}
                                    className={cn(
                                        "relative h-full w-[90px] md:w-[100px]",
                                        "md:left-0 md:translate-x-0",
                                    )}
                                />
                                <h3
                                    className={cn(
                                        "text-balibanat text-2xl md:text-3xl",
                                        "will-change:[color,transform]",
                                        "hover:text-accent hover:scale-105 pt-2 md:pt-0",
                                        "transition-all duration-300 ease-in-out",
                                        "top-1/2 translate-y-1/4 md:translate-y-1/2 ",
                                    )}
                                    aria-label="Thank You"
                                >
                                    ᬫᬵᬢᬸᬃᬲᬸᬓ᭄ᬱ᭄ᬫ
                                </h3>
                            </div>
                            <p className="max-w-sm text-sm pb-4 text-center md:text-left md:max-w-md">
                                Crafting personalized and unforgettable travel
                                experiences on the Island of the Gods. Let us
                                help you create your dream Bali vacation.
                            </p>
                        </div>
                        <div className="flex flex-cols-2 justify-between">
                            {/* Quick Links */}
                            <div className="md:-translate-x-32">
                                <h3 className="font-semibold mb-4">
                                    Quick Links
                                </h3>
                                <nav className="flex flex-col gap-2 pb-4 text-center">
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
                                        className="text-sm hover:text-white hover:underline underline-offset-4 cursor-pointer"
                                        onClick={handleContactClick}
                                    >
                                        Contact
                                    </Link>
                                </nav>
                            </div>
                            {/* Contact & Socials */}
                            <div className="flex flex-col md:-translate-x-12 justify-start items-end">
                                <h3 className="font-semibold mb-4">
                                    Contact Us
                                </h3>
                                <div className="space-y-2 text-sm text-right">
                                    <p>
                                        <Link
                                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                            className="hover:text-white hover:underline"
                                        >
                                            WhatsApp: +{WHATSAPP_NUMBER}
                                        </Link>
                                    </p>
                                    <p>
                                        <Link
                                            href="mailto:hello@baliblissed.com"
                                            className="hover:text-white hover:underline"
                                        >
                                            hello@baliblissed.com
                                        </Link>
                                    </p>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <SocialLink
                                        href="#"
                                        aria-label="Follow us on Facebook"
                                    >
                                        <FontAwesomeIcon
                                            icon={faFacebookSquare}
                                            className="w-5 h-5 icon-shadow-lg"
                                            title="Follow us on Facebook"
                                        />
                                    </SocialLink>
                                    <SocialLink
                                        href="#"
                                        aria-label="Follow us on Instagram"
                                    >
                                        <FontAwesomeIcon
                                            icon={faInstagram}
                                            className="w-5 h-5 icon-shadow-lg"
                                            title="Follow us on Instagram"
                                        />
                                    </SocialLink>
                                    <SocialLink
                                        href="#"
                                        aria-label="Follow us on Twitter"
                                    >
                                        <FontAwesomeIcon
                                            icon={faXTwitter}
                                            className="w-5 h-5 icon-shadow-lg"
                                            title="Follow us on X"
                                        />
                                    </SocialLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="size-full self-center">
                    <div
                        className={cn(
                            "pt-4 md:pt-8 border-t border-gray-700",
                            "flex flex-col md:flex-row items-center justify-between",
                            "rounded-xl",
                            "text-sm",
                        )}
                    >
                        <p
                            className={cn(
                                "text-center md:text-left",
                                "mb-2 md:mb-0 md:ml-20",
                                "w-fit",
                            )}
                        >
                            &copy; {new Date().getFullYear()} BaliBlissed. All
                            rights reserved.
                        </p>

                        <nav
                            className={cn(
                                "flex flex-row items-center",
                                "gap-4 md:gap-7 md:mr-24",
                                "w-fit",
                            )}
                        >
                            <Link
                                href="#"
                                className="hover:text-white hover:underline underline-offset-4"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#"
                                className="hover:text-white hover:underline underline-offset-4"
                            >
                                Terms of Service
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}
