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

const Header = (): JSX.Element => {
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

export default Header;
