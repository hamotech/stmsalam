// data/repositories
// Repository maps data sources into domain entities and shields domain from infra details.

import { Order, PlaceOrderInput } from "../../domain/entities/Order";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { OrderApiService } from "../services/api/orderApiService";
import { OrderFirebaseService } from "../services/firebase/orderFirebaseService";

export class OrderRepository implements IOrderRepository {
  constructor(
    private readonly firebaseService: OrderFirebaseService,
    private readonly apiService: OrderApiService
  ) {}

  async placeOrder(input: PlaceOrderInput): Promise<Order> {
    const firebaseOrder = await this.firebaseService.createOrder(input);

    const order: Order = {
      id: firebaseOrder.id,
      itemName: firebaseOrder.itemName,
      quantity: firebaseOrder.quantity,
      createdAt: firebaseOrder.createdAt,
      status: "confirmed",
    };

    await this.apiService.notifyOrderPlaced(order);
    return order;
  }
}
