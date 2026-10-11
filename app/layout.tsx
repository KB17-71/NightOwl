import type { Metadata } from "next";
import "./globals.css";
import "./impact.css";
import "leaflet/dist/leaflet.css";
import "./gsu-theme.css";
import { AppProvider } from "@/components/AppProvider";
import { Shell } from "@/components/Shell";
export const metadata: Metadata = { title: "NightOwl — Campus Safety, Together", description: "Your walk. Your people. Your peace of mind." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><AppProvider><Shell>{children}</Shell></AppProvider></body></html>; }
