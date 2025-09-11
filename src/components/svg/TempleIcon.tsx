import type { SVGProps } from "react";

export function TempleIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M8 20V10m8 10V10" />
      <path d="M4 20h16" />
      <path d="M5 10h14" />
      <path d="m9 10-2-3" />
      <path d="m15 10 2-3" />
      <path d="M12 2v5" />
      <path d="M9.5 7.5c.67.89 1.5 1.5 2.5 1.5s1.83-.61 2.5-1.5" />
      <path d="m5 10-1-3" />
      <path d="m19 10 1-3" />
    </svg>
  );
}
