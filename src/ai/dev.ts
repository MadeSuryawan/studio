import { config } from "dotenv";
config();

import "@/ai/flows/suggest-itinerary.ts";
import "@/ai/flows/answer-query.ts";
import "@/ai/flows/handle-contact-inquiry.ts";
