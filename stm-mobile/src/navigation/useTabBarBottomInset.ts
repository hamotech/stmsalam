import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { Platform } from 'react-native';

/**
 * Scroll / footer padding above the bottom tab bar.
 *
 * Uses `useContext(BottomTabBarHeightContext)` directly instead of
 * `useBottomTabBarHeight()` because the latter throws a render error when
 * called outside a BottomTabNavigator — a throw that React 19 surfaces as an
 * uncaught render error that bypasses try/catch in the same render cycle.
 *
 * `useContext` safely returns `undefined` when the Provider is absent, which
 * we handle with a normal guard — no crash, no ErrorBoundary needed.
 */
export function useTabBarBottomInset(extra = 12): number {
  const tabBarHeight = useContext(BottomTabBarHeightContext);

  if (tabBarHeight === undefined) {
    // Outside BottomTabNavigator (web hydration, modals, splash, etc.)
    return (Platform.OS === 'web' ? 0 : 20) + extra;
  }

  return tabBarHeight + extra;
}
