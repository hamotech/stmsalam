// hooks/useAppStore
// Lightweight global state using Context API for app-wide order state.

import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Order } from "../domain/entities/Order";

interface AppStoreValue {
  latestOrder: Order | null;
  setLatestOrder: (order: Order | null) => void;
}

const AppStoreContext = createContext<AppStoreValue | undefined>(undefined);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  const value = useMemo(
    () => ({
      latestOrder,
      setLatestOrder,
    }),
    [latestOrder]
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used within AppStoreProvider.");
  }
  return context;
}
