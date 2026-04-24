// data/services/api
// Example API service for future integrations (analytics, notifications, etc).

import { Order } from "../../../domain/entities/Order";

export class OrderApiService {
  async notifyOrderPlaced(order: Order): Promise<void> {
    // Mock API call.
    await new Promise((resolve) => setTimeout(resolve, 200));

    // For now we only log in dev to show where integration can happen.
    console.log("Order synced to API:", order.id);
  }
}
