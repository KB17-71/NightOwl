import type { NextConfig } from "next";
const mobileExportConfig: NextConfig = process.env.NIGHTOWL_MOBILE_EXPORT === "1"
  ? { output: "export", trailingSlash: true, distDir: ".next-mobile" }
  : process.env.NIGHTOWL_E2E === "1"
    ? { distDir: ".next-e2e" }
    : {};
const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...mobileExportConfig,
};
export default nextConfig;
