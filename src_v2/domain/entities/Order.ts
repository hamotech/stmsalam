// domain/entities
// Domain model stays framework-agnostic and represents business data.

export type OrderStatus = "pending" | "confirmed" | "failed";

export interface Order {
  id: string;
  itemName: string;
  quantity: number;
  createdAt: number;
  status: OrderStatus;
}

export interface PlaceOrderInput {
  itemName: string;
  quantity: number;
}
