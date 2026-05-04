import React from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function AppBottomSheetProvider({ children }: { children: React.ReactNode }) {
  return <BottomSheetModalProvider>{children}</BottomSheetModalProvider>;
}
