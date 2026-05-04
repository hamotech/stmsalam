import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

/**
 * Scroll / footer padding above the bottom tab bar.
 * `useBottomTabBarHeight()` already includes the home-indicator inset where applicable.
 */
export function useTabBarBottomInset(extra = 12): number {
  return useBottomTabBarHeight() + extra;
}
