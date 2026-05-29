# Production Deployment Checklist — STM Salam Fullstack

This document provides a comprehensive verification checklist for deploying the STM Salam Fullstack application to production environments.

---

## 1. Environment Variable Validation

Ensure all environment variables are correctly configured. The backend will validate these variables on startup.

| Service | Environment Variable | Required in Production | Description | Recommended Setting |
| :--- | :--- | :--- | :--- | :--- |
| **Backend** | `NODE_ENV` | Yes | Controls logging formats & error details | `production` |
| **Backend** | `PORT` | Yes | The port Express listens on | `5000` (or host assigned) |
| **Backend** | `JWT_SECRET` | Yes | Token signing key. **Must not be default.** | Random 64-character hex |
| **Backend** | `SUPABASE_URL` | Optional | Supabase client database URL | Deployed Supabase URL |
| **Backend** | `SUPABASE_KEY` | Optional | Supabase service role key | Deployed Supabase Key |
| **Frontend** | `VITE_API_URL` | Yes | REST backend endpoint url | `https://teh-tarik-app-k4w4.onrender.com/api` |

### Startup Safeguards
- In **production mode** (`NODE_ENV=production`), the backend will **crash and fail-fast** if `JWT_SECRET` is unset or matching the default fallback (`salam123stm`).
- Ensure `JWT_SECRET` is set in the host container environment variables.

---

## 2. Docker Container Security

The `backend/Dockerfile` is hardened for production. Verify these details before building:

- [ ] **Base Image**: Uses `node:22-alpine` to align runtime engine version and reduce image vulnerabilities.
- [ ] **Dependency Install**: Running `npm ci --only=production` to block devDependencies and ensure deterministic builds.
- [ ] **Ownership**: File ownership assigned to the non-root `node:node` user using `COPY --chown=node:node`.
- [ ] **Execution Context**: Switched context with `USER node` before running `node index.js` to mitigate privilege escalation risks.

---

## 3. Network & Mobile Security (Capacitor/Android)

Verify mobile security configuration parameters in `stmapp/android/app/src/main/res/xml/network_security_config.xml`:

- [ ] **Cleartext Traffic**: General cleartext traffic (`http`) is disabled by default via `<base-config cleartextTrafficPermitted="false" />`.
- [ ] **Domain Trust Anchors**: Explicitly whitelist only secure HTTPS endpoints for Render backend APIs, Firebase services, and Google Maps:
  - `teh-tarik-app-k4w4.onrender.com`
  - `teh-tarik-app-my-own.firebaseapp.com`
  - `teh-tarik-app-my-own.web.app`
  - `googleapis.com`
  - `firebaseapp.com`
- [ ] **Local Debug Exception**: Cleartext is restricted strictly to the Android loopback interface (`10.0.2.2`) for safe emulator development.
- [ ] **Capacitor Cookies**: The `CapacitorCookies` plugin is explicitly enabled in `capacitor.config.json` to handle session storage securely.

---

## 4. Run-Time Verification Checks

Prior to triggering deployment, execute the following script checks in the repository root:

1. **State Machine Write Guard**:
   ```bash
   npm run guard:no-direct-status-writes
   ```
   *Expected outcome:* `No direct lifecycle mutation patterns found.`

2. **Product Domain Integrity**:
   ```bash
   npm run guard:product-domain
   ```
   *Expected outcome:* `[validate-product-domain] OK: product domain guardrails enforced.`

3. **Frontend Production Build Compilation**:
   ```bash
   cd frontend && npm run build
   ```
   *Expected outcome:* Successful compilation containing correct output bundles.

---

## 5. Deployment Rollback Strategy

In the event of a production incident, follow these instructions to immediately restore the last stable version:

### A. Frontend / Web Shell Rollback (Firebase Hosting)
Firebase Hosting stores a history of deployments. To roll back instantly:
1. Open the Firebase Console.
2. Navigate to **Hosting** > **Dashboard**.
3. Locate the previous successful release in the release history list.
4. Click the three dots menu next to it and select **Rollback**.
*Alternatively, roll back via CLI:*
```bash
firebase hosting:clone teh-tarik-app-my-own:<previous-release-id> teh-tarik-app-my-own:live
```

### B. Backend API Rollback (Render / Docker)
If using Render or a container host:
1. Open the Render Dashboard.
2. Go to the Web Service dashboard for `teh-tarik-app-k4w4`.
3. Click on the **Events** tab.
4. Select the last stable deployment and click **Rollback to this deploy**.
*Alternatively, push the previous stable Git commit hash directly to production.*

### C. Android App Rollback (Google Play Store Console)
If a native Android shell issue occurs:
1. Open the Google Play Console.
2. Navigate to **Production** > **Releases**.
3. Create a new release and target the previous stable `.aab` bundle version code, or increase the version code of the previous stable build and re-upload it.
