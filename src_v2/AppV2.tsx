// AppV2 entry point
// Compose global providers + navigation in one place.

import React from "react";
import { AppContainerProvider } from "./core/di/AppContainerProvider";
import { AppStoreProvider } from "./hooks/useAppStore";
import { AppNavigator } from "./navigation/AppNavigator";

export default function AppV2() {
  return (
    <AppContainerProvider>
      <AppStoreProvider>
        <AppNavigator />
      </AppStoreProvider>
    </AppContainerProvider>
  );
}
