"use client";

import Link from "next/link";
import * as React from "react";
import type { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription,
} from "@/components/ui/sheet";
import LogoIcon from "@/components/icons/LogoIcon";
import NavbarFlow, {
    FeatureItem,
    HoverLink,
} from "@/components/ui/navbar-flow";
import { scrollToTop } from "@/lib/utils";

const Header1 = (): JSX.Element => {
    const [isMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleLinkClick = (): void => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="px-4 md:px-6 h-12 md:h-16 flex items-center bg-gradient-to-b from-bg-alternate/70 from-10% to-transparent text-foreground/80 sticky fixed top-0 left-0 right-0 backdrop-blur-md fixed z-50 shadow-lg">
            <Link
                href="/"
                className="flex items-center justify-center"
                prefetch={false}
            >
                <LogoIcon className="mt-4 md:mt-5 h-full w-[96px] md:w-[110px] text-primary" />
                <span className="sr-only">BaliBlissed</span>
            </Link>
            <div className="ml-auto flex items-center gap-4">
                <nav className="hidden md:flex gap-4 sm:gap-6 items-center text-base font-semibold">
                    <Link
                        href="/"
                        className="hover:text-primary transition-colors hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Home
                    </Link>
                    <Link
                        href="/private-car-charter"
                        className="hover:text-primary transition-colors hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Car Charter
                    </Link>
                    <Link
                        href="/#destinations"
                        className="hover:text-primary transition-colors hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Destinations
                    </Link>
                    <Link
                        href="/#packages"
                        className="hover:text-primary transition-colors hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Packages
                    </Link>
                    <Link
                        href="/#contact"
                        className="hover:text-primary transition-colors hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Contact
                    </Link>
                </nav>
                <ThemeSwitcher />
                <Sheet open={isMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Mobile Menu</SheetTitle>
                            <SheetDescription>
                                Navigation links for the BaliBlissed website.
                            </SheetDescription>
                        </SheetHeader>
                        <nav className="grid max-w-[16rem] gap-8 text-lg font-semibold mt-4">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-lg font-semibold"
                                prefetch={false}
                                onClick={handleLinkClick}
                            >
                                <LogoIcon className="h-full w-28 mb-12" />
                                <span className="sr-only">BaliBlissed</span>
                            </Link>
                            <Link
                                href="/"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                                onClick={handleLinkClick}
                            >
                                Home
                            </Link>
                            <Link
                                href="/private-car-charter"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                                onClick={handleLinkClick}
                            >
                                Car Charter
                            </Link>
                            <Link
                                href="/#destinations"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                                onClick={handleLinkClick}
                            >
                                Destinations
                            </Link>
                            <Link
                                href="/#packages"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                                onClick={handleLinkClick}
                            >
                                Packages
                            </Link>
                            <Link
                                href="/#contact"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                                onClick={handleLinkClick}
                            >
                                Contact
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

const Header = (): JSX.Element => {
    const navLinks = React.useMemo(
        () => [
            // {
            //     text: "Navigation",
            //     submenu: (
            //         <div className="flex flex-col space-y-2 bg-gradient-to-b from-bg-alternate/70 to-transparent text-foreground/80">
            //             <HoverLink url="/">Home</HoverLink>
            //             <HoverLink url="/private-car-charter">
            //                 Car Charter
            //             </HoverLink>
            //             <HoverLink url="/#destinations">Destinations</HoverLink>
            //             <HoverLink url="/#packages">Packages</HoverLink>
            //             <HoverLink url="/#contact">Contact</HoverLink>
            //         </div>
            //     ),
            // },
            // {
            //     text: "Templates",
            //     submenu: (
            //         <div className="grid grid-cols-1 gap-2 w-48">
            //             <FeatureItem
            //                 heading="Portfolio Template"
            //                 url="/templates/portfolio"
            //                 info="Clean, personal showcase for designers & developers."
            //             />
            //             <FeatureItem
            //                 heading="Business Template"
            //                 url="/templates/business"
            //                 info="Professional website layout for startups & businesses."
            //             />
            //             <FeatureItem
            //                 heading="Blog Template"
            //                 url="/templates/blog"
            //                 info="Minimal blog with modern reading experience."
            //             />
            //             <FeatureItem
            //                 heading="Landing Page"
            //                 url="/templates/landing"
            //                 info="High-converting landing page for product launches."
            //             />
            //         </div>
            //     ),
            // },
            // {
            //     text: "Showcase",
            //     submenu: (
            //         <div className="flex flex-col space-y-2">
            //             <HoverLink url="/showcase/astroship">
            //                 Astroship
            //             </HoverLink>
            //             <HoverLink url="/showcase/papermod">PaperMod</HoverLink>
            //             <HoverLink url="/showcase/satori">Satori</HoverLink>
            //             <HoverLink url="/showcase/scrollx">ScrollX</HoverLink>
            //             <HoverLink url="/showcase/speedyfolio">
            //                 Speedyfolio
            //             </HoverLink>
            //         </div>
            //     ),
            // },
            { text: "Home", url: "/" },
            { text: "Car Charter", url: "/private-car-charter" },
            { text: "Destinations", url: "/#destinations" },
            { text: "Packages", url: "/#packages" },
            { text: "Contact", url: "/#contact" },
        ],
        [],
    );

    return (
        <NavbarFlow
            styleName="bg-gradient-to-b from-bg-alternate/70 from-10% to-transparent text-foreground/80 h-12 md:h-16"
            emblem={
                <>
                    <LogoIcon
                        role="button"
                        className="mt-3 md:mt-5 h-full w-[96px] md:w-[110px]"
                        aria-label="BaliBlissed Home Page"
                        onClick={scrollToTop}
                    />
                    <span className="sr-only">BaliBlissed Home Page</span>
                </>
            }
            links={navLinks}
            rightComponent={
                <div className="flex items-center justify-center mt-2">
                    <ThemeSwitcher />
                </div>
            }
        />
    );
};

export default Header;
