// domain/repositories
// Repository contracts live in domain so business logic depends on abstractions.

import { Order, PlaceOrderInput } from "../entities/Order";

export interface IOrderRepository {
  placeOrder(input: PlaceOrderInput): Promise<Order>;
}
