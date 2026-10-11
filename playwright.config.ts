import { defineConfig } from "@playwright/test";

const testPort = 4179;
const baseURL = `http://127.0.0.1:${testPort}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL,
    browserName: "chromium",
    headless: true,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `"${process.execPath}" node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port ${testPort}`,
    env: { NIGHTOWL_E2E: "1" },
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
