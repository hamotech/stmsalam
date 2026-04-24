// navigation
// Navigation composition is isolated from screens and business logic.

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { OrderScreen } from "../screens/OrderScreen";
import { ROUTE_NAMES, RootStackParamList } from "./routes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTE_NAMES.Home}>
        <Stack.Screen name={ROUTE_NAMES.Home} component={HomeScreen} />
        <Stack.Screen name={ROUTE_NAMES.Order} component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
