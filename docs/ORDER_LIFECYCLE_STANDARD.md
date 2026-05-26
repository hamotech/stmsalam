# Order lifecycle — `orders/{orderId}` (single field model)

## Canonical write field

| Field | Meaning |
|-------|--------|
| **`status`** | **Only** authoritative lifecycle value (snake_case). |
| **`paymentStatus`** | Payment rail state (`PAID`, `PENDING`, `failed`, …). Webhook owns Stripe `paid`; admin does not mutate on Stripe-hosted orders. |

**Do not write** `orderStatus`, `order_status`, or `payment_status` on new paths. Legacy documents may still contain them; clients read via `readCanonicalOrderStatus()` in `frontend/src/domain/orderStateMachine.js` (and `stm-mobile/src/domain/orderStateMachine.ts`).

## Allowed `status` values

`pending_payment` · `paid` · `preparing` · `ready_for_pickup` · `out_for_delivery` · `delivered` · `cancelled` · (`failed` — Stripe failure terminal)

## State machine (enforcement)

Implemented in:

- **`frontend/src/domain/orderStateMachine.js`** — `assertValidOrderTransition(from, to, actor)` throws **`Invalid order state transition`**.
- **`frontend/functions/orderLifecycleServer.cjs`** — same logic for Cloud Functions (Stripe webhook).
- **`firestore.rules`** — role + payment immutability + field allow-lists (defense in depth).

### Transitions

| From → To | Actor |
|-----------|--------|
| `pending_payment` → `paid` | `webhook` only |
| `pending_payment` → `failed` | `webhook` only |
| `pending_payment` → `cancelled` | `admin` |
| `paid` → `preparing` | `admin` |
| `preparing` → `ready_for_pickup` | `admin` |
| `ready_for_pickup` → `out_for_delivery` | `rider` or `admin` (dispatch UI) |
| `out_for_delivery` → `delivered` | `rider` or `admin` (dispatch UI) |
| `*` → `cancelled` (except terminals) | `admin` |
| `failed` → `cancelled` | `admin` |

## Read model (dashboards)

Prefer **`status`** + **`paymentStatus`** + **`items`** + customer snapshot / `customer` for all surfaces (Vite, Expo, admin, driver).

`public_tracking` mirrors **`status`** (canonical) and **`paymentStatus`** (see `frontend/functions/mirrorPayload.js`).
