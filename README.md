# NightOwl — Campus Safety, Together

NightOwl is a polished Hacklanta 2026 MVP concept for Georgia State University. It helps students plan a campus walk, privately share the plan with selected trusted contacts, check in on arrival, and submit community reports about environmental conditions.

## Features

- Dashboard with current walk status, community report summaries, and an OpenStreetMap campus preview.
- Walk planner with a manual start and destination, estimated duration, optional contacts, review step, arrival check-in, cancellation, and time extension.
- Overdue check-in state with a clearly marked demo control for judge walkthroughs.
- Trusted contact management and a private simulated preview. No messages are sent.
- Interactive Leaflet map with status and category filters, map/list views, and sample markers clearly labeled as demonstration data.
- Report submission, local persistence, and controls to mark a condition resolved or request another review.
- Responsive layout and accessible labels for key controls.

## Technology

Next.js App Router, React, TypeScript, Tailwind CSS, Lucide icons, Leaflet, React Leaflet, and OpenStreetMap tiles. Demo state is stored in browser `localStorage`.

## Install and run

Requires Node.js 20 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). For a production build, run `pnpm build` and then `pnpm start`.

## End-to-end browser tests

The Playwright suite uses a dedicated Next.js development server on `http://127.0.0.1:4179`, a separate `.next-e2e` build directory, and a fresh browser context for every test. It does not reuse the normal demo at port 3000 or its browser storage.

Install the Chromium browser once, then run the suite:

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

Playwright starts and stops the test server automatically. Test results and the optional HTML report are written to ignored folders.

## Capacitor Android app

The Android app bundles the static export in `.next-mobile/`; Capacitor does not load the deployed website URL. The website's normal `pnpm build` still uses Next.js `.next` output. The Playwright server continues to use `.next-e2e`.

Requires Node.js 22 or newer, Android Studio 2025.2.1 or newer, and an Android SDK with Android SDK Platform API 24 or newer. Android Studio includes the JDK needed by Gradle; install the SDK platform and Android SDK Build Tools from **Tools → SDK Manager**. Installing Capacitor 8 does not add GPS, background monitoring, or real contact notifications. The map needs an internet connection to load OpenStreetMap tiles.

Create the Android project once:

```bash
pnpm build:mobile
pnpm exec cap add android
```

For each later web-code change, rebuild and sync the bundled app, then open Android Studio:

```bash
pnpm build:mobile
pnpm exec cap sync android
pnpm exec cap open android
```

## Install on iPhone (PWA)

NightOwl includes a web app manifest, app icons, and iOS Home Screen metadata. To install the deployed site, open its HTTPS URL in **Safari** on iPhone, tap **Share**, choose **Add to Home Screen**, review the NightOwl name, then tap **Add**. Open NightOwl from its Home Screen icon to use standalone display mode. If **Add to Home Screen** is not visible, scroll the Share sheet or check its edit actions. Installing the PWA does not add offline support, push notifications, GPS tracking, or background monitoring.

To launch on an attached device or running emulator from the command line, enable Android USB debugging (for a physical device), then run:

```bash
pnpm exec cap run android
```

Alternatively, open the `android/` project in Android Studio, select a device or emulator, and press **Run**. Install Android Studio and the SDK before building or launching the native app; the static web export itself does not require them.

## Demo walkthrough

1. Open the dashboard and inspect the sample report markers. Each sample is labeled and is not a verified hazard.
2. Select **Start a Walk**, enter a destination and estimated duration, and optionally select a trusted contact.
3. Review the plan, start the walk, and open **contact preview** to see the private demo notification. It is simulated and not sent.
4. Select **Demo control · simulate overdue check-in** to show the overdue state without waiting.
5. Extend the estimate or select **I Arrived Safely**. Completion appears in the walk history and in a shared contact preview.
6. Submit an environmental report from **Report an Issue** and locate it in the map and report list.

The initial contact entries are also demonstration data. You can add or remove contacts and clear all local demo data from the browser's site storage.

## Privacy and safety

No account is required. Walks are not shared unless the walker selects contacts. Trusted contacts are never shown on the public map. This MVP uses local browser storage, which is not encrypted and is not suitable for production-grade sensitive information. Data is limited to the current browser and device; clearing site data removes it.

NightOwl does not track GPS, send SMS or email, provide guaranteed emergency monitoring, or dispatch responders. Arrival times and route details are user-entered estimates. An overdue walk is a prompt to check in, not evidence that someone is in danger. Community reports are unverified submissions, not official police records or emergency alerts. For immediate danger, contact local emergency services.

## Known limitations

- The map uses public OpenStreetMap tiles and needs an internet connection; reports remain available in list form if map tiles fail.
- Report locations are selected from approximate campus demo points. Device location and photo upload are not implemented.
- Contact notification delivery and account-backed, cross-device sharing are not implemented.
- Data is stored locally in one browser. This is a hackathon demonstration and is not a production safety service.
