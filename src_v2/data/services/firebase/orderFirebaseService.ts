// data/services/firebase
// Data layer implementation detail that simulates Firebase write operations.

import { PlaceOrderInput } from "../../../domain/entities/Order";

export interface FirebaseOrderRecord extends PlaceOrderInput {
  id: string;
  createdAt: number;
}

export class OrderFirebaseService {
  async createOrder(input: PlaceOrderInput): Promise<FirebaseOrderRecord> {
    // Simulate network/database latency.
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate occasional transient failure from remote services.
    if (Math.random() < 0.1) {
      throw new Error("Firebase temporary error. Please retry.");
    }

    return {
      id: `ord_${Date.now()}`,
      itemName: input.itemName,
      quantity: input.quantity,
      createdAt: Date.now(),
    };
  }
}
