import { expect, test, type Page } from "@playwright/test";

async function planAndStartWalk(page: Page, destination: string, shareWithMaya: boolean) {
  await page.goto("/walk");
  await page.getByLabel("Starting point").fill("Student Center");
  await page.getByLabel("Destination").fill(destination);

  const maya = page.getByRole("checkbox", { name: /Maya Chen/ });
  if (shareWithMaya) {
    await maya.check();
  } else {
    await maya.uncheck();
  }

  await page.getByRole("button", { name: "Review my walk" }).click();
  await expect(page.getByRole("heading", { name: "Take a quick look." })).toBeVisible();
  await expect(page.getByText(shareWithMaya ? "1 contact(s) selected" : "Private walk")).toBeVisible();
  await page.getByRole("button", { name: "Start my walk" }).click();
}

test("shared walk, overdue check-in, private preview, and cancellation work end to end", async ({ page }) => {
  await planAndStartWalk(page, "Library Plaza", true);
  await expect(page.getByRole("heading", { name: "You’re on your way." })).toBeVisible();

  await page.getByRole("button", { name: "Open contact preview" }).click();
  await expect(page.getByRole("heading", { name: "Alex Morgan is on a walk" })).toBeVisible();
  await expect(page.getByText("Library Plaza", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: /simulate overdue check-in/i }).click();
  await expect(page.getByRole("heading", { name: "How are you doing?" })).toBeVisible();
  await expect(page.getByText(/No one has been contacted\./)).toBeVisible();
  await page.getByRole("button", { name: "I Arrived Safely" }).click();

  await expect(page.getByRole("heading", { name: "Recent completed walks" })).toBeVisible();
  await expect(page.getByText("Trusted contact view")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Alex Morgan arrived safely" })).toBeVisible();

  await planAndStartWalk(page, "Aderhold Learning Center", false);
  await expect(page.getByText("No one (private)")).toBeVisible();
  await expect(page.getByRole("button", { name: "Open contact preview" })).toHaveCount(0);
  await expect(page.getByText("PRIVATE PREVIEW")).toHaveCount(0);
  await page.getByRole("button", { name: "I Arrived Safely" }).click();

  await expect(page.getByRole("heading", { name: "Recent completed walks" })).toBeVisible();
  await expect(page.getByText("Trusted contact view")).toHaveCount(0);
  await expect(page.getByText("PRIVATE PREVIEW")).toHaveCount(0);

  await planAndStartWalk(page, "Student Center Annex", false);
  await page.getByRole("button", { name: "Cancel walk" }).click();
  await expect(page.getByText("Walk cancelled.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "You’re on your way." })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Recent completed walks" })).toBeVisible();
  await expect(page.getByText("Student Center Annex", { exact: true })).toHaveCount(0);
});

test("Reset demo restores samples and clears reports added by the user and walk history", async ({ page }) => {
  await page.goto("/contacts");
  await page.getByLabel("Display name").fill("Test Contact");
  await page.getByRole("button", { name: "Add contact" }).click();
  await expect(page.getByRole("heading", { name: "3 trusted contacts" })).toBeVisible();

  await page.goto("/report");
  await page.getByLabel("Description").fill("Uneven pavement beside the test building");
  await page.getByRole("button", { name: "Submit community report" }).click();
  await expect(page.getByText("Your community report was added as Pending Verification.")).toBeVisible();
  await page.goto("/");
  const impactBeforeReset = page.getByRole("region", { name: "Community Impact" });
  await expect(impactBeforeReset.getByText("4", { exact: true })).toBeVisible();
  await expect(impactBeforeReset.getByText("3", { exact: true })).toBeVisible();

  await planAndStartWalk(page, "Library Plaza", false);
  await page.getByRole("button", { name: "I Arrived Safely" }).click();
  await expect(page.getByRole("heading", { name: "Recent completed walks" })).toBeVisible();

  await page.goto("/contacts");
  await page.getByRole("button", { name: "Reset demo" }).click();
  const confirmation = page.getByRole("group", { name: "Confirm demo data action" });
  await expect(confirmation).toContainText("Restore samples and clear walk history?");
  await confirmation.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByText("Demo restored to sample contacts and reports.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "2 trusted contacts" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Remove Maya Chen" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Remove Jordan Lee" })).toBeVisible();
  await expect(page.getByText("DEMO", { exact: true })).toHaveCount(2);

  await page.goto("/");
  const impact = page.getByRole("region", { name: "Community Impact" });
  await expect(impact.getByText("3", { exact: true })).toBeVisible();
  await expect(impact.getByText("2", { exact: true })).toBeVisible();
  await expect(impact.getByText("0", { exact: true })).toBeVisible();
  await expect(page.getByText("Demo marker: lighting report location")).toBeVisible();

  await page.reload();
  await expect(page.getByRole("region", { name: "Community Impact" }).getByText("3", { exact: true })).toBeVisible();
  await page.goto("/walk");
  await expect(page.getByRole("heading", { name: "Recent completed walks" })).toHaveCount(0);
});

test("main routes fit a phone viewport and enable safe-area layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of ["/", "/walk", "/contacts", "/report", "/map"]) {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute("content", /viewport-fit=cover/);
    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(documentWidth, `${route} should not scroll horizontally at 390px`).toBeLessThanOrEqual(390);
  }
});

test("web app manifest and iOS Home Screen metadata are available", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "/manifest.webmanifest");
  await expect(page.locator('meta[name="apple-mobile-web-app-capable"]')).toHaveAttribute("content", "yes");
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute("href", "/apple-touch-icon.png");

  const manifestResponse = await request.get("/manifest.webmanifest");
  expect(manifestResponse.ok()).toBeTruthy();
  const manifest = await manifestResponse.json();
  expect(manifest).toMatchObject({
    name: "NightOwl",
    short_name: "NightOwl",
    display: "standalone",
    theme_color: "#08204b",
    background_color: "#f5f8fc",
  });
  expect(manifest.icons).toEqual(expect.arrayContaining([
    expect.objectContaining({ src: "/icon-192.png", sizes: "192x192", type: "image/png" }),
    expect.objectContaining({ src: "/icon-512.png", sizes: "512x512", type: "image/png" }),
  ]));

  for (const iconPath of ["/icon-192.png", "/icon-512.png", "/apple-touch-icon.png"]) {
    const iconResponse = await request.get(iconPath);
    expect(iconResponse.ok(), `${iconPath} should be served`).toBeTruthy();
    expect(iconResponse.headers()["content-type"]).toContain("image/png");
  }
});
