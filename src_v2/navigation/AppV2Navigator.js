// navigation/AppV2Navigator.js
// AppV2-only navigation container. Isolated from the legacy app/router.

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { ROUTES } from "../core/routes";
import OrderScreen from "../screens/OrderScreen";

const Stack = createNativeStackNavigator();

function HomePlaceholderScreen() {
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Home Screen (Placeholder)</Text>
      <Text style={styles.sub}>Add your next V2 screens here.</Text>
    </View>
  );
}

class NavigatorErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.centered}>
          <Text style={styles.title}>Navigation failed to load</Text>
          <Text style={styles.sub}>Please restart app or use legacy fallback.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

function AppV2Stack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.ORDER}>
        <Stack.Screen
          name={ROUTES.ORDER}
          component={OrderScreen}
          options={{ title: "Order" }}
        />
        <Stack.Screen
          name={ROUTES.HOME}
          component={HomePlaceholderScreen}
          options={{ title: "Home" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppV2Navigator() {
  return (
    <NavigatorErrorBoundary>
      <AppV2Stack />
    </NavigatorErrorBoundary>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
  },
  sub: {
    marginTop: 8,
    color: "#64748b",
    textAlign: "center",
  },
});
