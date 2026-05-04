import { Platform } from 'react-native';
import * as Location from 'expo-location';
import type { LocationGeocodedAddress } from 'expo-location';
import { reverseGeocodeGoogle } from '@/src/services/googleMapsPlaces';

function formatExpoAddress(a: LocationGeocodedAddress | undefined): string | null {
  if (!a) return null;
  if (a.formattedAddress) return a.formattedAddress;
  const street = [a.streetNumber, a.street].filter(Boolean).join(' ').trim();
  const parts = [a.name, street || null, a.district, a.city, a.postalCode, a.country].filter(
    (x): x is string => Boolean(x && String(x).trim())
  );
  if (parts.length) return parts.join(', ');
  return null;
}

function getPositionWeb(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation is not available in this browser.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lon: p.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: false, maximumAge: 120_000, timeout: 15_000 }
    );
  });
}

async function reverseWithNominatim(lat: number, lon: number): Promise<string | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'STM-Salam-Mobile/1.0 (contact: highlitesg786@gmail.com)',
      'Accept-Language': 'en',
    },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { display_name?: string };
  return data.display_name?.trim() || null;
}

export type CurrentPlaceResult =
  | { ok: true; address: string; lat: number; lon: number }
  | { ok: false; message: string };

/**
 * Gets GPS coordinates (foreground) and resolves a delivery-friendly address string.
 * Web: uses the browser Geolocation API + Google reverse geocode (if key) or Nominatim.
 */
export async function getCurrentPlaceAddress(): Promise<CurrentPlaceResult> {
  const perm = await Location.requestForegroundPermissionsAsync();
  if (perm.status !== 'granted') {
    return { ok: false, message: 'Location permission is needed to use your current position.' };
  }

  let lat: number;
  let lon: number;
  try {
    if (Platform.OS === 'web') {
      const p = await getPositionWeb();
      lat = p.lat;
      lon = p.lon;
    } else {
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
    }
  } catch {
    return {
      ok: false,
      message:
        Platform.OS === 'web'
          ? 'Could not read your location. Allow location for this site (HTTPS), then try again.'
          : 'Could not read GPS. Try again or enter your address manually.',
    };
  }

  const googleLine = await reverseGeocodeGoogle(lat, lon);
  if (googleLine) return { ok: true, address: googleLine, lat, lon };

  if (Platform.OS !== 'web') {
    try {
      const rev = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
      const line = formatExpoAddress(rev[0]);
      if (line) return { ok: true, address: line, lat, lon };
    } catch {
      /* fall through */
    }
  }

  const nom = await reverseWithNominatim(lat, lon);
  if (nom) return { ok: true, address: nom, lat, lon };

  return {
    ok: false,
    message: 'Could not turn your location into a street address. Type your address or add a Google Maps API key.',
  };
}
