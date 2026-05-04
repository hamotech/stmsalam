import { Redirect } from 'expo-router';

/** Deep link compatibility: `/profile` → Profile tab. */
export default function ProfileRedirect() {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    console.log('🚨 NAV OVERRIDE SOURCE', {
      file: 'app/profile.tsx',
      reason: 'Redirect_href',
      target: '/(tabs)/profile',
    });
  }
  return <Redirect href="/(tabs)/profile" />;
}
