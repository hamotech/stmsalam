# Order V2 — Architecture blueprint (documentation only)

This document describes the **existing** Order implementation under `src_v2` as of the modular service layout. It is suitable for technical review and scaling discussions. **No new behavior is specified here**; behavior is inferred from the current code paths.

**Primary code locations**

- Public service facade: [`src_v2/data/services/orderService.js`](../data/services/orderService.js) (re-exports [`order/index.js`](../data/services/order/index.js))
- Composition + optional DEV simulator: [`src_v2/data/services/order/index.js`](../data/services/order/index.js)
- Orchestration: [`src_v2/data/services/order/orderCore.js`](../data/services/order/orderCore.js)
- Engines: `retryEngine`, `offlineQueue`, `dedupeEngine`, `reconciliationEngine`, `idempotencyEngine`, `transactionEngine`, `syncEngine`, `metricsEngine` (same directory)
- Upstream: [`src_v2/domain/order/placeOrder.js`](../domain/order/placeOrder.js), [`src_v2/data/repositories/orderRepository.js`](../data/repositories/orderRepository.js)

**Firestore collections used (service layer)**

- `orders` — transactional create for new orders; dual `updateDoc` for status updates when online
- `public_tracking` — same document id as `orders` for creates (via transaction); dual `updateDoc` for status updates when online

---

## 1. Architecture overview (text diagram)

```
UserAction
    → Presentation (e.g. OrderScreen, hooks/useOrder.js)
    → Domain (domain/order/placeOrder.js — validation, maps input → service payload)
    → Repository (data/repositories/orderRepository.js — thin pass-through + logging)
    → Service entry (data/services/order/index.js → orderCore.js)
          ├─ dedupeEngine      (in-memory hash, minute bucket)
          ├─ offlineQueue      (AsyncStorage key V2_OFFLINE_ORDER_QUEUE, memory fallback)
          ├─ syncEngine        (NetInfo listener, debounced reconnect, FIFO processOfflineQueue)
          ├─ reconciliationEngine (read-only duplicate probe on orders)
          ├─ idempotencyEngine (key + Firestore query + local set)
          ├─ retryEngine       (withRetry wrapper, 3 attempts, backoff 500/1000/2000 ms)
          ├─ transactionEngine (runTransaction: orders + public_tracking atomically)
          └─ metricsEngine     (in-memory counters + snapshot logs; try/catch isolated)
    → Firestore (orders, public_tracking)
```

**DEV-only harness** (disabled by default): [`src_v2/dev/orderFailureSimulator.js`](../dev/orderFailureSimulator.js), loaded only from `order/index.js` when `__DEV__` and `ENABLE_ORDER_SIMULATOR` is true. It may wrap `placeOrder` / `processOfflineQueue` without changing production defaults.

---

## 2. Flow explanations (step-by-step)

### 2.1 `placeOrder` (online, Firestore path)

Executed in `orderCore.placeOrder` after `ensureListener()`:

1. **Dev stress flags** (`DEV_DEBUG_FLAGS`): may throw or return simulated invalid payload (dev-only).
2. **Client dedupe** (`dedupeEngine`): `buildOrderHash` + `hasRecentOrderHash` → on hit returns `{ success: false, error: "DUPLICATE_ORDER_BLOCKED" }`.
3. **Offline gate** (`syncEngine.isOffline` via NetInfo): if offline → `appendToQueue` + `{ success: false, error: "OFFLINE_QUEUED" }`.
4. **Mock path** (`USE_MOCK_ORDER_SERVICE`): in-memory only (currently false in code).
5. Build **payload** (`status: PENDING`, timestamps, `paymentProofSubmitted`).
6. **Reconciliation** (`reconciliationEngine.findServerDuplicate`): ID match, then windowed query on `userId` + `createdAt` ±2 min + items signature; on duplicate → `{ success: false, error: "SERVER_DUPLICATE_DETECTED" }` and local hash/key memory updated.
7. **Idempotency** (`idempotencyEngine.checkIdempotencyDuplicate`): doc id / local key / `idempotencyKey` query; on duplicate → `{ success: false, error: "IDEMPOTENT_DUPLICATE_BLOCKED" }` (or partial-match safe duplicate path with log).
8. **Transaction** (`transactionEngine.transactionalCreateOrder`): `withRetry` + `runTransaction` writes `orders/{deterministicId}` and `public_tracking/{deterministicId}` with `idempotencyKey` on body.
9. **Success**: `{ success: true, data: { ...payload, id, idempotencyKey } }`, `rememberOrderHash`.

Errors in outer try → `{ success: false, error: message }`.

### 2.2 Offline queue flow

When `isOffline()` is true for `placeOrder` or `updateOrderStatus`:

- Item appended via `offlineQueue.appendToQueue` (persist AsyncStorage or memory fallback).
- Caller receives `{ success: false, error: "OFFLINE_QUEUED" }`.
- Metrics: `incrementQueuedOrders` (wrapped safely in `metricsEngine`).

### 2.3 Sync recovery flow

Triggered by:

- `ensureSyncListener` on first service use: schedules initial `processOfflineQueue`.
- NetInfo: transition **offline → online** (debounced ~4s) calls `processOfflineQueue`.

`syncEngine.processOfflineQueue`:

1. Double lock `isSyncProcessing || isSyncing` prevents overlap.
2. Metrics snapshot; if still offline, exit (queue unchanged for this run).
3. `loadQueue` → FIFO iterate:
   - Items older than 24h: log stale, **retained** in queue (not processed, not dropped).
   - `placeOrder` queue item → `handleQueuedPlaceOrder`; `updateOrderStatus` → `handleQueuedUpdateStatus`.
   - Success: item not added to `retained` (effectively removed).
   - Failure: item pushed to `retained`, metrics `incrementFailedSyncs`.
4. `persistQueue(retained)`; metrics snapshot.

### 2.4 Queued `placeOrder` replay (`handleQueuedPlaceOrder`)

Order:

1. Local dedupe hash (skip + metrics if duplicate).
2. Build body + `idempotencyKey`.
3. **Reconciliation** — if server duplicate: log reconcile lines, increment duplicate skips, `rememberOrderHash`, return **true** (sync treats as success → item removed from queue).
4. **Idempotency check** — if duplicate on server: same; if duplicate local-only: **throws** `IDEMPOTENT_DUPLICATE_BLOCKED` → item **retained**.
5. **Transactional create** — same as online path; on success `rememberOrderHash`.

### 2.5 Reconciliation flow

- **By id**: `getDoc(orders, candidateId)` if `candidate.id` present.
- **By signature**: query `orders` where `userId` and `createdAt` in ±2 minute ISO window, compare normalized items JSON (sorted).
- **Timeout**: `Promise.race` with 3000ms → `{ hasDuplicate: false, timeoutFallback: true }` + log `[V2 RECONCILE] timeout fallback activated`.
- **Query error**: `{ hasDuplicate: false, queryFailed: true }` + warn log (does not block creation by itself; upstream may still proceed to idempotency/transaction).

### 2.6 Idempotency validation flow

- **Key**: `userId | itemsSignature | mode | timeBucket(2min) | clientOrderId`.
- **Deterministic doc id**: `clientOrderId` or `id` if set; else `idem_<hash(idempotencyKey)>`.
- Checks: existing doc by id, in-memory set, Firestore `where idempotencyKey == key`.
- Partial doc edge: treated as duplicate with `[V2 IDEMPOTENCY] partial match treated as safe duplicate`.

### 2.7 Transaction execution flow

- Per deterministic id: attempt counter in `transactionEngine` (max **3** attempts per order id); beyond → `TXN_MAX_RETRY_REACHED` + log `[V2 TXN] max retry threshold reached, aborting safely`.
- Inside transaction: if `orders` doc exists → throw `IDEMPOTENT_DUPLICATE_BLOCKED` (no second write).
- `tx.set` orders + `tx.set` public_tracking merge — **single atomic commit** from the client’s perspective for those two refs.

### 2.8 `updateOrderStatus` (online)

- Not using `runTransaction`; two `updateDoc` calls in parallel with `withRetry` each; success if **at least one** succeeds.
- Offline: queued like `placeOrder`.

### 2.9 `getOrders`

- Reads `public_tracking` with `orderBy(createdAt desc)` + `limit`, `withRetry` on `getDocs`.

---

## 3. Failure flow map

| Failure | Trigger | Engine / layer | Recovery / outcome | Data loss? |
|--------|---------|------------------|----------------------|------------|
| Network offline during order | NetInfo reports disconnected / unreachable | `syncEngine.isOffline` + `offlineQueue` | Enqueue; `OFFLINE_QUEUED`; sync on reconnect | None for queued intent (persisted if AsyncStorage works) |
| App crash mid-transaction | Process kill before Firestore commit | Firestore | Transaction does not commit; no half-applied txn state for the two refs in one txn | No committed order from that attempt |
| Duplicate order from 2 devices | Same logical order, overlapping keys/signatures | `reconciliationEngine`, `idempotencyEngine`, `transactionEngine` | Second attempt may get `SERVER_DUPLICATE_DETECTED`, `IDEMPOTENT_DUPLICATE_BLOCKED`, or txn sees existing doc | Intentionally no second order for same id/key |
| Firestore timeout during reconciliation | Slow `getDocs` | `reconciliationEngine` | Timeout → `hasDuplicate: false`; proceed with idempotency/txn | May miss server duplicate in that window (see limitations) |
| Queue corruption on restart | Invalid JSON in AsyncStorage | `offlineQueue.loadQueue` | Parse failure → empty queue + `[V2 QUEUE] corrupted state recovered safely` | **Queued items may be lost** if storage was corrupt |
| Sync storm (rapid reconnect) | Flapping NetInfo | `syncEngine` debounce + locks | `[V2 SYNC] reconnect storm blocked` or skipped overlapping run | Queue preserved; delayed processing |
| Transaction partial failure (app meaning) | N/A for **create**: single txn both docs | `transactionEngine` | Firestore rolls back failed txn; retry via `withRetry` then bounded txn attempts | No orphan pair from one successful txn commit |
| Queued replay failure | Throw in handler | `syncEngine` | Item kept in `retained`; persists queue | Preserved until success or manual intervention |
| Stale queue item (>24h) | Age check | `syncEngine` | Logged stale, **not** processed, **kept** in queue | Not auto-deleted |

---

## 4. Component responsibility map

| Module | Responsibility |
|--------|----------------|
| `orderCore.js` | Orchestrates `placeOrder`, `updateOrderStatus`, `getOrders`, `processOfflineQueue`; wires engines; owns DEV flags and mock branch. |
| `retryEngine.js` | `withRetry`: up to 3 attempts, exponential backoff, network-like error heuristic. |
| `offlineQueue.js` | Persist/load queue (`V2_OFFLINE_ORDER_QUEUE`), JSON corruption recovery, append. |
| `dedupeEngine.js` | Minute-bucket client hash; short-lived in-memory set. |
| `reconciliationEngine.js` | Read-only server duplicate detection; timeout and query-failure fallbacks. |
| `idempotencyEngine.js` | Key generation, Firestore + memory duplicate checks, deterministic id helper. |
| `transactionEngine.js` | Atomic create for `orders` + `public_tracking`; bounded txn attempts per id. |
| `syncEngine.js` | Offline detection, reconnect listener, debounce, FIFO sync loop, stale skip, locks. |
| `metricsEngine.js` | In-memory metrics; all mutations/logging wrapped in try/catch. |

---

## 5. Consistency model

**Strong consistency (per operation type)**

- **New order create**: Within a single successful Firestore transaction, `orders` and `public_tracking` for the same document id are written together — no client-visible “orders only” success state for that create path.

**Eventually consistent**

- **Offline queue**: Order exists on device before server; server lags until sync succeeds.
- **Reads**: `getOrders` reads `public_tracking` only; may not reflect private `orders` if other writers break invariants (outside this module’s control).
- **Status updates**: Dual `updateDoc` is “best of two”; one collection can succeed while the other fails — **eventual** alignment depends on retries and external repair.

**Source of truth**

- **Server** (`orders` / `public_tracking` as written by this service) is authoritative for whether an order id exists and for idempotency key collisions.
- **Client** queue is authoritative only until successfully replayed; then server wins.

**Conflict resolution**

- Reconciliation + idempotency + transaction “already exists” path prefer **not** creating a second document.
- Domain validation rejects bad input before service (separate layer).

**Not guaranteed**

- Reconciliation query requires composite indexes and `userId` + ISO `createdAt` on documents; missing fields or index errors fall back to “no duplicate found” paths.
- Absolute global dedupe across all possible payloads without `userId` / signature alignment is **not** claimed by code.

---

## 6. Recovery strategy matrix

| Scenario | Detection | Engine | Recovery outcome |
|----------|-----------|--------|------------------|
| Offline → online | NetInfo offline→online (debounced) | `syncEngine` | `processOfflineQueue` runs; successful items dropped from persisted queue |
| Duplicate replay | Hash / idempotency / txn exists | `dedupeEngine`, `idempotencyEngine`, `transactionEngine` | Block or no-op; errors returned to caller on online path |
| Transaction failure retry | Network-like errors | `retryEngine` inside `transactionEngine` | Up to 3 wrapped attempts per inner operation; separate per-order txn attempt cap |
| Reconciliation fallback | Timeout or catch | `reconciliationEngine` | Proceed without server duplicate signal; logs warn |
| Queue corruption | JSON parse / non-array | `offlineQueue` | Empty queue + warning log |

---

## 7. Race condition analysis

- **Duplicate submissions (same device, same minute bucket)**: `dedupeEngine` blocks second; idempotency key and txn `exists` check block after window rolls or memory expires.
- **Concurrent devices**: Same `clientOrderId` / deterministic id → second txn sees existing doc → `IDEMPOTENT_DUPLICATE_BLOCKED` path or reconcile hit if window and indexes align.
- **Retry overlap**: `withRetry` serial per call; sync loop single-flight locks reduce concurrent `processOfflineQueue`.
- **Idempotency correctness**: Depends on stable `idempotencyKey` fields and Firestore write of `idempotencyKey` on the document; key query requires index on `idempotencyKey` for production scale.
- **Server final authority**: Transaction read-before-write on `orders` doc id ensures two creators cannot both commit two docs for the same id.

---

## 8. System guarantees and limitations

### Guarantees (as implemented)

- **Bounded retries**: `retryEngine` max 3 attempts per wrapped operation; `transactionEngine` additional per-order attempt budget (3).
- **No partial pair on successful create txn**: Both refs committed in one transaction or neither.
- **Offline intent persistence**: When AsyncStorage works, queue survives app restart; otherwise memory fallback is weaker.
- **Sync single-flight**: Combined flags reduce overlapping processors.
- **Reconciliation / metrics failures**: Designed not to hard-crash the app; reconciliation timeout explicitly proceeds without duplicate signal.
- **Queue corruption**: Recoverable to empty state with explicit log (see data loss note above).

### Limitations (explicit)

- **“No duplicate orders under any condition”** is **not** a proven absolute: duplicates could still occur if payloads differ in ways that change signatures/keys, if `userId` is missing and reconcile window query is skipped, if indexes/rules prevent queries but writes succeed, or if other clients bypass these conventions.
- **Reconciliation window** is ±2 minutes and **requires** `userId` for the query path; ISO string `createdAt` mismatch with stored types can weaken matching.
- **`updateOrderStatus`** is not transactional across collections; partial success is possible.
- **Stale queue items** are never auto-removed; they require operational handling.
- **Simulator**: Only affects behavior when explicitly enabled in DEV.

---

## 9. Log taxonomy (observability)

Existing prefixes used in this stack include: `[V2 UI]`, `[V2 HOOK]`, `[V2 DOMAIN]`, `[V2 REPO]`, `[V2 SERVICE]`, `[V2 SYNC]`, `[V2 SYNC METRICS]`, `[V2 QUEUE]`, `[V2 RECONCILE]`, `[V2 IDEMPOTENCY]`, `[V2 TXN]`, `[src_v2][orderService.*]`, and DEV `[V2 SIM]` when simulator enabled.

---

*End of blueprint — documentation only; behavior is defined by source code in `src_v2/data/services/order/`.*
