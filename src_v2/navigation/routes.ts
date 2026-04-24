// navigation/routes
// Typed route names in one source of truth.

export const ROUTE_NAMES = {
  Home: "Home",
  Order: "Order",
} as const;

export type RouteName = keyof typeof ROUTE_NAMES;

export type RootStackParamList = {
  Home: undefined;
  Order: undefined;
};
