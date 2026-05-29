import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import { db } from '@/src/services/firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '@/src/components/stm/HeaderBar';
import { Brand, cardShadow } from '@/src/theme/brand';
import { useCart } from '@/src/context/CartContext';
import { clearPendingCheckoutResolutionIfMatchesOrder } from '@/src/services/grabFlowOrderService';
import { clearGrabCheckoutDraft } from '@/src/utils/checkoutDraft';

export default function WalletPayScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const navRole = useAppRole();
  const { orderId: oid, total: totalParam } = useLocalSearchParams<{
    orderId?: string;
    total?: string;
  }>();

  const orderId = typeof oid === 'string' ? oid.trim() : '';
  const paramTotal = parseFloat(String(totalParam ?? ''));

  const { lines, loaded, clear } = useCart();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [orderAmount, setOrderAmount] = useState<number>(
    Number.isFinite(paramTotal) && paramTotal > 0 ? paramTotal : 0
  );

  const [topUpAmount, setTopUpAmount] = useState('20');
  const [toppingUp, setToppingUp] = useState(false);
  const [topUpSuccess, setTopUpSuccess] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    void clearPendingCheckoutResolutionIfMatchesOrder(orderId);
  }, [orderId]);

  useEffect(() => {
    async function loadData() {
      if (!orderId || !user?.uid) {
        setLoading(false);
        return;
      }
      try {
        const orderSnap = await getDoc(doc(db, 'orders', orderId));
        if (orderSnap.exists()) {
          const data = orderSnap.data();
          if (data.totalAmount && (!orderAmount || orderAmount <= 0)) {
            setOrderAmount(data.totalAmount);
          }
        }
        const userSnap = await getDoc(doc(db, 'users', user.uid));
        if (userSnap.exists()) {
          setBalance(Number(userSnap.data().walletBalance) || 0);
        }
      } catch (err) {
        console.error('Wallet load error:', err);
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, [orderId, user, orderAmount]);

  // If we couldn't get amount from order doc, fallback to cart total
  useEffect(() => {
    if (orderAmount === 0 && lines.length > 0) {
      setOrderAmount(lines.reduce((s, l) => s + l.price * l.qty, 0));
    }
  }, [lines, orderAmount]);

  const handleTopUp = async () => {
    const amountNum = parseFloat(topUpAmount);
    if (Number.isNaN(amountNum) || amountNum <= 0) {
      Alert.alert('Top Up', 'Please enter a valid amount.');
      return;
    }
    if (!user?.uid) return;

    setToppingUp(true);
    setTopUpSuccess(false);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        walletBalance: increment(amountNum),
      });
      setBalance((prev) => prev + amountNum);
      setTopUpSuccess(true);
      setTimeout(() => setTopUpSuccess(false), 3000);
    } catch (err) {
      Alert.alert('Top Up', 'Failed to top up balance. Please try again.');
    } finally {
      setToppingUp(false);
    }
  };

  const handlePayment = async () => {
    if (!orderId || !user?.uid) return;
    if (balance < orderAmount) {
      Alert.alert('Payment', 'Insufficient wallet balance. Please top up first.');
      return;
    }

    setPaying(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        walletBalance: increment(-orderAmount),
      });
      clear();
      void clearGrabCheckoutDraft();
      navReplace(router, { kind: 'paymentSuccessMinimal', orderId }, navRole);
    } catch (err) {
      Alert.alert('Payment Error', 'Wallet payment transaction failed.');
    } finally {
      setPaying(false);
    }
  };

  if (!loaded || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Brand.green} />
      </View>
    );
  }

  if (!orderId) {
    return (
      <View style={styles.center}>
        <Text style={styles.err}>Missing order. Return to checkout.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navReplace(router, { kind: 'checkout' }, navRole)}>
          <Text style={styles.btnText}>Back to checkout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isSufficient = balance >= orderAmount;
  const shortfall = orderAmount - balance;

  return (
    <View style={styles.root}>
      <HeaderBar title="Wallet Payment" showBack />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        
        {/* Wallet Balance Card */}
        <View style={styles.balanceCard}>
          <Ionicons name="wallet" size={60} color={Brand.gold} style={styles.bgIcon} />
          <Text style={styles.balanceLabel}>STM WALLET BALANCE</Text>
          <Text style={styles.balanceValue}>SGD ${balance.toFixed(2)}</Text>
        </View>

        {/* Order Info */}
        <View style={[styles.card, cardShadow]}>
          <View style={styles.row}>
            <Text style={styles.label}>ORDER REFERENCE</Text>
            <Text style={styles.ref}>{orderId.slice(-8).toUpperCase()}</Text>
          </View>
          <View style={[styles.row, { marginTop: 12 }]}>
            <Text style={styles.amountLabel}>Order Total</Text>
            <Text style={styles.amountValue}>SGD ${orderAmount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Warning if insufficient */}
        {!isSufficient ? (
          <View style={styles.warningBox}>
            <Ionicons name="alert-circle" size={24} color="#b45309" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.warningTitle}>Insufficient Balance</Text>
              <Text style={styles.warningDesc}>
                You need another SGD ${shortfall.toFixed(2)} to pay for this order. Please top up below.
              </Text>
            </View>
          </View>
        ) : null}

        {/* Top Up Section */}
        <View style={styles.topUpSection}>
          <Text style={styles.topUpTitle}>
            <Ionicons name="add-circle-outline" size={18} color={Brand.green} /> Top Up Wallet
          </Text>
          {topUpSuccess && (
            <View style={styles.successMsg}>
              <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
              <Text style={styles.successText}>Top up successful!</Text>
            </View>
          )}

          <View style={styles.presetsRow}>
            {['10', '20', '50', '100'].map((val) => (
              <TouchableOpacity
                key={val}
                style={[styles.presetBtn, topUpAmount === val && styles.presetBtnOn]}
                onPress={() => setTopUpAmount(val)}
              >
                <Text style={[styles.presetText, topUpAmount === val && styles.presetTextOn]}>
                  +${val}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputWrap}>
              <Text style={styles.inputPrefix}>$</Text>
              <TextInput
                style={styles.input}
                value={topUpAmount}
                onChangeText={setTopUpAmount}
                keyboardType="numeric"
                placeholder="Amount"
              />
            </View>
            <TouchableOpacity
              style={[styles.topUpBtn, toppingUp && styles.btnDisabled]}
              onPress={() => void handleTopUp()}
              disabled={toppingUp}
            >
              <Text style={styles.topUpBtnText}>{toppingUp ? 'Wait...' : 'Top Up'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pay Button */}
        <TouchableOpacity
          style={[styles.payBtn, (!isSufficient || paying) && styles.btnDisabled]}
          onPress={() => void handlePayment()}
          disabled={!isSufficient || paying}
        >
          {paying ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payBtnText}>
              {isSufficient ? 'Pay with Wallet' : 'Top Up to Pay'}
            </Text>
          )}
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  scroll: { padding: Brand.space, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Brand.bg },
  err: { color: '#b91c1c', fontWeight: '800', marginBottom: 16 },
  btn: { paddingHorizontal: 24, paddingVertical: 12, backgroundColor: Brand.green, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '900' },
  
  balanceCard: {
    backgroundColor: '#034f34',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  bgIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    opacity: 0.15,
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    opacity: 0.7,
    letterSpacing: 1,
    marginBottom: 8,
  },
  balanceValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
  },
  
  card: {
    backgroundColor: Brand.card,
    borderRadius: Brand.radius,
    padding: Brand.space,
    borderWidth: 1,
    borderColor: Brand.border,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 12, fontWeight: '800', color: Brand.muted },
  ref: { fontSize: 14, fontWeight: '900', color: Brand.green },
  amountLabel: { fontSize: 16, fontWeight: '800', color: Brand.text },
  amountValue: { fontSize: 16, fontWeight: '900', color: Brand.green },
  
  warningBox: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
    borderWidth: 1,
    borderRadius: Brand.radius,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 24,
  },
  warningTitle: { color: '#92400e', fontWeight: '900', fontSize: 14, marginBottom: 4 },
  warningDesc: { color: '#b45309', fontSize: 13, fontWeight: '600' },
  
  topUpSection: {
    borderColor: '#cbd5e1',
    borderWidth: 1.5,
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#fafafb',
    borderStyle: 'dashed',
    marginBottom: 24,
  },
  topUpTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: Brand.text,
    marginBottom: 16,
  },
  successMsg: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    marginBottom: 14,
  },
  successText: { color: '#166534', fontWeight: '700', fontSize: 13, marginLeft: 6 },
  presetsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  presetBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#cbd5e1',
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
  },
  presetBtnOn: {
    backgroundColor: 'rgba(1, 50, 32, 0.05)',
    borderColor: Brand.green,
  },
  presetText: { color: Brand.muted, fontWeight: '900', fontSize: 14 },
  presetTextOn: { color: Brand.green },
  
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inputWrap: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  inputPrefix: {
    position: 'absolute',
    left: 14,
    color: Brand.muted,
    fontWeight: '800',
    zIndex: 2,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 30,
    paddingRight: 14,
    fontWeight: '800',
    fontSize: 16,
    color: Brand.text,
  },
  topUpBtn: {
    backgroundColor: Brand.green,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  topUpBtnText: { color: '#fff', fontWeight: '900', fontSize: 15 },
  
  payBtn: {
    backgroundColor: Brand.green,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.6 },
  payBtnText: { color: '#fff', fontWeight: '900', fontSize: 16 },
});
