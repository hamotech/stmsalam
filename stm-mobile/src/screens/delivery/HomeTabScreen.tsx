/**
 * Home — brand hero + category grid (Firestore `categories`). Menu catalog = `products`.
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter, type Href } from 'expo-router';
import { subscribeCategories, type Category } from '@/src/services/menuService';
import CartFab from '@/src/components/CartFab';

const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function HomeTabScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const unsub = subscribeCategories((cats) => {
      const sorted = [...cats].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setCategories(sorted.filter((c) => c.active !== false));
      setLoading(false);
    });
    return unsub;
  }, []);

  const pt = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  const goTrack = () => {
    const id = orderId.trim();
    if (!id) return;
    router.push(`/tracking/${encodeURIComponent(id)}`);
  };

  const chips = useMemo(
    () => [{ id: 'all', name: 'Full menu', emoji: '🍽️' } as Category & { emoji?: string }, ...categories],
    [categories]
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { paddingTop: pt + 20 }]}>
          <Text style={styles.flag}>🇸🇬</Text>
          <Text style={styles.brand}>STM Salam</Text>
          <Text style={styles.tag}>Teh Tarik & Kebab · Singapore</Text>
          <View style={styles.heroTags}>
            <Text style={styles.pill}>Halal</Text>
            <Text style={styles.pill}>Delivery</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Track order</Text>
          <View style={styles.trackRow}>
            <TextInput
              style={styles.input}
              placeholder="Order ID (e.g. STM-1713…)"
              placeholderTextColor="#94A3B8"
              value={orderId}
              onChangeText={setOrderId}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={[styles.trackBtn, !orderId.trim() && styles.trackBtnOff]}
              onPress={goTrack}
              disabled={!orderId.trim()}
            >
              <Text style={styles.trackBtnTxt}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.sectionSub}>Tap to browse dishes from our kitchen</Text>
          {loading ? (
            <ActivityIndicator color={GREEN} style={{ marginTop: 24 }} />
          ) : (
            <>
              {categories.length === 0 ? (
                <Text style={styles.emptyCat}>
                  No category shortcuts yet — “Full menu” below lists everything. Add categories in admin (same as web) for quicker browsing.
                </Text>
              ) : null}
              <View style={styles.grid}>
              {chips.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.card}
                  onPress={() =>
                    router.push({
                      pathname: '/menu/[category]',
                      params: { category: cat.id },
                    } as Href)
                  }
                  activeOpacity={0.9}
                >
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
                    }}
                    style={styles.cardImg}
                    contentFit="cover"
                  />
                  <View style={styles.cardBody}>
                    <Text style={styles.cardEmoji}>
                      {(cat as Category).emoji || (cat as Category).icon || '🍴'}
                    </Text>
                    <Text style={styles.cardTitle} numberOfLines={2}>
                      {cat.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <CartFab />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingBottom: 120 },
  hero: {
    backgroundColor: GREEN,
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  flag: { fontSize: 36, marginBottom: 6 },
  brand: { fontSize: 34, fontWeight: '900', color: '#FFF', letterSpacing: -1 },
  tag: { marginTop: 6, fontSize: 15, color: 'rgba(255,255,255,0.7)', fontWeight: '600' },
  heroTags: { flexDirection: 'row', gap: 10, marginTop: 16 },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    color: GOLD,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
  },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  sectionSub: { fontSize: 13, color: '#64748B', fontWeight: '600', marginTop: 4, marginBottom: 14 },
  trackRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontWeight: '600',
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  trackBtn: {
    backgroundColor: GREEN,
    borderRadius: 16,
    paddingHorizontal: 22,
    justifyContent: 'center',
  },
  trackBtnOff: { backgroundColor: '#CBD5E1' },
  trackBtnTxt: { color: '#FFF', fontWeight: '900' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 8 },
  card: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEF2F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImg: { width: '100%', height: 96 },
  cardBody: { padding: 14 },
  cardEmoji: { fontSize: 22, marginBottom: 6 },
  cardTitle: { fontSize: 16, fontWeight: '900', color: GREEN },
  emptyCat: {
    marginTop: 20,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    lineHeight: 20,
  },
});
