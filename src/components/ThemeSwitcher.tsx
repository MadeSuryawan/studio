"use client";

import * as React from "react";
import { Moon, Sun, Laptop2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
export function ThemeSwitcher(): React.JSX.Element {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                        "aspect-square",
                        "h-full w-9 md:w-11",
                        "neumorphic-button",
                        "focus:ring-0 focus:ring-offset-0",
                    )}
                >
                    <Sun
                        className={cn(
                            "h-[1.2rem] w-[1.2rem] rotate-0 scale-[1.3]",
                            "md:scale-[1.5] transition-all dark:-rotate-90 dark:scale-0",
                        )}
                    />
                    <Moon
                        className={cn(
                            "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all",
                            "dark:rotate-0 dark:scale-[1.3] md:dark:scale-[1.4]",
                        )}
                    />
                    {/* <Laptop2
                        className={cn(
                            "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0",
                            "transition-all dark:rotate-0 dark:scale-[1.1] md:dark:scale-[1.3]",
                        )}
                    /> */}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                className={cn(
                    "bg-gray-100/30 dark:bg-gray-800/30",
                    "py-2 px-3",
                    "grid grid-flow-row space-y-2",
                    "backdrop-blur-md",
                    "items-center justify-center",
                    "min-w-fit font-semibold",
                )}
            >
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className={cn(
                        "border-b border-gray-500",
                        "dark:hover:bg-slate-500",
                    )}
                >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className={cn(
                        "border-b border-gray-500",
                        "hover:bg-white dark:hover:bg-slate-500",
                    )}
                >
                    Dark
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
