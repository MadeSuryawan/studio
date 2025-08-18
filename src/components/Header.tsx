import Link from "next/link";
import type { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Mountain, Menu } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

export default function Header(): JSX.Element {
    return (
        <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
            <Link
                href="/"
                className="flex items-center justify-center"
                prefetch={false}
            >
                <Mountain className="h-6 w-6 text-primary" />
                <span className="ml-2 text-lg font-bold font-headline">
                    BaliBlissed
                </span>
                <span className="sr-only">BaliBlissed</span>
            </Link>
            <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 items-center">
                <Link
                    href="/"
                    className="text-sm font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
                    prefetch={false}
                >
                    Home
                </Link>
                <Link
                    href="/private-car-charter"
                    className="text-sm font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
                    prefetch={false}
                >
                    Car Charter
                </Link>
                <Link
                    href="/#destinations"
                    className="text-sm font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
                    prefetch={false}
                >
                    Destinations
                </Link>
                <Link
                    href="/#packages"
                    className="text-sm font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
                    prefetch={false}
                >
                    Packages
                </Link>
                <Link
                    href="/#contact"
                    className="text-sm font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
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
                <ThemeSwitcher />
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="ml-auto md:hidden"
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <SheetDescription className="sr-only">
                        Main navigation menu
                    </SheetDescription>
                    <nav className="grid gap-6 text-lg font-medium mt-12">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-semibold"
                            prefetch={false}
                        >
                            <Mountain className="h-6 w-6" />
                            <span className="sr-only">
                                BaliBlissed
                            </span>
                        </Link>
                        <Link
                            href="/"
                            className="text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            Home
                        </Link>
                        <Link
                            href="/private-car-charter"
                            className="text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            Car Charter
                        </Link>
                        <Link
                            href="/#destinations"
                            className="text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            Destinations
                        </Link>
                        <Link
                            href="/#packages"
                            className="text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            Packages
                        </Link>
                        <Link
                            href="/#contact"
                            className="text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            Contact
                        </Link>
                        <div className="absolute bottom-4 left-4">
                            <ThemeSwitcher />
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
}
