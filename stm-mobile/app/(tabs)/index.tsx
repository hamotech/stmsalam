import { Redirect } from 'expo-router';

/** `(tabs)` has no default child file named `index`; keep `/…(tabs)` / legacy links working. */
export default function TabsIndexRedirect() {
  return <Redirect href="/(tabs)/home" />;
}
