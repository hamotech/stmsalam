// domain/usecases
// Use case contains business rules and validation, independent from UI and data source.

import { ORDER_LIMITS } from "../../core/constants/appConstants";
import { Order, PlaceOrderInput } from "../entities/Order";
import { IOrderRepository } from "../repositories/IOrderRepository";

export class PlaceOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(input: PlaceOrderInput): Promise<Order> {
    const itemName = input.itemName.trim();
    if (!itemName) {
      throw new Error("Item name is required.");
    }

    if (
      input.quantity < ORDER_LIMITS.minQuantity ||
      input.quantity > ORDER_LIMITS.maxQuantity
    ) {
      throw new Error(
        `Quantity must be between ${ORDER_LIMITS.minQuantity} and ${ORDER_LIMITS.maxQuantity}.`
      );
    }

    return this.orderRepository.placeOrder({
      itemName,
      quantity: input.quantity,
    });
  }
}
