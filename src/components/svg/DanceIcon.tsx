import type { SVGProps } from "react";

export function DanceIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 2a4 4 0 1 0 4 4" />
            <path d="m16 12-4 4-4-4" />
            <path d="m12 16 2.5 5.5" />
            <path d="m8 21.5 2.5-5.5" />
            <path d="M12 12V6a2 2 0 0 1 2-2h4" />
            <path d="M12 12V6a2 2 0 0 0-2-2H6" />
        </svg>
    );
}
