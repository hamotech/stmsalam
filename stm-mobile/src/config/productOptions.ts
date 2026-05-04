/**
 * Shared product customization options (UI + pricing) — same rules as mobile product flow.
 */

import type { CartLineOptions } from '@/src/context/CartContext';
import { sanitizeCartOptions, type ProductLike } from '@/src/utils/productOptionsEngine';

export const PRODUCT_SIZES = ['Regular', 'Large'] as const;
export const PRODUCT_SUGARS = ['Normal', 'Less sweet', 'Kosong'] as const;
export const PRODUCT_ICE = ['Normal', 'Less ice', 'No ice'] as const;

export type ProductSize = (typeof PRODUCT_SIZES)[number];
export type ProductSugar = (typeof PRODUCT_SUGARS)[number];
export type ProductIce = (typeof PRODUCT_ICE)[number];

export const PRODUCT_ADDONS: { id: string; label: string; price: number }[] = [
  { id: 'pearls', label: 'Extra pearls', price: 0.5 },
  { id: 'siewdai', label: 'Extra concentrated', price: 0 },
];

export type OptionSelection = {
  size: ProductSize;
  sugar: ProductSugar;
  ice: ProductIce;
  addonIds: string[];
};

export function defaultOptionSelection(): OptionSelection {
  return {
    size: 'Regular',
    sugar: 'Normal',
    ice: 'Normal',
    addonIds: [],
  };
}

export function computeUnitPrice(basePrice: number, sel: OptionSelection): number {
  let p = Number(basePrice) || 0;
  if (sel.size === 'Large') p += 0.5;
  PRODUCT_ADDONS.forEach((a) => {
    if (sel.addonIds.includes(a.id)) p += a.price;
  });
  return Math.round(p * 100) / 100;
}

export function selectionToCartOptions(sel: OptionSelection): CartLineOptions {
  const addons = sel.addonIds.length
    ? PRODUCT_ADDONS.filter((a) => sel.addonIds.includes(a.id)).map((a) => a.label)
    : undefined;
  return {
    size: sel.size,
    sugar: sel.sugar,
    ice: sel.ice,
    addons,
  };
}

/** Quick-add sheet + checkout safety: same sanitization as cart / Firestore path. */
export function selectionToCartOptionsForProduct(
  sel: OptionSelection,
  product: Pick<ProductLike, 'name' | 'type' | 'category'>
): CartLineOptions {
  const base = selectionToCartOptions(sel);
  return sanitizeCartOptions(product, base) ?? base;
}
