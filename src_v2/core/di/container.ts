// core/di
// Simple DI container to centralize object creation and keep screens/hooks clean.

import { OrderRepository } from "../../data/repositories/OrderRepository";
import { OrderApiService } from "../../data/services/api/orderApiService";
import { OrderFirebaseService } from "../../data/services/firebase/orderFirebaseService";
import { PlaceOrderUseCase } from "../../domain/usecases/placeOrder";

export interface AppContainer {
  placeOrderUseCase: PlaceOrderUseCase;
}

export function createAppContainer(): AppContainer {
  const firebaseService = new OrderFirebaseService();
  const apiService = new OrderApiService();
  const orderRepository = new OrderRepository(firebaseService, apiService);

  return {
    placeOrderUseCase: new PlaceOrderUseCase(orderRepository),
  };
}
