// src/app/font.ts

import localFont from "next/font/local";
import { PT_Sans } from "next/font/google";

export const ptSans = PT_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
    variable: "--font-pt-sans",
});

export const balibanat = localFont({
    src: [
        {
            path: "../../public/fonts/bali-banat.woff2",
            weight: "400",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-bali-banat",
});

export const mangusastra = localFont({
    src: [
        {
            path: "../../public/fonts/mangusastra.woff2",
            weight: "400",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-mangusastra",
});
