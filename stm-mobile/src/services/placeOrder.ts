/**
 * @deprecated Use `placeGrabOrderAtCheckout` (Cloud Function `createGrabOrder`). No client `orders` writes.
 */
export type PlaceOrderPayload = Record<string, unknown> & {
  items?: { name: string; qty: number; price: number }[];
  total?: string | number;
  mode?: string;
  status?: string;
};

export type PlacedOrder = PlaceOrderPayload & {
  id: string;
  userId: string;
  totalAmount: number;
  trackingToken: string;
  createdAt: string;
  status: string;
  isNewForAdmin: boolean;
  chatEnabled: boolean;
  unreadAdmin: number;
  unreadCustomer: number;
};

export async function placeOrder(_orderPayload: PlaceOrderPayload): Promise<PlacedOrder> {
  throw new Error(
    'placeOrder() is removed — orders are created only via the createGrabOrder callable. Use the Grab checkout flow.'
  );
}
