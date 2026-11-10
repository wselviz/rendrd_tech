import type { Metadata } from "next";
export const metadata: Metadata = { title: "Three motion directions", robots: { index: false, follow: false } };
export default function DirectionsLayout({ children }: { children: React.ReactNode }) { return children; }
