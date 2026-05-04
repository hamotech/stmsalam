// screens/OrderScreen.jsx
// Presentation layer: renders UI and delegates business/data actions to hook + domain.

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderListItem from "../components/OrderListItem";
import { useOrder } from "../hooks/useOrder";

export default function OrderScreen() {
  const [itemName, setItemName] = useState("Teh Tarik");
  const [quantity, setQuantity] = useState("1");
  const [unitPrice, setUnitPrice] = useState("4.5");
  const [mode, setMode] = useState("delivery");

  const { loading, error, orders, successMessage, submitOrder } = useOrder();

  useEffect(() => {
    console.log("[V2 UI] OrderScreen rendered");
  });

  const formInput = useMemo(
    () => ({
      itemName,
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      mode,
    }),
    [itemName, quantity, unitPrice, mode]
  );

  const onSubmit = useCallback(async () => {
    const result = await submitOrder(formInput);
    if (result.success) {
      Alert.alert("Success", "Order placed successfully.");
    } else {
      Alert.alert("Order failed", result.error ?? "Please try again.");
    }
  }, [formInput, submitOrder]);

  const keyExtractor = useCallback((item) => item.id, []);
  const renderOrderItem = useCallback(
    ({ item }) => <OrderListItem order={item} />,
    []
  );

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <View style={styles.topBlock}>
      <Text style={styles.title}>Order (V2 - Clean Architecture)</Text>
      <Text style={styles.subtitle}>UI -> Hook -> Domain -> Repository -> Service</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Item Name</Text>
        <TextInput value={itemName} onChangeText={setItemName} style={styles.input} />

        <Text style={styles.label}>Quantity</Text>
        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="number-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Unit Price</Text>
        <TextInput
          value={unitPrice}
          onChangeText={setUnitPrice}
          keyboardType="decimal-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Mode (delivery/pickup/dine-in)</Text>
        <TextInput value={mode} onChangeText={setMode} style={styles.input} autoCapitalize="none" />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={onSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{loading ? "Submitting..." : "Place Order"}</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
      </View>

      <FlatList
        data={orders}
        keyExtractor={keyExtractor}
        renderItem={renderOrderItem}
        ListEmptyComponent={<Text style={styles.empty}>No orders yet.</Text>}
        contentContainerStyle={styles.list}
        style={styles.listFlex}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  topBlock: {
    flexShrink: 0,
  },
  listFlex: {
    flex: 1,
    minHeight: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#013220",
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 12,
    color: "#64748b",
    fontSize: 12,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#334155",
    marginTop: 8,
    marginBottom: 4,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#013220",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },
  error: {
    color: "#dc2626",
    marginBottom: 6,
    fontWeight: "600",
  },
  success: {
    color: "#16a34a",
    marginBottom: 6,
    fontWeight: "600",
  },
  list: {
    paddingTop: 6,
    paddingBottom: 40,
  },
  empty: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 16,
  },
});
