# Production Backup & Disaster Recovery Strategy

This document outlines the standard operating procedures for backing up, recovering, and auditing the core data infrastructure of the Grab-style delivery platform.

## 1. Firebase Export Steps
- Enable daily scheduled exports from Google Cloud Firestore to a Google Cloud Storage bucket.
- To trigger a manual export:
  ```bash
  gcloud firestore export gs://[YOUR_BACKUP_BUCKET]/[BACKUP_NAME]
  ```

## 2. Firestore Indexes Backup
- Maintain a canonical copy of `firestore.indexes.json`.
- If indexes are lost, restore via CLI:
  ```bash
  firebase deploy --only firestore:indexes
  ```

## 3. Functions Deployment Backup
- Keep historical deployments tagged in Git (e.g., `v1.0.0-production`).
- Rollback command:
  ```bash
  git checkout tags/v1.0.0-production
  cd backend && npm install && firebase deploy --only functions
  ```

## 4. Environment Variable Recovery
- Back up the production `.env` and `functions/.env` files securely (e.g., using Google Cloud Secret Manager or 1Password).
- Firebase Functions Secrets:
  ```bash
  firebase functions:secrets:set STRIPE_SECRET_KEY
  ```

## 5. Rollback Strategy
- For frontend rollbacks, if using Firebase Hosting:
  ```bash
  firebase hosting:rollback
  ```
- For FSM transition rollbacks, manual database correction must utilize the `adminTransition` payload or direct `admin.firestore()` scripts with the `no-direct-status-writes` guards disabled temporarily.

## 6. Rider Assignment Recovery
- If the `assignedRiderId` schema gets corrupted, an admin script can reconcile assignments by searching `orders` against active `users` where `role == 'rider'`.
- Ensure FSM whitelist always accommodates the canonical `{ assignedRiderId, assignedRiderName, assignedRiderPhone, assignedAt }`.

## 7. Stripe Recovery Checklist
- Verify `STRIPE_WEBHOOK_SECRET` in production secrets.
- Re-run stuck checkouts utilizing the `stripeCheckoutSessionId` attached to the `orders/{id}` document.
- In case of missed webhook events, use the Stripe Dashboard to "Resend Webhook" for `checkout.session.completed`.
