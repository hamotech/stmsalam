/**
 * Google Maps / Places (REST). Set EXPO_PUBLIC_GOOGLE_MAPS_API_KEY and restrict the key
 * (Android package / iOS bundle / HTTP referrer for web) in Google Cloud Console.
 */

function mapsKey(): string {
  return process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? '';
}

export function isGoogleMapsConfigured(): boolean {
  return mapsKey().length > 0;
}

export async function fetchPlacePredictions(
  input: string
): Promise<Array<{ description: string; place_id: string }>> {
  const key = mapsKey();
  if (!key || input.trim().length < 2) return [];
  const params = new URLSearchParams({
    input: input.trim(),
    components: 'country:sg',
    key,
  });
  const res = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`);
  if (!res.ok) return [];
  const data = (await res.json()) as {
    predictions?: { description: string; place_id: string }[];
    status: string;
  };
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') return [];
  return data.predictions ?? [];
}

export async function fetchPlaceLocation(
  placeId: string
): Promise<{ lat: number; lon: number; formattedAddress: string } | null> {
  const key = mapsKey();
  if (!key) return null;
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'formatted_address,geometry',
    key,
  });
  const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`);
  if (!res.ok) return null;
  const data = (await res.json()) as {
    status: string;
    result?: {
      formatted_address: string;
      geometry?: { location: { lat: number; lng: number } };
    };
  };
  if (data.status !== 'OK' || !data.result?.geometry?.location) return null;
  const loc = data.result.geometry.location;
  return {
    lat: loc.lat,
    lon: loc.lng,
    formattedAddress: data.result.formatted_address,
  };
}

/** Reverse geocode coordinates to a single-line address (Geocoding API). */
export async function reverseGeocodeGoogle(lat: number, lon: number): Promise<string | null> {
  const key = mapsKey();
  if (!key) return null;
  const params = new URLSearchParams({
    latlng: `${lat},${lon}`,
    key,
  });
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`);
  if (!res.ok) return null;
  const data = (await res.json()) as {
    status: string;
    results?: { formatted_address: string }[];
  };
  if (data.status !== 'OK' || !data.results?.[0]) return null;
  return data.results[0].formatted_address;
}

/** Geocode a free-text address (used when Places is unavailable or for verify). */
export async function geocodeWithGoogle(query: string): Promise<{ lat: number; lon: number } | null> {
  const key = mapsKey();
  if (!key) return null;
  const q = `${query.trim()}, Singapore`;
  if (q.length < 6) return null;
  const params = new URLSearchParams({ address: q, region: 'sg', key });
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`);
  if (!res.ok) return null;
  const data = (await res.json()) as {
    status: string;
    results?: { geometry: { location: { lat: number; lng: number } } }[];
  };
  if (data.status !== 'OK' || !data.results?.[0]) return null;
  const loc = data.results[0].geometry.location;
  return { lat: loc.lat, lon: loc.lng };
}

/** Opens Google Maps search (app or web). */
export function googleMapsSearchUrl(query: string): string {
  const q = query.trim();
  if (!q) return 'https://www.google.com/maps';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${q}, Singapore`)}`;
}
