import { shopInfo } from '../data/menuData'

/** Great-circle distance between two WGS84 points, in kilometres. */
export function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/** Approx. Singapore mainland bounding box (reject Nominatim false positives). */
function inSingaporeBBox(lat, lon) {
  return lat >= 1.12 && lat <= 1.49 && lon >= 103.55 && lon <= 104.2
}

export function isGoogleMapsGeocodingConfigured() {
  const k = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  return typeof k === 'string' && k.trim().length > 8
}

/**
 * Google Geocoding API (same as stm-mobile). Restrict key by HTTP referrer for this site.
 * @returns {{ lat: number, lon: number } | null}
 */
async function geocodeWithGoogle(query) {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim()
  if (!key) return null
  const raw = query.trim()
  if (raw.length < 4) return null
  const address = `${raw}, Singapore`
  const params = new URLSearchParams({ address, region: 'sg', key })
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`)
  if (!res.ok) return null
  const data = await res.json()
  if (data.status !== 'OK' || !data.results?.[0]?.geometry?.location) return null
  const loc = data.results[0].geometry.location
  const lat = Number(loc.lat)
  const lon = Number(loc.lng)
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null
  if (!inSingaporeBBox(lat, lon)) return null
  return { lat, lon }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function nominatimSearch(searchString, { countrySgOnly = true } = {}) {
  const q = searchString.trim()
  if (q.length < 3) return null
  const cc = countrySgOnly ? '&countrycodes=sg' : ''
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5${cc}&q=${encodeURIComponent(q)}`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'STM-Salam-Ordering/1.0 (contact: highlitesg786@gmail.com)' },
  })
  if (!res.ok) return null
  const data = await res.json()
  if (!Array.isArray(data) || !data.length) return null
  for (const row of data) {
    const lat = parseFloat(row.lat)
    const lon = parseFloat(row.lon)
    if (Number.isNaN(lat) || Number.isNaN(lon)) continue
    if (inSingaporeBBox(lat, lon)) return { lat, lon }
  }
  return null
}

/**
 * Try several query shapes — full address, 6-digit postal, last line only, then global search.
 */
async function geocodeNominatimVariants(query) {
  const raw = query.trim()
  const variantSet = new Set()
  variantSet.add(`${raw}, Singapore`)
  const postal = raw.match(/\b(\d{6})\b/)
  if (postal) {
    variantSet.add(`Singapore ${postal[1]}`)
    variantSet.add(postal[1])
  }
  const parts = raw.split(',').map((s) => s.trim()).filter(Boolean)
  if (parts.length > 1) {
    variantSet.add(`${parts[parts.length - 1]}, Singapore`)
    if (parts.length > 2) {
      variantSet.add(`${parts[parts.length - 2]}, ${parts[parts.length - 1]}, Singapore`)
    }
  }
  const variants = [...variantSet]

  for (const v of variants) {
    const pt = await nominatimSearch(v, { countrySgOnly: true })
    if (pt) return pt
    await sleep(400)
  }
  for (const v of variants) {
    const pt = await nominatimSearch(v, { countrySgOnly: false })
    if (pt) return pt
    await sleep(400)
  }
  return null
}

/**
 * Forward-geocode (Singapore). Prefers Google when `VITE_GOOGLE_MAPS_API_KEY` is set; otherwise OpenStreetMap Nominatim with fallbacks.
 * @returns {Promise<{ lat: number, lon: number } | null>}
 */
export async function geocodeAddressSingapore(query) {
  const trimmed = query.trim()
  if (trimmed.length < 4) return null

  const googleHit = await geocodeWithGoogle(trimmed)
  if (googleHit) return googleHit

  return geocodeNominatimVariants(trimmed)
}

/**
 * @param {{ mode: 'delivery'|'pickup', subtotal: number, distanceKm: number|null }} args
 */
export function computeDeliveryQuote({ mode, subtotal, distanceKm }) {
  const minDelivery = Number(shopInfo.minOrderDelivery ?? shopInfo.minOrder) || 10
  const radius = Number(shopInfo.freeDeliveryRadiusKm) || 5
  const fee = Number(shopInfo.deliveryFee) || 0

  if (mode !== 'delivery') {
    return {
      deliveryFee: 0,
      freeDelivery: true,
      reason: 'pickup',
      blocked: false,
    }
  }

  if (subtotal < minDelivery) {
    return {
      deliveryFee: null,
      freeDelivery: false,
      reason: 'below_min',
      blocked: true,
      minDelivery,
    }
  }

  if (distanceKm == null || Number.isNaN(distanceKm)) {
    return {
      deliveryFee: fee,
      freeDelivery: false,
      reason: 'unverified',
      blocked: false,
    }
  }

  if (distanceKm <= radius) {
    return {
      deliveryFee: 0,
      freeDelivery: true,
      reason: 'in_zone',
      blocked: false,
    }
  }

  return {
    deliveryFee: fee,
    freeDelivery: false,
    reason: 'outside_zone',
    blocked: false,
  }
}
