import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { AppContainer, createAppContainer } from "./container";

const AppContainerContext = createContext<AppContainer | undefined>(undefined);

export function AppContainerProvider({ children }: { children: ReactNode }) {
  const container = useMemo(() => createAppContainer(), []);
  return <AppContainerContext.Provider value={container}>{children}</AppContainerContext.Provider>;
}

export function useAppContainer() {
  const context = useContext(AppContainerContext);
  if (!context) {
    throw new Error("useAppContainer must be used within AppContainerProvider.");
  }
  return context;
}
