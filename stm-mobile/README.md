# stm-mobile (Expo)

Native **STM Salam** app: **Expo Router**, React Native, Firebase. This folder is **not** the Vite web app (`../frontend`).

## Run the mobile app

From **`stm-mobile/`**:

```bash
npm install
npm run start:mobile
```

Metro listens on **http://localhost:19006** (fixed port to avoid clashes with other tools on 8081).

- **Expo Go**: scan the QR from the terminal (use an interactive shell for the full menu).
- **Android emulator**: `npm run android` (starts Expo on port 19006 and opens Android).
- **Clear cache**: `npm run clear`

From **repository root**:

```bash
npm run dev:mobile
```

## Native dev build (separate from Expo Go)

```bash
npm run run:android   # expo run:android — rebuild native project when needed
```

## Stripe (card pay)

Uses **Stripe Hosted Checkout** only (`src/services/payment/stripeHostedCheckout.ts`): same Cloud Run URL as the Vite app. Before POST, the app asserts Firestore `orders/{id}.status === 'pending_payment'` or shows **Invalid order state for Stripe checkout** (matches server rules). Optional env: `EXPO_PUBLIC_STRIPE_CHECKOUT_URL` (see `.env.example`). Deploy **`createGrabOrder`**, **`createStripePendingOrder`**, and **`createStripeCheckout`** together.

## More docs

- Monorepo overview (web vs mobile): **`../README.md`**
- Dual-app / `src_v2` notes: **`docs/DUAL_APP_ARCHITECTURE.md`**

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction)
