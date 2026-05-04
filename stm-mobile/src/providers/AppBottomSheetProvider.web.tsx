import React from 'react';

/** Web: @gorhom/bottom-sheet provider is not used (avoids Reanimated / native sheet issues). */
export default function AppBottomSheetProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
