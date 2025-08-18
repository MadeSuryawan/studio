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
    SheetDescription
} from "@/components/ui/sheet";
import LogoIcon from "./LogoIcon";

export default function Header(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="px-4 lg:px-6 h-16 flex items-center bg-special-card-bg text-foreground sticky top-0 z-40 border-b">
            <Link
                href="/"
                className="flex items-center justify-center"
                prefetch={false}
            >
                <LogoIcon className="mt-2 md:mt-5 h-full w-[96px] md:w-[110px] text-primary" />
                <span className="sr-only">BaliBlissed</span>
            </Link>
            <div className="ml-auto flex items-center gap-4">
                <nav className="hidden md:flex gap-4 sm:gap-6 items-center">
                    <Link
                        href="/"
                        className="text-md font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Home
                    </Link>
                    <Link
                        href="/private-car-charter"
                        className="text-md font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Car Charter
                    </Link>
                    <Link
                        href="/#destinations"
                        className="text-md font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Destinations
                    </Link>
                    <Link
                        href="/#packages"
                        className="text-md font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Packages
                    </Link>
                    <Link
                        href="/#contact"
                        className="text-md font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Contact
                    </Link>
                    <Button
                        asChild
                        className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                        <Link href="/#contact" prefetch={false}>
                            Book Now
                        </Link>
                    </Button>
                </nav>
                <ThemeSwitcher />
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Mobile Menu</SheetTitle>
                            <SheetDescription>
                                Navigation links for the BaliBlissed website.
                            </SheetDescription>
                        </SheetHeader>
                        <nav className="grid max-w-4 gap-8 text-lg font-medium mt-4">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-lg font-semibold"
                                prefetch={false}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LogoIcon className="h-full w-28 mb-12" />
                                <span className="sr-only">BaliBlissed</span>
                            </Link>
                            <Link
                                href="/"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/private-car-charter"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Car Charter
                            </Link>
                            <Link
                                href="/#destinations"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Destinations
                            </Link>
                            <Link
                                href="/#packages"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Packages
                            </Link>
                            <Link
                                href="/#contact"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}