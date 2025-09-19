// src/components/ContactModal.tsx
"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import ContactForm from "./ContactForm";
import { useContactModal } from "@/hooks/use-contact-modal";

/**
 * A modal dialog for the contact form.
 * It uses a global state hook `useContactModal` to control its visibility.
 * This allows any component in the app to open the contact modal.
 */
export function ContactModal() {
    const { isOpen, onClose } = useContactModal();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="sm:max-w-[480px]"
                closeClassName="neumorphic-button-tight scale-[1.2] p-1"
            >
                <DialogHeader>
                    <DialogTitle>Get in Touch</DialogTitle>
                    <DialogDescription>
                        Have a question or ready to plan your trip? Send us a
                        message!
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <ContactForm />
                </div>
            </DialogContent>
        </Dialog>
    );
}
