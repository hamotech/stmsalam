import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { router, usePathname, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/src/context/AuthContext';
import { useCart, cartLinesToOrderItems } from '@/src/context/CartContext';
import { shopInfo } from '@/src/config/shopInfo';
import { hrefFromIntent, pathFromIntent, type AppNavIntent } from '@/src/navigation/appNavigation';
import { setGrabCheckoutDraft, clearGrabCheckoutDraft } from '@/src/utils/checkoutDraft';
import {
  placeGrabOrderAtCheckout,
  clearCheckoutIdempotencyKeyOnly,
  readPendingCheckoutForResume,
  type CheckoutPaymentRail,
} from '@/src/services/grabFlowOrderService';
import { enqueueOfflineCodOrder } from '@/src/services/offlineOrderQueue';
import { isDeviceOnline } from '@/src/utils/networkState';
import {
  computeDeliveryQuote,
  DELIVERY_OUT_OF_RANGE_MESSAGE,
  geocodeAddressSingapore,
  haversineKm,
} from '@/src/utils/delivery';
import {
  fetchPlacePredictions,
  fetchPlaceLocation,
  googleMapsSearchUrl,
  isGoogleMapsConfigured,
} from '@/src/services/googleMapsPlaces';
import { getCurrentPlaceAddress } from '@/src/services/currentLocationAddress';
import PriceSummaryCard from '@/src/components/stm/PriceSummaryCard';
import HeaderBar from '@/src/components/stm/HeaderBar';
import SupportFloatingButtons from '@/src/components/SupportFloatingButtons';
import { Brand, cardShadow } from '@/src/theme/brand';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PAYMENT_OPTIONS: {
  id: CheckoutPaymentRail;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    id: 'stripe',
    title: 'Pay online (Stripe)',
    description: 'Card or Apple Pay on your device.',
    icon: 'card-outline',
  },
  {
    id: 'qr',
    title: 'QR payment',
    description: 'PayNow / bank QR, then confirm in-app.',
    icon: 'qr-code-outline',
  },
  {
    id: 'cod',
    title: 'Cash on delivery',
    description: 'Pay the rider when your order arrives.',
    icon: 'cash-outline',
  },
];

type Mode = 'delivery' | 'pickup';

type PlaceSuggestion = { description: string; place_id: string };

/** @see /app/order-tracking/[orderId].tsx */
function isValidGrabOrderId(id: unknown): id is string {
  return typeof id === 'string' && id.trim().length > 0;
}

/** Web: navigating in the same tick as Firebase resolve can noop; defer one frame after paint. */
function runCheckoutNavDeferred(fn: () => void): void {
  if (Platform.OS === 'web') {
    requestAnimationFrame(fn);
  } else {
    fn();
  }
}

/** Post–place-order targets only; path string comes from `pathFromIntent` (single source of truth). */
type CheckoutPostPlaceIntent =
  | { kind: 'orderTracking'; orderId: string }
  | { kind: 'grabStripePayment'; orderId: string }
  | { kind: 'grabPaymentQr'; orderId: string; total: string };

/**
 * After place order (or crash-resume to the same destination):
 * - **Web:** `window.location.replace(fullUrl)`. Expo Router SPA `router.replace` is unreliable from
 *   `/checkout` (often no-op or same-route refresh); full navigation always loads the next route.
 * - **Native:** `router.replace(hrefFromIntent)` (object href for `/order-tracking/[orderId]`).
 */
function navigatePostPlaceCheckoutIntent(
  intent: CheckoutPostPlaceIntent,
  logCtx: Record<string, unknown>
): void {
  const orderId = intent.orderId.trim();
  if (!orderId) {
    console.error('[CHECKOUT:NAV_SKIPPED]', { reason: 'empty_orderId', intentKind: intent.kind, logCtx });
    return;
  }

  const appIntent = intent as AppNavIntent;
  const href = hrefFromIntent(appIntent);
  const pathStr = pathFromIntent(appIntent);

  console.log('[CHECKOUT:BEFORE_NAV]', {
    ...logCtx,
    pathStr,
    intentKind: intent.kind,
    orderId,
    hrefKind: typeof href === 'string' ? 'string' : 'object',
  });
  console.log('[NAV]', { route: pathStr, href, intentKind: intent.kind, orderId, ...logCtx });

  runCheckoutNavDeferred(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const pathOnly = pathStr.startsWith('/') ? pathStr : `/${pathStr}`;
      const fullUrl = `${window.location.origin}${pathOnly}`;
      console.warn('[CHECKOUT:NAV_WEB_LOCATION_REPLACE]', { fullUrl });
      window.location.replace(fullUrl);
      return;
    }

    try {
      router.replace(href);
    } catch (e) {
      console.error('[CHECKOUT:NAV_REPLACE_THREW]', { err: e, pathStr, intentKind: intent.kind });
    }
  });
}

function checkoutNavigateAfterPlaceOrder(
  intent: CheckoutPostPlaceIntent,
  logCtx: Record<string, unknown>
): void {
  void clearCheckoutIdempotencyKeyOnly();
  navigatePostPlaceCheckoutIntent(intent, logCtx);
}

const CHECKOUT_TIMEOUT_MS = 45_000;

function raceCheckoutFirestore<T>(promise: Promise<T>, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(`${label} (${CHECKOUT_TIMEOUT_MS}ms)`)),
        CHECKOUT_TIMEOUT_MS
      )
    ),
  ]);
}

export default function FullCheckoutScreen() {
  /** Single Expo Router instance for COD `replace`, Stripe/QR navigation, and all checkout navigation. */
  const pathname = usePathname();
  const segments = useSegments();
  const { user, profile } = useAuth();
  const { lines, subtotal, clear: clearCart, loaded } = useCart();

  const [name, setName] = useState(profile?.name || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [mode, setMode] = useState<Mode>('delivery');
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  /** Geocoded / GPS point for the delivery address (required for order write + 5km rule). */
  const [deliveryCoords, setDeliveryCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoBusy, setGeoBusy] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [paymentRail, setPaymentRail] = useState<CheckoutPaymentRail | null>(null);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const suggestTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const webAutoLocationDoneRef = useRef(false);
  const isMountedRef = useRef(true);
  /** Coarse debounce: blocks duplicate submit bursts before `isPlacingOrder` is true. */
  const lastTapRef = useRef(0);
  const crashResumeHandledRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /** App killed after `createGrabOrder` but before nav: finish Stripe / QR / tracking — do not re-run payment from checkout. */
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      if (crashResumeHandledRef.current) return;
      const nav = await readPendingCheckoutForResume();
      if (cancelled || !nav) return;
      crashResumeHandledRef.current = true;
      await clearCheckoutIdempotencyKeyOnly();
      navigatePostPlaceCheckoutIntent(nav as CheckoutPostPlaceIntent, { source: 'crash_resume' });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    console.log('⚠️ CHECKOUT MOUNTED');
  }, []);

  useEffect(
    () => () => {
      if (suggestTimer.current) clearTimeout(suggestTimer.current);
    },
    []
  );

  /** Website: if the browser already allowed geolocation, detect and fill address once (no extra tap). */
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    if (mode !== 'delivery') return;
    if (address.trim()) return;
    if (webAutoLocationDoneRef.current) return;

    let cancelled = false;
    const t = setTimeout(() => {
      void (async () => {
        try {
          if (typeof navigator === 'undefined' || !navigator.permissions?.query) return;
          const q = await navigator.permissions.query({ name: 'geolocation' });
          if (q.state !== 'granted' || cancelled) return;
          webAutoLocationDoneRef.current = true;
          const result = await getCurrentPlaceAddress();
          if (cancelled || !result.ok) return;
          setAddress(result.address);
          setDeliveryCoords({ lat: result.lat, lng: result.lon });
          const km = haversineKm(shopInfo.outletLat, shopInfo.outletLng, result.lat, result.lon);
          setDistanceKm(km);
        } catch {
          webAutoLocationDoneRef.current = false;
        }
      })();
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [mode, address]);

  const isPickup = mode === 'pickup';

  const quote = useMemo(() => {
    if (isPickup) {
      return {
        deliveryFee: 0,
        freeDelivery: true,
        reason: 'pickup',
        blocked: false as const,
        blockReason: 'none' as const,
        minDelivery: undefined,
      };
    }
    return computeDeliveryQuote({ mode: 'delivery', subtotal, distanceKm });
  }, [isPickup, subtotal, distanceKm]);

  const deliveryFee = quote.deliveryFee ?? 0;
  const total = isPickup ? subtotal : subtotal + (quote.blocked ? 0 : deliveryFee);

  const applyGeocodedDistance = async (addr: string) => {
    const pt = await geocodeAddressSingapore(addr);
    if (!pt) {
      setDistanceKm(null);
      setDeliveryCoords(null);
      Alert.alert('Address', 'Could not verify address. Please try again or use current location.');
      return;
    }
    setDeliveryCoords({ lat: pt.lat, lng: pt.lon });
    const km = haversineKm(shopInfo.outletLat, shopInfo.outletLng, pt.lat, pt.lon);
    setDistanceKm(km);
  };

  const onVerifyAddress = async () => {
    if (mode !== 'delivery' || !address.trim()) return;
    setGeoBusy(true);
    try {
      await applyGeocodedDistance(address.trim());
    } finally {
      setGeoBusy(false);
    }
  };

  const onAddressChange = (t: string) => {
    setAddress(t);
    setDistanceKm(null);
    setDeliveryCoords(null);
    setSuggestions([]);
    if (suggestTimer.current) clearTimeout(suggestTimer.current);
    if (!isGoogleMapsConfigured() || t.trim().length < 2) return;
    suggestTimer.current = setTimeout(async () => {
      const preds = await fetchPlacePredictions(t);
      setSuggestions(preds.slice(0, 6));
    }, 400);
  };

  const onPickSuggestion = async (s: PlaceSuggestion) => {
    setSuggestions([]);
    if (suggestTimer.current) clearTimeout(suggestTimer.current);
    setGeoBusy(true);
    try {
      const loc = await fetchPlaceLocation(s.place_id);
      if (loc) {
        setAddress(loc.formattedAddress);
        setDeliveryCoords({ lat: loc.lat, lng: loc.lon });
        const km = haversineKm(shopInfo.outletLat, shopInfo.outletLng, loc.lat, loc.lon);
        setDistanceKm(km);
      } else {
        setAddress(s.description);
        await applyGeocodedDistance(s.description);
      }
    } finally {
      setGeoBusy(false);
    }
  };

  const openDeliveryInGoogleMaps = () => {
    const q = address.trim();
    const url = googleMapsSearchUrl(q);
    Linking.openURL(url).catch(() => Alert.alert('Maps', 'Could not open Google Maps.'));
  };

  const onUseCurrentLocation = async () => {
    if (mode !== 'delivery') return;
    setSuggestions([]);
    if (suggestTimer.current) clearTimeout(suggestTimer.current);
    setGeoBusy(true);
    try {
      const result = await getCurrentPlaceAddress();
      if (!result.ok) {
        Alert.alert('Location', result.message);
        return;
      }
      setAddress(result.address);
      setDeliveryCoords({ lat: result.lat, lng: result.lon });
      const km = haversineKm(shopInfo.outletLat, shopInfo.outletLng, result.lat, result.lon);
      setDistanceKm(km);
    } finally {
      setGeoBusy(false);
    }
  };

  const selectPaymentRail = (id: CheckoutPaymentRail) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPaymentRail(id);
  };

  const onPlaceOrder = async () => {
    console.log('[CHECKOUT:START] onPlaceOrder', {
      isPlacingOrder,
      lines: lines.length,
      paymentRail,
      mode,
      pickup: isPickup,
    });

    if (isPlacingOrder) {
      console.log('[CHECKOUT:RETURN] duplicate_click_inflight');
      return;
    }
    if (!lines.length) {
      console.warn('[CHECKOUT:RETURN]', { reason: 'empty_cart' });
      Alert.alert('Cart', 'Your cart is empty.');
      return;
    }
    if (!paymentRail) {
      console.warn('[CHECKOUT:RETURN]', { reason: 'no_payment_rail' });
      Alert.alert('Payment', 'Choose how you would like to pay.');
      return;
    }
    if (!name.trim() || !phone.trim()) {
      console.warn('[CHECKOUT:RETURN]', { reason: 'missing_name_or_phone' });
      Alert.alert('Details', 'Please enter name and phone.');
      return;
    }

    if (!isPickup) {
      if (!address.trim()) {
        console.warn('[CHECKOUT:RETURN]', { reason: 'empty_delivery_address' });
        Alert.alert('Delivery', 'Please enter your delivery address.');
        return;
      }
      if (quote.blocked) {
        if (quote.blockReason === 'below_min') {
          console.warn('[CHECKOUT:RETURN]', { reason: 'delivery_below_min', blockReason: quote.blockReason });
          Alert.alert(
            'Minimum order',
            `Delivery requires at least SGD ${(quote.minDelivery ?? 10).toFixed(2)} subtotal.`
          );
          return;
        }
        if (quote.blockReason === 'unverified') {
          console.warn('[CHECKOUT:RETURN]', { reason: 'delivery_unverified_distance', blockReason: quote.blockReason });
          Alert.alert(
            'Delivery area',
            'Verify you are within delivery range: tap “Verify distance from kitchen” or “Use current location”.'
          );
          return;
        }
        if (quote.blockReason === 'out_of_range') {
          console.warn('[CHECKOUT:RETURN]', { reason: 'delivery_out_of_range', blockReason: quote.blockReason });
          Alert.alert('Delivery area', DELIVERY_OUT_OF_RANGE_MESSAGE);
          return;
        }
        console.warn('[CHECKOUT:RETURN]', { reason: 'delivery_blocked_other', blockReason: quote.blockReason });
        Alert.alert('Delivery', 'Delivery is not available for this order.');
        return;
      }
    }

    console.log('[CHECKOUT:SYNC_VALIDATION_OK]', {
      paymentRail,
      deliveryBlocked: quote.blocked,
      isPickup,
      subtotal,
    });
    console.log('[CHECKOUT_VALID]');

    const normalizedPhone = phone.replace(/\s|-/g, '');
    const safeSubtotal = subtotal;
    const feeNum = isPickup ? 0 : quote.blocked ? 0 : deliveryFee;

    const orderType: 'pickup' | 'delivery' = isPickup ? 'pickup' : 'delivery';
    const draft = {
      subtotal: safeSubtotal,
      deliveryFee: feeNum,
      total,
      mode,
      orderType,
      customer: {
        name: name.trim(),
        phone: normalizedPhone,
        address: isPickup ? undefined : address.trim(),
        notes: notes.trim() || undefined,
      },
      userLocation: isPickup ? null : (deliveryCoords ?? null),
      distanceKm: isPickup ? null : (distanceKm ?? null),
    };

    const now = Date.now();
    if (now - lastTapRef.current < 600) {
      console.log('[CHECKOUT:RETURN]', { reason: 'debounce_repeat_tap', msSinceLast: now - lastTapRef.current });
      return;
    }
    lastTapRef.current = now;

    const online = await isDeviceOnline();
    console.log('[CHECKOUT:NETWORK]', { online });
    if (!online) {
      if (paymentRail !== 'cod') {
        console.warn('[CHECKOUT:RETURN]', { reason: 'offline_non_cod' });
        Alert.alert('Offline', 'Connect to the internet to pay with card or QR, or choose cash on delivery and we can save your order until you are back online.');
        return;
      }
      setIsPlacingOrder(true);
      try {
        console.log('[CHECKOUT:OFFLINE_COD_QUEUE_START]');
        await setGrabCheckoutDraft(draft);
        const items = cartLinesToOrderItems(lines);
        await enqueueOfflineCodOrder({
          userId: 'offline-pending',
          items,
          draft,
        });
        clearCart();
        void clearGrabCheckoutDraft().catch(() => {});
        Alert.alert(
          'Order queued',
          'You are offline. Your cash-on-delivery order is saved and will send when you are back online. Open the app with a connection to sync.',
        );
        console.log('[CHECKOUT:OFFLINE_COD_QUEUED_OK] (no online NAV — user must sync when online)');
      } catch (e) {
        console.error('[CHECKOUT:ERROR]', { phase: 'offline_cod_queue', err: String(e) });
        if (isMountedRef.current) {
          Alert.alert(
            'Checkout Failed',
            e instanceof Error ? e.message : String(e ?? 'Could not save your order.'),
          );
        }
      } finally {
        setIsPlacingOrder(false);
      }
      return;
    }

    setIsPlacingOrder(true);
    /** When navigation succeeds we must not fire `finally` loading reset — it can race `replace()` on web. */
    let suppressCheckoutLoadingReset = false;
    try {
      console.log('[CHECKOUT_START]');
      console.log('[CHECKOUT:ONLINE_BRANCH_ENTER]');

      /** Normalize Firestore / backend orderId into safe string */
      const toSnapshotId = (rawId: unknown): string => {
        return typeof rawId === 'string' ? rawId.trim() : String(rawId ?? '');
      };

      const TEST_BYPASS_FIRESTORE = false;
      if (__DEV__ && TEST_BYPASS_FIRESTORE) {
        const fakeId = `TEST-${Date.now()}`;
        console.log('[CHECKOUT:TEST_BYPASS_FIRESTORE]', { fakeId });
        checkoutNavigateAfterPlaceOrder(
          { kind: 'orderTracking', orderId: fakeId },
          { rail: 'cod', testBypassFirestore: true }
        );
        suppressCheckoutLoadingReset = true;
        return;
      }

      const CHECKOUT_NAV_SMOKE = false;
      if (__DEV__ && CHECKOUT_NAV_SMOKE) {
        console.log('[CHECKOUT:NAV_SMOKE]', { rail: 'cod' });
        checkoutNavigateAfterPlaceOrder(
          { kind: 'orderTracking', orderId: 'test123' },
          { rail: 'cod', checkoutNavSmoke: true }
        );
        suppressCheckoutLoadingReset = true;
        return;
      }
      await setGrabCheckoutDraft(draft);
      const items = cartLinesToOrderItems(lines);

      const payload = {
        items,
        totalAmount: total,
        paymentMode: paymentRail,
        metaData: draft,
      };

      console.log('[CHECKOUT:BEFORE_CREATE_ORDER]', { paymentRail });

      const result = await raceCheckoutFirestore(
        placeGrabOrderAtCheckout(payload),
        'Checkout timeout'
      );

      console.log('[CHECKOUT:AFTER_CREATE_ORDER]', { orderId: result });

      if (!result) {
        console.error('[CHECKOUT:ERROR]', { phase: 'after_create_order_empty', payload: typeof result });
        throw new Error('Order creation returned empty result');
      }

      const finalOrderId = toSnapshotId(typeof result === 'string' ? result : '');

      console.log('[CHECKOUT:ORDER_IDS]', { orderId: finalOrderId });

      if (!finalOrderId || !isValidGrabOrderId(finalOrderId)) {
        console.error('[CHECKOUT:ERROR]', { phase: 'parse_order_id', finalOrderId });
        throw new Error('Malformed Firestore checkout result');
      }

      if (!finalOrderId.trim()) {
        console.error('[CHECKOUT:ERROR]', { reason: 'empty_finalOrderId_after_parse' });
        console.warn('[CHECKOUT:RETURN]', { reason: 'empty_finalOrderId_after_parse_no_nav' });
        Alert.alert('Error', 'Order ID missing');
        return;
      }

      /** Do not call `setIsPlacingOrder(false)` before `replace()` — races router on web. `finally` skips when navigating. */

      if (paymentRail === 'cod') {
        checkoutNavigateAfterPlaceOrder(
          { kind: 'orderTracking', orderId: finalOrderId },
          { rail: 'cod', pathname, segments }
        );
        suppressCheckoutLoadingReset = true;
        /** Defer cart clear (not navigation — avoids competing with router state commit). */
        setTimeout(() => {
          try {
            clearCart();
            void clearGrabCheckoutDraft().catch((e) => {
              console.warn('[COD] cleanup failed', e);
            });
          } catch (e) {
            console.warn('[COD] cleanup failed', e);
          }
        }, 400);
        console.log('[CHECKOUT:DONE_COD_NAV_SCHEDULED]');
        return;
      }

      if (paymentRail === 'stripe') {
        checkoutNavigateAfterPlaceOrder(
          { kind: 'grabStripePayment', orderId: finalOrderId },
          { rail: 'stripe' }
        );
      } else {
        checkoutNavigateAfterPlaceOrder(
          { kind: 'grabPaymentQr', orderId: finalOrderId, total: String(total) },
          { rail: 'qr', total }
        );
      }
      suppressCheckoutLoadingReset = true;
      console.log('[CHECKOUT:DONE_STRIPE_OR_QR_NAV_SCHEDULED]');

      return;
    } catch (e: unknown) {
      console.error('[CHECKOUT:ERROR]', {
        phase: 'online_place_order_try',
        message: e instanceof Error ? e.message : String(e),
        err: e,
      });
      if (isMountedRef.current) {
        const msg =
          e instanceof Error ? e.message : typeof e === 'string' ? e : String(e ?? 'Could not place order');
        Alert.alert('Checkout Failed', msg);
      }
    } finally {
      if (!suppressCheckoutLoadingReset && isMountedRef.current) {
        console.warn('[CHECKOUT:FINALLY_RESET_LOADING]', { note: 'suppressCheckoutLoadingReset was false — no successful nav path ran' });
        setIsPlacingOrder(false);
        lastTapRef.current = 0;
      }
    }
  };

  if (!loaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Brand.green} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <HeaderBar title="Checkout" subtitle="Delivery or pickup · STM Salam" showBack />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {!lines.length ? (
          <Text style={styles.warn}>Your cart is empty. Add items from the menu.</Text>
        ) : null}

        <View style={[styles.card, cardShadow]}>
          <Text style={styles.section}>Contact</Text>
          <TextInput
            style={styles.input}
            placeholder="Full name"
            placeholderTextColor={Brand.muted}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone (+65 …)"
            placeholderTextColor={Brand.muted}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={[styles.card, cardShadow]}>
          <Text style={styles.section}>Fulfilment</Text>
          <View style={styles.rowGap}>
            {(['pickup', 'delivery'] as Mode[]).map((m) => (
              <TouchableOpacity
                key={m}
                style={[styles.chip, mode === m && styles.chipOn]}
                onPress={() => {
                  setMode(m);
                  if (m === 'pickup') {
                    setDistanceKm(null);
                    setDeliveryCoords(null);
                    setSuggestions([]);
                  }
                }}
              >
                <Text style={[styles.chipText, mode === m && styles.chipTextOn]}>
                  {m === 'pickup' ? '🏪 Pickup' : '🛵 Delivery'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {mode === 'delivery' ? (
            <>
              <Text style={styles.fieldHint}>
                {Platform.OS === 'web'
                  ? 'Allow location for this site (HTTPS). If the browser already has permission, your address may fill automatically; otherwise tap "Use current location". Add unit / postal or type your full Singapore address. Typeahead uses Google when a Maps API key is set.'
                  : 'For delivery: tap "Use current location" to detect your position and fill the address. Add unit, floor, or postal code if needed, or type the full address manually.'}
              </Text>
              <TouchableOpacity
                style={[styles.locBtn, geoBusy && styles.locBtnDisabled]}
                onPress={onUseCurrentLocation}
                disabled={geoBusy}
                activeOpacity={0.88}
              >
                <Text style={styles.locBtnText}>
                  {geoBusy ? 'Getting location…' : '📍 Use current location'}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.input, { marginTop: 8 }]}
                placeholder="e.g. Blk 441 Clementi Ave 3, #12-34, S120441"
                placeholderTextColor={Brand.muted}
                value={address}
                onChangeText={onAddressChange}
                onBlur={onVerifyAddress}
                autoCorrect={false}
                textContentType="fullStreetAddress"
              />
              {suggestions.length > 0 ? (
                <View style={styles.suggestBox}>
                  <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
                    {suggestions.map((s) => (
                      <TouchableOpacity
                        key={s.place_id}
                        style={styles.suggestRow}
                        onPress={() => onPickSuggestion(s)}
                      >
                        <Text style={styles.suggestText} numberOfLines={2}>
                          {s.description}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ) : null}
              <TouchableOpacity
                style={styles.mapsLink}
                onPress={openDeliveryInGoogleMaps}
                activeOpacity={0.85}
              >
                <Text style={styles.mapsLinkText}>📍 Open address in Google Maps</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondary} onPress={onVerifyAddress} disabled={geoBusy}>
                <Text style={styles.secondaryText}>{geoBusy ? 'Checking…' : 'Verify distance from kitchen'}</Text>
              </TouchableOpacity>
              {quote.blocked && quote.blockReason === 'below_min' ? (
                <Text style={styles.err}>
                  Minimum SGD {(quote.minDelivery ?? 10).toFixed(2)} for delivery.
                </Text>
              ) : null}
              {quote.blocked && quote.blockReason === 'unverified' ? (
                <Text style={styles.err}>
                  Verify distance (use current location or verify address) to confirm you are within our
                  5KM range.
                </Text>
              ) : null}
              {quote.blocked && quote.blockReason === 'out_of_range' ? (
                <Text style={styles.err}>{DELIVERY_OUT_OF_RANGE_MESSAGE}</Text>
              ) : null}
            </>
          ) : null}
        </View>

        <View style={[styles.notesCard, cardShadow]}>
          <TextInput
            style={styles.notesInput}
            placeholder="Order notes (optional)"
            placeholderTextColor={Brand.muted}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        <View style={[styles.card, cardShadow, { marginTop: Brand.spaceSm }]}>
          <Text style={styles.section}>Payment method</Text>
          {PAYMENT_OPTIONS.map((m) => {
            const on = paymentRail === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                style={[styles.methodCard, on && styles.methodCardOn]}
                onPress={() => selectPaymentRail(m.id)}
                activeOpacity={0.88}
              >
                <View style={styles.methodRow}>
                  <View style={[styles.radio, on && styles.radioOn]}>
                    {on ? <View style={styles.radioDot} /> : null}
                  </View>
                  <View style={styles.iconCircle}>
                    <Ionicons name={m.icon} size={24} color={on ? Brand.green : Brand.muted} />
                  </View>
                  <View style={styles.methodText}>
                    <Text style={[styles.methodTitle, on && styles.methodTitleOn]}>{m.title}</Text>
                    <Text style={styles.methodDesc}>{m.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ marginHorizontal: Brand.space, marginTop: 8 }}>
          <PriceSummaryCard
            subtotal={subtotal}
            deliveryFee={isPickup || quote.blocked ? 0 : deliveryFee}
            total={isPickup ? subtotal : quote.blocked ? subtotal : total}
            deliveryLabel={
              isPickup
                ? 'Pickup (no delivery fee)'
                : quote.freeDelivery && mode === 'delivery'
                  ? 'Delivery (free)'
                  : 'Delivery fee'
            }
          />
        </View>

        <TouchableOpacity
          style={[
            styles.cta,
            (!lines.length || isPlacingOrder || (!isPickup && quote.blocked) || !paymentRail) && styles.ctaOff,
          ]}
          onPress={() => void onPlaceOrder()}
          disabled={!lines.length || isPlacingOrder || (!isPickup && quote.blocked) || !paymentRail}
        >
          {isPlacingOrder ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.ctaText}>Place order · SGD {total.toFixed(2)}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <SupportFloatingButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  scroll: { paddingBottom: 120 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  warn: { margin: Brand.space, color: Brand.orange, fontWeight: '800' },
  notesCard: {
    backgroundColor: Brand.card,
    marginHorizontal: Brand.space,
    marginTop: Brand.spaceSm,
    padding: Brand.space,
    borderRadius: Brand.radius,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  notesInput: {
    fontSize: 16,
    fontWeight: '600',
    color: Brand.text,
    minHeight: 48,
    paddingVertical: 4,
  },
  card: {
    backgroundColor: Brand.card,
    marginHorizontal: Brand.space,
    marginTop: Brand.spaceSm,
    padding: Brand.space,
    borderRadius: Brand.radius,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  section: { fontSize: 15, fontWeight: '900', color: Brand.green, marginBottom: 12 },
  fieldHint: {
    fontSize: 12,
    fontWeight: '600',
    color: Brand.muted,
    lineHeight: 17,
  },
  locBtn: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: Brand.radius,
    backgroundColor: Brand.green,
    alignItems: 'center',
  },
  locBtnDisabled: { opacity: 0.65 },
  locBtnText: { color: '#fff', fontWeight: '900', fontSize: 14 },
  suggestBox: {
    marginTop: 6,
    maxHeight: 220,
    borderWidth: 1,
    borderColor: Brand.border,
    borderRadius: Brand.radius,
    backgroundColor: Brand.card,
    overflow: 'hidden',
  },
  suggestRow: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Brand.border,
  },
  suggestText: { fontSize: 14, fontWeight: '600', color: Brand.text },
  mapsLink: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: Brand.radius,
    backgroundColor: 'rgba(1, 50, 32, 0.06)',
  },
  mapsLinkText: { fontWeight: '800', color: Brand.green, fontSize: 13 },
  input: {
    borderWidth: 1,
    borderColor: Brand.border,
    borderRadius: Brand.radius,
    padding: 14,
    fontWeight: '600',
    color: Brand.text,
    marginBottom: 10,
    backgroundColor: Brand.bg,
  },
  rowGap: { flexDirection: 'row', gap: 10 },
  chip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Brand.radius,
    borderWidth: 1,
    borderColor: Brand.border,
    alignItems: 'center',
    backgroundColor: Brand.bg,
  },
  chipOn: { backgroundColor: Brand.gold, borderColor: Brand.gold },
  chipText: { fontWeight: '800', color: Brand.text },
  chipTextOn: { color: Brand.green },
  secondary: {
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: Brand.radius,
    borderWidth: 2,
    borderColor: Brand.gold,
  },
  secondaryText: { fontWeight: '900', color: Brand.green },
  err: { color: '#b91c1c', fontWeight: '700', marginTop: 8 },
  cta: {
    marginHorizontal: Brand.space,
    marginTop: 20,
    backgroundColor: Brand.green,
    borderRadius: Brand.radius,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaOff: { opacity: 0.5 },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  methodCard: {
    borderWidth: 2,
    borderColor: Brand.border,
    borderRadius: Brand.radius,
    padding: 12,
    marginBottom: 10,
    backgroundColor: Brand.bg,
  },
  methodCardOn: {
    borderColor: Brand.gold,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
  },
  methodRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Brand.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: Brand.green },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Brand.green,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Brand.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodText: { flex: 1, minWidth: 0 },
  methodTitle: { fontSize: 16, fontWeight: '900', color: Brand.text },
  methodTitleOn: { color: Brand.green },
  methodDesc: { marginTop: 2, fontSize: 12, fontWeight: '600', color: Brand.muted, lineHeight: 17 },
});
