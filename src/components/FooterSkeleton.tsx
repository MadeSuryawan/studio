// src/components/FooterSkeleton.tsx
import { cn } from "@/lib/utils";

/**
 * Skeleton component for the Footer to prevent layout shift during loading
 * Provides a placeholder with similar dimensions to the actual footer
 */
export default function FooterSkeleton() {
    return (
        <footer
            className={cn(
                "relative",
                "py-3 md:py-8",
                "rounded-xl",
                "bg-gray-200 dark:bg-gray-800",
                "overflow-hidden",
                "animate-pulse",
                "min-h-[200px]",
            )}
            aria-label="Loading footer content"
        >
            <div className="relative flex flex-col justify-start items-center content-start z-10">
                {/* Top Section Skeleton */}
                <div className="size-full self-center">
                    <div className="container grid grid-row md:grid-cols-4">
                        {/* Company Info Skeleton */}
                        <div className="grid grid-rows-2 mb-4 md:mb-0 md:col-span-3 md:gap-4">
                            <div className="flex flex-row items-start justify-between md:justify-start h-auto gap-12">
                                {/* Logo Skeleton */}
                                <div className="h-12 w-24 md:w-30 bg-gray-300 dark:bg-gray-700 rounded" />
                                {/* Title Skeleton */}
                                <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded mt-2" />
                            </div>
                            
                            {/* Navigation Skeleton */}
                            <div className="flex flex-col md:flex-row justify-start items-start md:items-end gap-4 md:gap-8">
                                <div className="flex flex-col space-y-2">
                                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                                    <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
                                    <div className="h-3 w-18 bg-gray-300 dark:bg-gray-700 rounded" />
                                    <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Contact & Socials Skeleton */}
                        <div className="flex flex-col justify-start items-end">
                            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
                            <div className="space-y-2 text-right">
                                <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                                <div className="h-3 w-28 bg-gray-300 dark:bg-gray-700 rounded" />
                                <div className="flex justify-end gap-2 mt-4">
                                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
                                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
                                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section Skeleton */}
                <div className="size-full self-center mt-8">
                    <div className="pt-4 md:pt-8 border-t border-gray-300 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="h-3 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2 md:mb-0" />
                            <div className="flex gap-4">
                                <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
                                <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
