// data/repositories/orderRepository.js
// Repository layer: abstracts data source calls from domain/presentation layers.

import {
  getOrders as getOrdersFromService,
  placeOrder as placeOrderInService,
  updateOrderStatus as updateOrderStatusInService,
} from "../services/orderService";

export async function placeOrder(orderInput) {
  try {
    console.log("[V2 REPO] repository called: placeOrder");
    return await placeOrderInService(orderInput);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Repository placeOrder failed.",
    };
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    console.log("[V2 REPO] repository called: updateOrderStatus");
    return await updateOrderStatusInService(orderId, status);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Repository updateOrderStatus failed.",
    };
  }
}

export async function getOrders(maxCount = 20) {
  try {
    console.log("[V2 REPO] repository called: getOrders");
    return await getOrdersFromService(maxCount);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Repository getOrders failed.",
    };
  }
}
