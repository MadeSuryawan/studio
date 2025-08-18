import Link from "next/link";
import { Mountain } from "lucide-react";
import type { JSX } from "react";

export default function Footer(): JSX.Element {
    return (
        <footer className="bg-secondary">
            <div className="container mx-auto py-8 px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Mountain className="h-6 w-6 text-primary" />
                        <span className="text-lg font-bold">
                            BaliBlissed
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} BaliBlissed.
                        All rights reserved.
                    </p>
                    <nav className="flex gap-4 sm:gap-6">
                        <Link
                            href="#"
                            className="text-sm hover:text-primary hover:underline underline-offset-4"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="#"
                            className="text-sm hover:text-primary hover:underline underline-offset-4"
                        >
                            Privacy Policy
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
