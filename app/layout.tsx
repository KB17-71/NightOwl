import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./impact.css";
import "leaflet/dist/leaflet.css";
import "./gsu-theme.css";
import "./safe-area.css";
import { AppProvider } from "@/components/AppProvider";
import { Shell } from "@/components/Shell";
export const metadata: Metadata = {
  title: "NightOwl — Campus Safety, Together",
  description: "Your walk. Your people. Your peace of mind.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NightOwl",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08204b",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><AppProvider><Shell>{children}</Shell></AppProvider></body></html>; }
