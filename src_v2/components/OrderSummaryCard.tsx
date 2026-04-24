import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Order } from "../domain/entities/Order";

interface OrderSummaryCardProps {
  order: Order;
}

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Latest Order</Text>
      <Text>Order ID: {order.id}</Text>
      <Text>Item: {order.itemName}</Text>
      <Text>Quantity: {order.quantity}</Text>
      <Text>Status: {order.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  title: {
    fontWeight: "700",
    marginBottom: 8,
  },
});
