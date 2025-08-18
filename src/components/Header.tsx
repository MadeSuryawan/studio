import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mountain } from 'lucide-react';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Mountain className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold font-headline">BaliBlissed Journeys</span>
        <span className="sr-only">BaliBlissed Journeys</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link href="#destinations" className="text-sm font-medium hover:text-primary transition-colors hover:underline underline-offset-4" prefetch={false}>
          Destinations
        </Link>
        <Link href="#packages" className="text-sm font-medium hover:text-primary transition-colors hover:underline underline-offset-4" prefetch={false}>
          Packages
        </Link>
        <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
         <Button asChild className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="#contact" prefetch={false}>
            Book Now
          </Link>
        </Button>
      </nav>
    </header>
  );
}
