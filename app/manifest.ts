import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NightOwl",
    short_name: "NightOwl",
    description: "Plan a campus walk, check in safely, and share community reports.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f8fc",
    theme_color: "#08204b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    ],
  };
}
