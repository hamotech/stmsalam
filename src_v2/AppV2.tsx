// AppV2 entry point
// Compose global providers + navigation in one place.

import React from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppContainerProvider } from "./core/di/AppContainerProvider";
import { AppStoreProvider } from "./hooks/useAppStore";
import AppV2Navigator from "./navigation/AppV2Navigator";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    ...Platform.select({
      web: {
        minHeight: "100dvh",
        width: "100%",
        maxWidth: "100%",
      },
      default: {},
    }),
  },
  fill: {
    flex: 1,
    ...Platform.select({
      web: { minHeight: 0 },
      default: {},
    }),
  },
});

export default function AppV2() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <View style={styles.fill}>
          <AppContainerProvider>
            <AppStoreProvider>
              <StatusBar style="dark" />
              <AppV2Navigator />
            </AppStoreProvider>
          </AppContainerProvider>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
