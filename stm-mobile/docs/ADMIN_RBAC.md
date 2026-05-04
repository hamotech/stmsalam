# Admin RBAC (Firebase)

## Model

- **Identity:** Firebase Authentication.
- **Authorization (hybrid migration):**
  - **Custom claim:** JWT `admin: true` (set only via Firebase Admin SDK — scripts or Cloud Functions).
  - **Firestore:** `users/{uid}.role == "admin"` (and optional legacy `isAdmin` in the mobile app until strict mode).
- **Rules:** `frontend/firestore.rules` — `hasAdminRole()` = **`request.auth.token.admin == true`** **OR** Firestore role `admin`. After every admin has claims synced, you may tighten to claims-only.

## Custom claims (production path)

1. **Set claims on the server** (never from the client):
   - One user: `node scripts/set-admin-custom-claim.cjs <uid> true|false`
   - Sync all `users/*` from Firestore role: `node scripts/sync-admin-claims-from-firestore.cjs`
   - Prerequisites: `GOOGLE_APPLICATION_CREDENTIALS`, `npm install firebase-admin --no-save` (same as `scripts/migrate-admin-role.cjs`).

2. **Token refresh:** After `setCustomUserClaims`, the client must call `getIdToken(true)` (or sign in again) before `getIdTokenResult()` shows new claims. Mobile admin login and web login do a forced refresh on admin success where applicable.

3. **Mobile:** `AuthContext` loads `idTokenClaims` via `getIdTokenResult`; `useAppRole()` / `resolveAppRole` treat `claims.admin === true` as admin. `refreshIdTokenClaims()` is exposed for post-migration flows.

4. **Web:** `AuthContext.jsx` and `Login.jsx` promote `role` to `admin` when `getIdTokenResult(...).claims.admin === true`.

## Phases

1. **Transition (default app):** Mobile still accepts legacy `isAdmin === true` until every admin has `role: "admin"`. A **one-time `console.warn` per uid** is logged if `isAdmin` is true but `role` is not `admin`.
2. **Data:** Run `node scripts/migrate-admin-role.cjs` so each admin doc has `role: "admin"`.
3. **Claims:** Run `node scripts/sync-admin-claims-from-firestore.cjs` (or set per uid).
4. **Strict app:** Set `EXPO_PUBLIC_ADMIN_AUTH_STRICT_ROLE_ONLY=true` so the app grants admin from Firestore **only** when `role === "admin"` — **custom claim `admin: true` still grants admin** (server authority).
5. **Deploy rules:** `firebase deploy --only firestore:rules` so hybrid (or claims-only) rules are live.

**Order (avoid lockout):** Firestore `role: "admin"` for operators → deploy **hybrid** rules → sync claims → verify login → optionally change rules to claims-only.

## Optional: claims-only rules

When all admins have JWT `admin: true` and you accept dropping the Firestore read in rules:

```javascript
function hasAdminRole() {
  return isSignedIn() && request.auth.token.admin == true;
}
```

## Cleanup

After strict mode is stable, you may remove the optional `isAdmin` field from user documents and from `UserProfile` in code.
