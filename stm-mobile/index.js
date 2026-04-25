import { registerRootComponent } from "expo";

// false = full Expo Router app (Home + Menu + Orders + Checkout), like the web customer shell.
// true = load src_v2 AppV2 (order-engine demo only).
const USE_NEW_APP = false;

if (USE_NEW_APP) {
  try {
    // Guarded load for migration safety.
    const AppV2 = require("../src_v2/AppV2").default;
    registerRootComponent(AppV2);
  } catch (error) {
    console.error("AppV2 failed to load. Falling back to legacy app.", error);
    require("expo-router/entry");
  }
} else {
  require("expo-router/entry");
}
