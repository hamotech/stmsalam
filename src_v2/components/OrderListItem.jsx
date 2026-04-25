// components/OrderListItem.jsx
// Presentation-only component for displaying one order row.

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function OrderListItem({ order }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.id}>#{String(order?.id ?? "").slice(-8).toUpperCase()}</Text>
        <Text style={styles.status}>{order?.status ?? "PENDING"}</Text>
      </View>
      <Text style={styles.meta}>Mode: {order?.mode ?? "delivery"}</Text>
      <Text style={styles.meta}>Total: ${Number(order?.total ?? 0).toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  id: {
    fontWeight: "800",
    color: "#013220",
  },
  status: {
    fontWeight: "700",
    color: "#334155",
  },
  meta: {
    color: "#475569",
    fontSize: 12,
    marginTop: 2,
  },
});
