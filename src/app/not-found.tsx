import Link from "next/link";
import type { JSX } from "react";

import { Button } from "@/components/ui/button";

export default function NotFound(): JSX.Element {
    return (
        <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-col items-center justify-center bg-background px-4 text-center">
            <div className="space-y-4">
                <h1 className="text-8xl font-bold tracking-lighter text-primary">
                    404
                </h1>
                <p className="mx-auto max-w-md text-xl text-muted-foreground">
                    Oops! The page you&apos;re looking for seems to have gotten
                    lost.
                </p>
                <p className="mx-auto max-w-md text-muted-foreground">
                    Let&apos;s get you back on track.
                </p>
                <Button asChild>
                    <Link href="/">Return to Homepage</Link>
                </Button>
            </div>
        </div>
    );
}
