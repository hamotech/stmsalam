// hooks/useOrder.js
// MVVM ViewModel-style hook: keeps UI thin by handling async state and actions.

import { useCallback, useEffect, useState } from "react";
import { placeOrder as placeOrderUseCase } from "../domain/order/placeOrder";
import * as orderRepository from "../data/repositories/orderRepository";

export function useOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [orders, setOrders] = useState([]);

  const loadOrders = useCallback(async () => {
    console.log("[V2 HOOK] useOrder triggered: loadOrders");
    setLoading(true);
    setError(null);
    try {
      const result = await orderRepository.getOrders();
      if (!result.success) {
        setError(result.error ?? "Unable to load orders.");
        return { success: false, error: result.error };
      }
      setOrders(result.data ?? []);
      return { success: true, data: result.data ?? [] };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unable to load orders.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const submitOrder = useCallback(async (input) => {
    console.log("[V2 HOOK] useOrder triggered: submitOrder");
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const result = await placeOrderUseCase(input);
      if (!result.success) {
        setError(result.error ?? "Order failed.");
        return result;
      }

      setSuccessMessage("Order placed successfully.");
      await loadOrders();
      return result;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Order failed.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [loadOrders]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    loading,
    error,
    orders,
    successMessage,
    submitOrder,
    loadOrders,
  };
}
