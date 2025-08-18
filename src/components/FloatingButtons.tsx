"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, MessageSquare, Phone } from 'lucide-react';
import AIAssistant from './AIAssistant';

const WhatsAppIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.89-5.451 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.225 4.485 4.67-1.241z"/>
    </svg>
)


export default function FloatingButtons(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (): void => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center gap-3 z-50">
        {isVisible && (
            <Button
                size="icon"
                className="h-14 w-14 rounded-full shadow-lg bg-background text-foreground hover:bg-background/90 border"
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <ArrowUp className="h-6 w-6" />
            </Button>
        )}
        <Button
            size="icon"
            asChild
            className="h-14 w-14 rounded-full shadow-lg bg-green-500 text-white hover:bg-green-600"
            aria-label="Contact on WhatsApp"
        >
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
            </a>
        </Button>
        <AIAssistant />
    </div>
  );
}
