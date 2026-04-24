# src_v2 Architecture (Clean Architecture + MVVM)

This folder is a safe, isolated architecture sample for Expo React Native.

## Layers

- `screens/`, `components/`, `hooks/`: Presentation + MVVM (UI + ViewModel state)
- `domain/`: Enterprise business logic (entities, repository contracts, use cases)
- `data/`: Infrastructure details (Firebase/API services, repository implementations)
- `core/`: Shared constants/config/helpers
- `navigation/`: React Navigation setup and route wiring
- `features/`: Feature facades for modular growth (e.g., orders feature)

## Naming convention

- Files use `camelCase` for hooks/use cases (e.g., `useOrderViewModel.ts`, `placeOrder.ts`)
- Components and screens use `PascalCase` (e.g., `OrderScreen.tsx`, `PrimaryButton.tsx`)
- Interfaces start with `I` in domain contracts (e.g., `IOrderRepository`)

## End-to-end flow

`OrderScreen` (View) -> `useOrderViewModel` (ViewModel) -> `PlaceOrderUseCase` (Domain) -> `OrderRepository` (Data) -> `OrderFirebaseService` + `OrderApiService`.

## DI setup

App dependencies are created in `core/di/container.ts` and injected through `AppContainerProvider`.
