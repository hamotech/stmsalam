/**
 * Menu for one category — reads `products` (same as web catalog).
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { subscribeProducts, type Product } from '@/src/services/menuService';
import { useCart } from '@/src/context/CartContext';
import CartFab from '@/src/components/CartFab';

const GREEN = '#013220';
const GOLD = '#D4AF37';
const PLACEHOLDER =
  'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400';

export default function MenuCategoryScreen() {
  const router = useRouter();
  const { category: rawCat } = useLocalSearchParams<{ category: string | string[] }>();
  const categoryId = rawCat
    ? decodeURIComponent(Array.isArray(rawCat) ? rawCat[0] : String(rawCat))
    : 'all';
  const { addToCart, updateQty, cartItems } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeProducts(
      (prods) => {
        setProducts(prods);
        setLoading(false);
      },
      undefined,
      categoryId === 'all' ? undefined : categoryId
    );
    return unsub;
  }, [categoryId]);

  const title =
    categoryId === 'all' ? 'Full menu' : categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

  const qtyFor = (id: string) => cartItems.find((c) => c.id === id)?.qty ?? 0;

  const pt = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.header, { paddingTop: pt + 12 }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSub}>{products.length} dishes</Text>
      </View>

      {loading ? (
        <ActivityIndicator color={GREEN} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.list}
          initialNumToRender={12}
          windowSize={7}
          removeClippedSubviews={Platform.OS === 'android'}
          ListEmptyComponent={
            <Text style={styles.emptyList}>No dishes in this category right now.</Text>
          }
          renderItem={({ item }) => {
            const uri = item.image || item.img || PLACEHOLDER;
            const price = Number(item.price) || 0;
            const q = qtyFor(item.id);
            return (
              <View style={styles.row}>
                <Image source={{ uri }} style={styles.thumb} contentFit="cover" />
                <View style={styles.body}>
                  <Text style={styles.name} numberOfLines={2}>
                    {item.name}
                  </Text>
                  {item.badge ? <Text style={styles.badge}>{item.badge}</Text> : null}
                  <Text style={styles.desc} numberOfLines={2}>
                    {item.description || 'Fresh · halal'}
                  </Text>
                  <Text style={styles.price}>${price.toFixed(2)}</Text>
                  <View style={styles.actions}>
                    {q > 0 ? (
                      <View style={styles.stepper}>
                        <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.stepHit}>
                          <Text style={styles.stepTxt}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.stepQty}>{q}</Text>
                        <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.stepHit}>
                          <Text style={styles.stepTxt}>+</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.add}
                        onPress={() =>
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price,
                            img: item.img,
                            image: item.image,
                            categoryId: item.categoryId,
                            description: item.description,
                            badge: item.badge,
                          })
                        }
                      >
                        <Text style={styles.addTxt}>Add</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
      <CartFab />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 16,
    paddingBottom: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  back: { alignSelf: 'flex-start', marginBottom: 8 },
  backText: { color: GOLD, fontWeight: '800', fontSize: 16 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: '#FFF' },
  headerSub: { marginTop: 4, color: 'rgba(255,255,255,0.65)', fontWeight: '600' },
  list: { padding: 16, paddingBottom: 120 },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  thumb: { width: 108, height: 108, borderRadius: 16, backgroundColor: '#F1F5F9' },
  body: { flex: 1, minWidth: 0 },
  name: { fontSize: 17, fontWeight: '900', color: '#0F172A' },
  badge: { marginTop: 4, fontSize: 11, fontWeight: '800', color: '#B45309' },
  desc: { marginTop: 6, fontSize: 13, color: '#64748B' },
  price: { marginTop: 8, fontSize: 18, fontWeight: '900', color: GREEN },
  actions: { marginTop: 10, alignItems: 'flex-end' },
  add: {
    borderWidth: 2,
    borderColor: GREEN,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFF',
  },
  addTxt: { color: GREEN, fontWeight: '900' },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GREEN,
    borderRadius: 12,
  },
  stepHit: { paddingHorizontal: 14, paddingVertical: 8 },
  stepTxt: { color: '#FFF', fontSize: 18, fontWeight: '900' },
  stepQty: { color: '#FFF', fontWeight: '900', minWidth: 28, textAlign: 'center' },
  emptyList: {
    textAlign: 'center',
    marginTop: 48,
    paddingHorizontal: 24,
    color: '#64748B',
    fontWeight: '600',
    fontSize: 15,
  },
});
