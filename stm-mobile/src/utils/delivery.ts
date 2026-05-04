import { shopInfo } from '@/src/config/shopInfo';
import { geocodeWithGoogle } from '@/src/services/googleMapsPlaces';

export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function geocodeAddressSingapore(query: string): Promise<{ lat: number; lon: number } | null> {
  const trimmed = query.trim();
  if (trimmed.length < 4) return null;
  const google = await geocodeWithGoogle(trimmed);
  if (google) return google;
  return geocodeNominatim(trimmed);
}

async function geocodeNominatim(query: string): Promise<{ lat: number; lon: number } | null> {
  const q = `${query}, Singapore`.trim();
  if (q.length < 8) return null;
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'STM-Salam-Mobile/1.0 (contact: highlitesg786@gmail.com)' },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { lat?: string; lon?: string }[];
  if (!Array.isArray(data) || !data[0]) return null;
  const lat = parseFloat(data[0].lat ?? '');
  const lon = parseFloat(data[0].lon ?? '');
  if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
  return { lat, lon };
}

export type DeliveryBlockReason = 'none' | 'below_min' | 'unverified' | 'out_of_range';

/** Shown when delivery address is outside the configured radius (5KM). */
export const DELIVERY_OUT_OF_RANGE_MESSAGE =
  "We don't deliver to your area (Max 5KM range). Choose pickup or move closer to our store.";

export function computeDeliveryQuote(args: {
  mode: 'delivery' | 'pickup';
  subtotal: number;
  distanceKm: number | null;
}): {
  deliveryFee: number | null;
  freeDelivery: boolean;
  reason: string;
  blocked: boolean;
  blockReason: DeliveryBlockReason;
  minDelivery?: number;
} {
  const minDelivery = Number(shopInfo.minOrderDelivery ?? 10) || 10;
  const radius = Number(shopInfo.freeDeliveryRadiusKm) || 5;

  if (args.mode !== 'delivery') {
    return {
      deliveryFee: 0,
      freeDelivery: true,
      reason: 'pickup',
      blocked: false,
      blockReason: 'none',
    };
  }

  if (args.subtotal < minDelivery) {
    return {
      deliveryFee: null,
      freeDelivery: false,
      reason: 'below_min',
      blocked: true,
      blockReason: 'below_min',
      minDelivery,
    };
  }

  if (args.distanceKm == null || Number.isNaN(args.distanceKm)) {
    return {
      deliveryFee: null,
      freeDelivery: false,
      reason: 'unverified',
      blocked: true,
      blockReason: 'unverified',
    };
  }

  if (args.distanceKm > radius) {
    return {
      deliveryFee: null,
      freeDelivery: false,
      reason: 'outside_zone',
      blocked: true,
      blockReason: 'out_of_range',
    };
  }

  return {
    deliveryFee: 0,
    freeDelivery: true,
    reason: 'in_zone',
    blocked: false,
    blockReason: 'none',
  };
}
