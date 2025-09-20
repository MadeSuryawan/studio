// src/app/fastapi-actions.ts
// Description: This file contains actions for interacting with the FastAPI backend.
// It provides a clear separation of concerns, keeping frontend-backend communication
// isolated from the original Genkit-based TypeScript actions.

"use server";

// --- Type Definitions ---

// Defines the structure for the itinerary request, matching the Pydantic model in FastAPI.
// Best practice: Keep frontend and backend models synchronized.
interface ItineraryRequest {
    destination: string;
    duration: number;
    interests: string[];
}

// --- Configuration ---

// The base URL for the FastAPI backend.
// Using an environment variable is recommended for production.
const FASTAPI_BASE_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";

// --- Action to Fetch Itinerary ---

/**
 * Fetches a travel itinerary from the FastAPI backend.
 *
 * @param {ItineraryRequest} data - The user's preferences for the itinerary.
 * @returns {Promise<string>} A promise that resolves to the itinerary string.
 * @throws {Error} If the network request fails or the backend returns an error.
 */
export async function getItineraryFromFastAPI(data: ItineraryRequest): Promise<string> {
    const { destination, duration, interests } = data;
    const endpoint = `${FASTAPI_BASE_URL}/api/suggest-itinerary`;

    console.log(`Fetching itinerary from: ${endpoint}`);

    try {
        // Use the fetch API to make a POST request to the backend.
        // Best practice: Always include appropriate headers and error handling.
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                destination,
                duration,
                interests,
            }),
            // Best practice: Set a timeout for requests to prevent hangs.
            // This requires an AbortController.
        });

        // Error handling: Check if the response was successful.
        if (!response.ok) {
            // Try to parse the error response from the backend for more details.
            const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
            throw new Error(
                `Backend error: ${response.status} ${response.statusText} - ${errorData.detail}`
            );
        }

        // Parse the JSON response and return the itinerary.
        const result = await response.json();
        return result.itinerary;

    } catch (error) {
        console.error("Failed to fetch itinerary from FastAPI:", error);
        // Re-throw the error to be handled by the calling component.
        // This allows for displaying user-friendly error messages in the UI.
        if (error instanceof Error) {
            throw new Error(`Failed to connect to the backend: ${error.message}`);
        }
        throw new Error("An unknown error occurred while fetching the itinerary.");
    }
}
