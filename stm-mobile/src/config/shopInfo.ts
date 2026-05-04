/**
 * STM Salam shop facts — kept in sync with web `menuData.js` for support AI copy.
 * Mobile-only; does not import from the web package.
 */
export const shopInfo = {
  name: 'STM Salam',
  hours: 'Daily 9:00 AM – 11:00 PM',
  phone: '+65 9191 5766',
  whatsapp: '+65 9191 5766',
  outletName: 'STM Salam — Blk 50A',
  outletAddress: 'STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050',
  /** WGS84 — same as web menuData for delivery radius */
  outletLat: 1.30892,
  outletLng: 103.91548,
  freeDeliveryRadiusKm: 5,
  deliveryFee: 2.0,
  minOrderDelivery: 10.0,
} as const;
