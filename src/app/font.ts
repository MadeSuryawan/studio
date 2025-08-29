import localFont from "next/font/local";

export const baliBanat = localFont({
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
