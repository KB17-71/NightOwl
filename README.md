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

Requires Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production build, run `npm run build` and then `npm start`.

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
