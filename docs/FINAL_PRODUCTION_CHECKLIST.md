# FINAL PRODUCTION DEPLOYMENT CHECKLIST

## 1. Firebase Deploy Order
Deploy resources securely and in isolation to prevent transient race conditions:
```bash
# 1. Rules
firebase deploy --only firestore:rules

# 2. Indexes
firebase deploy --only firestore:indexes

# 3. Cloud Functions (API logic layer)
firebase deploy --only functions

# 4. Frontend Application (if hosting via Firebase)
npm run build && firebase deploy --only hosting
```

## 2. Rollback Order
In case of critical degradation:
1. Revert UI immediately via Firebase Console (Hosting Rollback).
2. For Functions, revert to the last stable Git tag and deploy:
   ```bash
   git checkout v1.0.0-production
   cd backend && npm install && firebase deploy --only functions
   ```
3. Do not blindly revert Firestore Rules unless a regression directly blocked payments/assignments.

## 3. Emergency Procedures
- **Stuck Realtime Assignments**: Admin drops to `scripts/list-rider-accounts.cjs` and matches canonical UIDs manually.
- **Rogue Transitions (INTERNAL errors)**: Lock down the state machine via `assertNoDirectStatusMutation()` flags or downgrade rules to temporary `false` write mode.
- **Stripe Failure**: Replay Webhooks natively from the Stripe Dashboard (`checkout.session.completed`).

## 4. Monitoring & Observability URLs
- **Google Cloud Logging**: Use `resource.type="cloud_function"` to isolate FSM.
- **Firestore Usage Metrics**: Monitor concurrent reads specifically checking the `/orders` query bandwidth in Firebase Console.
- **Sentry/Crashlytics**: Android WebViews must bind directly to Crashlytics to trap native deep-link crashes.

## 5. Recovery Commands
- **Rider Auth Identity Sync**:
  ```bash
  node scripts/backfill-rider-profiles.cjs
  ```
- **Rule Bypass/Override** (Local debugging only):
  ```bash
  firebase emulators:start --only firestore
  ```

## 6. Android Release Steps
- Apply ProGuard shrinking aggressively via `minifyEnabled true`.
- Remove source maps in Vite (`build.sourcemap = false`).
- Build signed AAB:
  ```bash
  cd android
  ./gradlew bundleRelease
  ```
- Validate Capacitor Intent Filters (`wa.me` and `tel:`) via `adb shell am start -W -a android.intent.action.VIEW -d "wa.me/..."` before uploading to Play Store.
