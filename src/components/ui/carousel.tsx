import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./pagination";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
}

interface CarouselContentProps {
    children?: React.ReactNode;
    paginationMt?: string;
}

interface CarouselItemProps {
    children?: React.ReactNode;
}

interface CarouselControlProps {
    onClick?: () => void;
    disabled?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
};

export const CarouselContent: React.FC<CarouselContentProps> = ({
    children,
    paginationMt: paginationMt = "mt-24",
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);
    const totalCards = childrenArray.length;

    const goNext = () => {
        if (activeIndex < totalCards - 1) {
            setActiveIndex((prev) => prev + 1);
        }
    };

    const goPrevious = () => {
        if (activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
        }
    };

    const goToIndex = (index: number) => {
        if (index >= 0 && index < totalCards) {
            setActiveIndex(index);
        }
    };

    // Build all remaining cards from the activeIndex
    const visibleCards = childrenArray.slice(activeIndex).map((content, i) => ({
        content,
        index: activeIndex + i,
    }));
    const visibleCount = visibleCards.length;

    return (
        <div className="w-full">
            <div className="relative h-80">
                {visibleCards.map((card, stackIndex) => (
                    <div
                        key={card.index}
                        className="absolute w-full transition-all duration-300 ease-in-out"
                        style={{
                            zIndex: visibleCount - stackIndex,
                            top: `${stackIndex * 20}px`,
                            opacity: 1 - stackIndex * 0.15,
                            transform: `scale(${Math.max(0.5, 1 - stackIndex * 0.05)})`,
                        }}
                    >
                        {card.content}
                    </div>
                ))}
            </div>

            <Pagination className={`${paginationMt} scale-[1.2]`}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            aria-disabled={activeIndex === 0}
                            className={
                                activeIndex === 0
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                goPrevious();
                            }}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalCards }).map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                href="#"
                                isActive={i === activeIndex}
                                onClick={(e) => {
                                    e.preventDefault();
                                    goToIndex(i);
                                }}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            aria-disabled={activeIndex >= totalCards - 1}
                            className={
                                activeIndex >= totalCards - 1
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                goNext();
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
    return <>{children}</>;
};

export const CarouselPrevious: React.FC<CarouselControlProps> = ({
    onClick,
    disabled,
}) => {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            variant="outline"
            size="icon"
            className="rounded-full mt-3 scale-[1.1] bg-bg-alternate text-special-card-fg border-accent"
        >
            <ChevronUp className="h-4 w-4" />
            <span className="sr-only">Previous card</span>
        </Button>
    );
};

export const CarouselNext: React.FC<CarouselControlProps> = ({
    onClick,
    disabled,
}) => {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            variant="outline"
            size="icon"
            className="rounded-full mt-3 scale-[1.1] bg-bg-alternate text-special-card-fg border-accent"
        >
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Next card</span>
        </Button>
    );
};
