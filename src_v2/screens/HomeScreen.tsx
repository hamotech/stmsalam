// screens (presentation)
// Screen handles rendering and user interactions only.

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PrimaryButton } from "../components/PrimaryButton";
import { OrderSummaryCard } from "../components/OrderSummaryCard";
import { ROUTE_NAMES, RootStackParamList } from "../navigation/routes";
import { useAppStore } from "../hooks/useAppStore";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const { latestOrder } = useAppStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Teh Tarik App V2</Text>
      <PrimaryButton
        title="Go to Order Screen"
        onPress={() => navigation.navigate(ROUTE_NAMES.Order)}
      />
      {latestOrder ? <OrderSummaryCard order={latestOrder} /> : <Text>No recent order yet.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
