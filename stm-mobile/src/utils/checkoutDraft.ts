/**
 * // NEW — Grab checkout draft: typed AsyncStorage + schema validation.
 * Key: stm_grab_checkout_draft (single source of truth for Grab payment entry).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const GRAB_CHECKOUT_DRAFT_KEY = 'stm_grab_checkout_draft';

export type GrabCheckoutDraft = {
  subtotal: number;
  deliveryFee: number;
  total: number;
  /** @deprecated use orderType; must match `orderType` when both set */
  mode: 'delivery' | 'pickup';
  orderType: 'delivery' | 'pickup';
  customer: { name: string; phone: string; address?: string; notes?: string };
  /** Customer drop-off pin when geocoded / GPS (delivery only). Pickup: null. */
  userLocation: { lat: number; lng: number } | null;
  /** Haversine km from store to `userLocation` (delivery only). Pickup: null. */
  distanceKm: number | null;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0;
}

/** // NEW — Validate raw JSON; returns null if invalid (never throws). */
export function parseGrabCheckoutDraft(raw: unknown): GrabCheckoutDraft | null {
  if (raw == null || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const customer = o.customer;
  if (customer == null || typeof customer !== 'object') return null;
  const c = customer as Record<string, unknown>;
  if (!isNonEmptyString(c.name) || !isNonEmptyString(c.phone)) return null;
  if (o.mode !== 'delivery' && o.mode !== 'pickup') return null;
  if (!isFiniteNumber(o.subtotal) || !isFiniteNumber(o.deliveryFee) || !isFiniteNumber(o.total)) {
    return null;
  }
  if (o.total < o.subtotal) return null;
  if (o.mode === 'delivery' && !isNonEmptyString(c.address)) return null;

  const fromOrderType =
    o.orderType === 'pickup' || o.orderType === 'delivery' ? o.orderType : o.mode;
  if (fromOrderType !== o.mode) return null;

  let userLocation: { lat: number; lng: number } | null = null;
  const ul = o.userLocation;
  if (ul != null && typeof ul === 'object' && fromOrderType === 'delivery') {
    const u = ul as Record<string, unknown>;
    const lat = u.lat;
    const lng = u.lng;
    if (typeof lat === 'number' && typeof lng === 'number' && Number.isFinite(lat) && Number.isFinite(lng)) {
      userLocation = { lat, lng };
    }
  }

  let distanceKm: number | null = null;
  if (fromOrderType === 'delivery' && o.distanceKm != null) {
    if (typeof o.distanceKm === 'number' && Number.isFinite(o.distanceKm) && o.distanceKm >= 0) {
      distanceKm = o.distanceKm;
    } else {
      return null;
    }
  }

  if (fromOrderType === 'delivery') {
    if (!userLocation || distanceKm == null || Number.isNaN(distanceKm)) {
      return null;
    }
  }

  return {
    subtotal: o.subtotal,
    deliveryFee: o.deliveryFee,
    total: o.total,
    mode: o.mode,
    orderType: fromOrderType,
    customer: {
      name: String(c.name).trim(),
      phone: String(c.phone).trim(),
      address: isNonEmptyString(c.address) ? String(c.address).trim() : undefined,
      notes: typeof c.notes === 'string' ? c.notes.trim() : undefined,
    },
    userLocation: fromOrderType === 'pickup' ? null : userLocation,
    distanceKm: fromOrderType === 'pickup' ? null : distanceKm,
  };
}

/** // NEW */
export async function getGrabCheckoutDraft(): Promise<GrabCheckoutDraft | null> {
  try {
    const raw = await AsyncStorage.getItem(GRAB_CHECKOUT_DRAFT_KEY);
    if (!raw) return null;
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.warn('[checkoutDraft] invalid JSON', e);
      return null;
    }
    return parseGrabCheckoutDraft(parsed);
  } catch (e) {
    console.warn('[checkoutDraft] getGrabCheckoutDraft', e);
    return null;
  }
}

/** // NEW */
export async function setGrabCheckoutDraft(draft: GrabCheckoutDraft): Promise<void> {
  const v = parseGrabCheckoutDraft(draft);
  if (!v) throw new Error('Invalid checkout draft');
  await AsyncStorage.setItem(GRAB_CHECKOUT_DRAFT_KEY, JSON.stringify(v));
}

/** // NEW */
export async function clearGrabCheckoutDraft(): Promise<void> {
  try {
    await AsyncStorage.removeItem(GRAB_CHECKOUT_DRAFT_KEY);
  } catch (e) {
    console.warn('[checkoutDraft] clearGrabCheckoutDraft', e);
  }
}

/** Aliases for spec naming */
export const getDraft = getGrabCheckoutDraft;
export const setDraft = setGrabCheckoutDraft;
export const clearDraft = clearGrabCheckoutDraft;
