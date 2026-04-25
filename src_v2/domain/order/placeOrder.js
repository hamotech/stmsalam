// domain/order/placeOrder.js
// Domain layer: owns Order business rules and validation.
// It never talks to Firebase directly.

import * as orderRepository from "../../data/repositories/orderRepository";

function validateOrderInput(input) {
  const itemName = String(input?.itemName ?? "").trim();
  const quantity = Number(input?.quantity ?? 0);
  const unitPrice = Number(input?.unitPrice ?? 0);
  const mode = String(input?.mode ?? "delivery");

  if (!itemName) {
    return { ok: false, error: "Item name is required." };
  }
  if (!Number.isFinite(quantity) || quantity < 1) {
    return { ok: false, error: "Quantity must be at least 1." };
  }
  if (!Number.isFinite(unitPrice) || unitPrice < 0) {
    return { ok: false, error: "Unit price must be 0 or more." };
  }
  if (!["delivery", "pickup", "dine-in"].includes(mode)) {
    return { ok: false, error: "Mode must be delivery, pickup, or dine-in." };
  }

  return {
    ok: true,
    data: {
      itemName,
      quantity,
      unitPrice,
      mode,
    },
  };
}

function mapToOrderPayload(validated) {
  const itemTotal = validated.unitPrice * validated.quantity;

  return {
    status: "PENDING",
    items: [
      {
        name: validated.itemName,
        qty: validated.quantity,
        price: validated.unitPrice,
      },
    ],
    total: itemTotal,
    mode: validated.mode,
    paymentProofSubmitted: false,
  };
}

export async function placeOrder(input) {
  try {
    console.log("[V2 DOMAIN] placeOrder executed");
    const validation = validateOrderInput(input);
    if (!validation.ok) {
      return { success: false, error: validation.error };
    }

    const payload = mapToOrderPayload(validation.data);
    const repositoryResult = await orderRepository.placeOrder(payload);

    if (!repositoryResult?.success) {
      return {
        success: false,
        error: repositoryResult?.error ?? "Could not place order.",
      };
    }

    return {
      success: true,
      data: repositoryResult.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected placeOrder failure.",
    };
  }
}
