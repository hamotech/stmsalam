import { useMemo } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { resolveAppRole, type AppRole } from '@/src/auth/resolveAppRole';

/** Resolves `guest` | `customer` | `admin` | `kitchen` using Auth + Firestore profile + ID token custom claims (`admin`). */
export function useAppRole(): AppRole {
  const { user, profile, idTokenClaims } = useAuth();
  return useMemo(
    () => resolveAppRole(user, profile, idTokenClaims),
    [user, profile, idTokenClaims]
  );
}
