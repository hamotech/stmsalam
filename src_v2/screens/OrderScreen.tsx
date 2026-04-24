// screens (presentation)
// Screen delegates all business work to ViewModel hook.

import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { useOrderViewModel } from "../hooks/useOrderViewModel";

export function OrderScreen() {
  const [itemName, setItemName] = useState("Teh Tarik");
  const [quantity, setQuantity] = useState("1");

  const { placeOrder, isSubmitting, errorMessage } = useOrderViewModel();

  const handlePlaceOrder = async () => {
    const order = await placeOrder(itemName, Number(quantity));
    if (order) {
      Alert.alert("Success", `Order ${order.id} placed successfully.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place New Order</Text>

      <Text style={styles.label}>Item Name</Text>
      <TextInput value={itemName} onChangeText={setItemName} style={styles.input} />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="number-pad"
        style={styles.input}
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <PrimaryButton
        title={isSubmitting ? "Placing Order..." : "Place Order"}
        onPress={handlePlaceOrder}
        disabled={isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  error: {
    color: "#c62828",
    marginVertical: 6,
  },
});
