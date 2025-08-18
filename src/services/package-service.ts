"use server";

/**
 * @fileOverview A service for retrieving travel package information.
 */

export interface Package {
    title: string;
    duration: string;
    price: number;
    description: string;
    features: string[];
}

// In a real application, this data would likely come from a database or a CMS.
const packages: Package[] = [
    {
        title: "Cultural Heartbeat of Ubud",
        duration: "5 Days / 4 Nights",
        price: 750,
        description:
            "Immerse yourself in the cultural heart of Bali with temple tours, traditional dance, and local crafts.",
        features: ["Temple Tours", "Traditional Dance Show", "Cooking Class"],
    },
    {
        title: "Coastal Vibe & Surf",
        duration: "7 Days / 6 Nights",
        price: 1200,
        description:
            "Catch the perfect wave and soak up the sun on Bali's most beautiful beaches.",
        features: ["Surf Lessons", "Beachfront Villa", "Yoga Sessions"],
    },
    {
        title: "Luxury & Relaxation",
        duration: "4 Days / 3 Nights",
        price: 1500,
        description:
            "Indulge in the ultimate luxury with a 5-star resort stay, private spa treatments, and fine dining.",
        features: ["5-Star Resort", "Private Spa Treatments", "Fine Dining"],
    },
    {
        title: "The Ultimate Bali Adventure",
        duration: "10 Days / 9 Nights",
        price: 2500,
        description:
            "An all-inclusive adventure featuring volcano treks, scuba diving, and exploration of hidden gems.",
        features: ["All-inclusive", "Volcano Sunrise Trek", "Scuba Diving"],
    },
];

/**
 * Retrieves a list of all available travel packages.
 * @returns A promise that resolves to an array of travel packages.
 */
export async function getPackages(): Promise<Package[]> {
    // Simulate a network request delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    return packages;
}
