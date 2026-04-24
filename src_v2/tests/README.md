# Test Scaffolding for src_v2

This folder and test files are intentionally isolated to keep the existing app unchanged.

## Included tests

- `domain/usecases/placeOrder.test.ts`: validates business rules
- `data/repositories/OrderRepository.test.ts`: verifies repository mapping behavior

## Suggested setup (when you are ready)

Install test libs in your mobile app package:

- `jest`
- `ts-jest`
- `@types/jest`

Then point your Jest config to include `src_v2/**/*.test.ts`.
