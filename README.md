# STM Salam — Full stack (web, mobile, API)

Customer-facing **web storefront** (Vite + React), **native mobile app** (Expo + React Native), and **backend API** live in one repo. They share Firebase and product concepts but are **different applications** — do not treat `frontend/` as the mobile app.

## Monorepo layout

| Path | Role | How you run it |
|------|------|----------------|
| **`frontend/`** | **Web app** (Vite + React). Browser UI, default **http://localhost:5173** | From repo root: `npm run dev:web` |
| **`stm-mobile/`** | **Mobile app** (Expo + React Native). Expo Go, emulator, or EAS builds | From repo root: `npm run dev:mobile` |
| **`backend/`** | API / server | From repo root: `npm run dev:backend` |

### Web vs mobile (do not mix)

- **`frontend`** = **website only**. Opening `localhost:5173` is correct for web, **not** for the phone app UI.
- **`stm-mobile`** = **Expo app only**. Use Expo Go or an Android/iOS emulator against the Metro dev server. Metro is pinned to **port 19006** so it does not collide with other tools on **8081**. The **same** app can also run in a **browser** via Expo Web (`npm run web` from `stm-mobile`); the dev server URL and port are printed by Expo (for example **`http://localhost:8082/home`** for the tabs home route — Expo Router drops the `(tabs)` segment on web, so paths look like `/home`, not `/(tabs)/home`).
- Running **`npm run dev`** at the root starts **web + backend only** — it does **not** start Expo. Add a second terminal with `npm run dev:mobile` when you need the native app.

### Commands (from repository root)

```bash
# Web storefront (Vite)
npm run dev:web

# Mobile app (Expo; Metro on http://localhost:19006)
npm run dev:mobile

# Web + API together
npm run dev

# Install deps in root, frontend, backend, and stm-mobile
npm run install:all
```

Inside **`stm-mobile/`** you can also use:

```bash
npm run start:mobile   # Expo dev server (port 19006)
npm run android        # Same + open Android (expo start --android)
npm run clear          # Start with cleared Metro cache (port 19006)
npm run run:android    # Native rebuild / dev client (expo run:android)
```

---

## Web app features (frontend)

Premium Teh Tarik / kebab storefront: real-time kitchen tracking, admin inventory, WhatsApp-oriented checkout, SGQR / PayNow flows.

### Tech stack (web)

- React 18 + Vite
- Firebase (Auth, Firestore)
- Framer Motion, Lucide

### Web-only getting started

1. Node.js 18+
2. Firebase CLI (`npm install -g firebase-tools`) for deploy
3. From repo root: `npm run dev:web`, or `cd frontend && npm install && npm run dev`

### Web deployment

```bash
cd frontend
npm run build
firebase deploy --only hosting,firestore
```

## Security

Firestore rules live in `firestore.rules`. Admin collections require auth; public menu reads are scoped for customers.

---

## Monorepo improvements (optional)

- **Shared package**: Extract Firebase init, types, and API clients into `packages/` (e.g. `packages/shared-firebase`) consumed by `frontend` and `stm-mobile` to avoid drift.
- **Turborepo / Nx**: If build and test graphs grow, a task runner gives caching and ordered `dev` / `build` pipelines.
- **Single `compose` or `dev:stack`**: Only if you routinely need web + API + mobile; keep scripts explicit so newcomers are not confused about which UI is which.

---

© 2026 STM Salam.
