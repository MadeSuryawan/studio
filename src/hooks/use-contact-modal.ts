// src/hooks/use-contact-modal.ts
import { create } from "zustand";

interface ContactModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

/**
 * Zustand store for managing the state of the contact modal.
 * This provides a simple, global state management solution to
 * open or close the modal from any component.
 */
export const useContactModal = create<ContactModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
