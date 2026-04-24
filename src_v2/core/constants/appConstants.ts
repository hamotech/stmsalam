// core/constants
// App-wide constants used across multiple layers.

export const APP_NAME = "Teh Tarik App V2";

export const ROUTES = {
  HOME: "Home",
  ORDER: "Order",
} as const;

export const ORDER_LIMITS = {
  minQuantity: 1,
  maxQuantity: 10,
};
