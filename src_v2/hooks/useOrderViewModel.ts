// hooks/useOrderViewModel
// MVVM ViewModel hook that orchestrates UI state and use-case execution.

import { useMemo, useState } from "react";
import { getErrorMessage } from "../core/helpers/errorMessage";
import { Order } from "../domain/entities/Order";
import { PlaceOrderUseCase } from "../domain/usecases/placeOrder";
import { useAppContainer } from "../core/di/AppContainerProvider";
import { useAppStore } from "./useAppStore";

export function useOrderViewModel() {
  const { placeOrderUseCase } = useAppContainer();
  const useCase = useMemo<PlaceOrderUseCase>(() => placeOrderUseCase, [placeOrderUseCase]);
  const { setLatestOrder } = useAppStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const placeOrder = async (itemName: string, quantity: number): Promise<Order | null> => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const order = await useCase.execute({ itemName, quantity });
      setLatestOrder(order);
      return order;
    } catch (error) {
      const message = getErrorMessage(error, "Unexpected error while placing order.");
      setErrorMessage(message);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    placeOrder,
    isSubmitting,
    errorMessage,
  };
}
