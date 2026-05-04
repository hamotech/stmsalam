/**
 * Payment entry — two actions only (no order creation / cart logic).
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  TextInput,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { navPush, navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import {
  initPaymentSheet,
  presentPaymentSheet,
  verifyStripePaymentOnServer,
} from '@/src/services/payment/stripeService';

const GREEN = '#013220';
const GOLD = '#D4AF37';

type Props = {
  orderId: string;
  amount: number;
  customerName: string;
  /** When false, buttons render disabled (missing checkout context). */
  enabled: boolean;
};

export default function CheckoutPaymentButtons({
  orderId,
  amount,
  customerName,
  enabled,
}: Props) {
  const router = useRouter();
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const [busy, setBusy] = useState<'none' | 'stripe'>('none');
  const [phone, setPhone] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const isWeb = Platform.OS === 'web';

  const normalizedPhone = phone.replace(/\s|-/g, '');
  const isValidSgPhone = /^(?:\+65)?[689]\d{7}$/.test(normalizedPhone);

  const ensureValidPhoneForWeb = () => {
    if (!isWeb) return true;
    if (isValidSgPhone) return true;
    setPhoneTouched(true);
    Alert.alert('Phone number required', 'Enter a valid Singapore phone number before payment.');
    return false;
  };

  const goScanPay = () => {
    if (!enabled) return;
    navPush(
      router,
      {
        kind: 'paymentScanPay',
        orderId: orderId.trim(),
        amount,
        customerName: customerName.trim() || 'Customer',
      },
      navRole
    );
  };

  const goStripe = async () => {
    if (!enabled) return;
    if (!ensureValidPhoneForWeb()) return;
    setBusy('stripe');
    try {
      const init = await initPaymentSheet(orderId.trim(), amount);
      if (!init.ok) {
        Alert.alert('Pay Online unavailable', init.error || 'Stripe could not start.');
        return;
      }
      const pay = await presentPaymentSheet();
      if (!pay.ok) {
        Alert.alert('Payment failed', pay.error || 'Payment was not completed.');
        return;
      }
      if (!init.paymentIntentId) {
        Alert.alert('Payment', 'Missing payment reference. Please try again.');
        return;
      }
      const verified = await verifyStripePaymentOnServer(orderId.trim(), init.paymentIntentId);
      if (!verified.ok) {
        Alert.alert('Payment not confirmed', verified.error);
        return;
      }
      navReplace(
        router,
        {
          kind: 'paymentSuccess',
          orderId: orderId.trim(),
          total: amount.toFixed(2),
          source: 'stripe',
        },
        navRole
      );
    } finally {
      setBusy('none');
    }
  };

  const goPayPal = async () => {
    if (!enabled) return;
    if (!ensureValidPhoneForWeb()) return;

    // Optional config for merchant PayPal checkout endpoint/link.
    // Example:
    // EXPO_PUBLIC_PAYPAL_CHECKOUT_URL=https://www.paypal.com/paypalme/yourmerchant
    const paypalBase = process.env.EXPO_PUBLIC_PAYPAL_CHECKOUT_URL?.trim();
    if (!paypalBase) {
      Alert.alert('PayPal not configured');
      return;
    }

    const sep = paypalBase.includes('?') ? '&' : '?';
    const paypalUrl =
      `${paypalBase}${sep}` +
      `amount=${encodeURIComponent(amount.toFixed(2))}` +
      `&currency=SGD` +
      `&invoice=${encodeURIComponent(orderId.trim())}` +
      `&note=${encodeURIComponent(`phone:${normalizedPhone}`)}`;

    const canOpen = await Linking.canOpenURL(paypalUrl);
    if (!canOpen) {
      Alert.alert('PayPal unavailable', 'Could not open the PayPal checkout link on this device.');
      return;
    }
    await Linking.openURL(paypalUrl);
  };

  const disabled = !enabled || busy === 'stripe' || (isWeb && !isValidSgPhone);

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Payment</Text>
      <Text style={styles.caption}>
        {isWeb
          ? 'Enter your phone number, then pay securely with card.'
          : 'Choose how you would like to pay for this order.'}
      </Text>

      {isWeb && (
        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={(v) => {
              setPhone(v);
              if (!phoneTouched) setPhoneTouched(true);
            }}
            onBlur={() => setPhoneTouched(true)}
            keyboardType="phone-pad"
            placeholder="+65 8123 4567"
            placeholderTextColor="#94A3B8"
            style={[
              styles.input,
              phoneTouched && !isValidSgPhone ? styles.inputError : undefined,
            ]}
          />
          {phoneTouched && !isValidSgPhone && (
            <Text style={styles.errorText}>Enter a valid SG number (e.g. +65 8123 4567).</Text>
          )}
        </View>
      )}

      {!isWeb && (
        <TouchableOpacity
          style={[styles.btnPrimary, disabled && styles.btnDisabled]}
          onPress={goScanPay}
          disabled={disabled}
          activeOpacity={0.88}
        >
          <Text style={styles.btnPrimaryText}>Scan &amp; Pay (Recommended)</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.btnSecondary, disabled && styles.btnDisabled]}
        onPress={goStripe}
        disabled={disabled}
        activeOpacity={0.88}
      >
        {busy === 'stripe' ? (
          <ActivityIndicator color={GREEN} />
        ) : (
          <Text style={styles.btnSecondaryText}>{isWeb ? 'Stripe Pay' : 'Pay Online'}</Text>
        )}
      </TouchableOpacity>

      {isWeb && (
        <TouchableOpacity
          style={[styles.btnPaypal, (!enabled || !isValidSgPhone) && styles.btnDisabled]}
          onPress={goPayPal}
          disabled={!enabled || !isValidSgPhone}
          activeOpacity={0.88}
        >
          <Text style={styles.btnPaypalText}>PayPal Pay</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 28,
    paddingTop: 24,
    borderTopWidth: 2,
    borderTopColor: '#E2E8F0',
  },
  heading: { fontSize: 18, fontWeight: '900', color: GREEN, marginBottom: 6 },
  caption: { fontSize: 13, color: '#64748B', fontWeight: '600', marginBottom: 18 },
  fieldWrap: { marginBottom: 12 },
  fieldLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 15,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    marginTop: 6,
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
  btnPrimary: {
    backgroundColor: GREEN,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnPrimaryText: { color: '#FFF', fontWeight: '900', fontSize: 16 },
  btnSecondary: {
    backgroundColor: GOLD,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnSecondaryText: { color: GREEN, fontWeight: '900', fontSize: 16 },
  btnPaypal: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0070BA',
  },
  btnPaypalText: { color: '#0070BA', fontWeight: '900', fontSize: 16 },
  btnDisabled: { opacity: 0.45 },
});
