/**
 * Checkout — collects delivery details and calls the same `placeOrder` contract as web.
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '@/src/context/CartContext';
import { useAuth } from '@/src/context/AuthContext';
import { placeOrder } from '@/src/services/orderService';

const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function CheckoutFlowScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName((n) => n || user.name || '');
    setEmail((e) => e || user.email || '');
  }, [user]);

  const total = subtotal;

  const submit = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Missing info', 'Please enter your name and phone.');
      return;
    }
    if (cartItems.length === 0) {
      Alert.alert('Empty cart', 'Add items before checkout.');
      return;
    }

    setBusy(true);
    try {
      // Web parity: send cart rows with the same spread shape as Checkout.jsx (full line + numeric price)
      const items = cartItems.map((i) => ({
        ...i,
        price: Number(i.price),
      }));

      const formData = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        notes: notes.trim(),
      };

      const newOrder = await placeOrder({
        customer: formData,
        items,
        total: (total || 0).toFixed(2),
        mode: 'delivery',
        payment: 'cash',
        notes: formData.notes || '',
        payment_status: 'Cash on Delivery',
        order_status: 'Pending',
        stage: 'kitchen_preparation',
        userId: user?.id || 'anonymous',
      });

      clearCart();
      router.replace(`/tracking/${encodeURIComponent(newOrder.id)}`);
    } catch (e) {
      console.error(e);
      Alert.alert('Order failed', 'Could not place order. Check connection and try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.sub}>Delivery details · Cash on delivery</Text>

      {cartItems.length === 0 ? (
        <View style={styles.warnBox}>
          <Text style={styles.warnTxt}>Your cart is empty. Add items from the menu first.</Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order summary</Text>
        {cartItems.map((i) => (
          <View key={i.id} style={styles.line}>
            <Text style={styles.lineName} numberOfLines={1}>
              {i.qty}× {i.name}
            </Text>
            <Text style={styles.linePrice}>${(Number(i.price) * i.qty).toFixed(2)}</Text>
          </View>
        ))}
        <View style={[styles.line, styles.totalLine]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalVal}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your details</Text>
        <Field label="Full name" value={name} onChangeText={setName} />
        <Field label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Field
          label="Email (optional)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Field
          label="Delivery address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
        <Field label="Notes for kitchen" value={notes} onChangeText={setNotes} multiline />
      </View>

      <TouchableOpacity
        style={[styles.cta, busy && styles.ctaOff]}
        onPress={submit}
        disabled={busy}
      >
        {busy ? (
          <ActivityIndicator color={GREEN} />
        ) : (
          <Text style={styles.ctaTxt}>Place order</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences';
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMulti]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#94A3B8"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 20, paddingTop: Platform.OS === 'ios' ? 56 : 48, paddingBottom: 48 },
  title: { fontSize: 28, fontWeight: '900', color: GREEN },
  sub: { marginTop: 6, fontSize: 14, color: '#64748B', fontWeight: '600' },
  card: {
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: { fontSize: 16, fontWeight: '900', color: '#0F172A', marginBottom: 12 },
  line: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  lineName: { flex: 1, marginRight: 12, fontWeight: '600', color: '#334155' },
  linePrice: { fontWeight: '800', color: GREEN },
  totalLine: { marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  totalLabel: { fontWeight: '900', fontSize: 16, color: '#0F172A' },
  totalVal: { fontWeight: '900', fontSize: 18, color: GREEN },
  field: { marginBottom: 14 },
  fieldLabel: { fontSize: 12, fontWeight: '800', color: '#64748B', marginBottom: 6 },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontWeight: '600',
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputMulti: { minHeight: 72, textAlignVertical: 'top' },
  cta: {
    marginTop: 24,
    backgroundColor: GOLD,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaOff: { opacity: 0.7 },
  ctaTxt: { color: GREEN, fontWeight: '900', fontSize: 17 },
  warnBox: {
    marginTop: 16,
    backgroundColor: '#FEF3C7',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  warnTxt: { color: '#92400E', fontWeight: '700', fontSize: 14 },
});
