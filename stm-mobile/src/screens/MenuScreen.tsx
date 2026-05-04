/**
 * Firestore menu — same `products` / `categories` collections as the web app.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  subscribeCategories,
  subscribeProducts,
  Category,
  Product,
} from '@/src/services/menuService';
import { useCart } from '@/src/context/CartContext';
import SupportFloatingButtons from '@/src/components/SupportFloatingButtons';
import ProductCard from '@/src/components/stm/ProductCard';
import StmLogo from '@/src/components/stm/StmLogo';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { navPush } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import ErrorState from '@/src/components/ErrorState';
import {
  ProductOptionsBottomSheet,
  type ProductOptionsSheetProduct,
  type ProductOptionsPayload,
  type ProductOptionsSheetRef,
} from '@/src/components/ProductOptionsBottomSheet';
import { Ionicons } from '@expo/vector-icons';
import { useTabBarBottomInset } from '@/src/navigation/useTabBarBottomInset';

const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function MenuScreen() {
  const router = useRouter();
  const { authReady } = useAuth();
  const navRole = useAppRole();
  const sheetRef = useRef<ProductOptionsSheetRef>(null);
  const insets = useSafeAreaInsets();
  const tabBarBottomInset = useTabBarBottomInset(24);
  const { width: winW } = useWindowDimensions();
  const pt = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;
  const { cat, q } = useLocalSearchParams<{ cat?: string; q?: string }>();
  const { addProduct } = useCart();
  const [sheetProduct, setSheetProduct] = useState<ProductOptionsSheetProduct | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [retryTick, setRetryTick] = useState(0);
  const [activeCat, setActiveCat] = useState<string>('all');

  const chipScrollRef = useRef<ScrollView>(null);
  const chipScrollXRef = useRef(0);
  const chipContentWRef = useRef(0);
  const chipViewWRef = useRef(0);
  const [chipShowLeft, setChipShowLeft] = useState(false);
  const [chipShowRight, setChipShowRight] = useState(false);

  const syncChipScrollArrows = () => {
    const x = chipScrollXRef.current;
    const vw = chipViewWRef.current;
    const cw = chipContentWRef.current;
    if (vw <= 0 || cw <= vw + 2) {
      setChipShowLeft(false);
      setChipShowRight(false);
      return;
    }
    setChipShowLeft(x > 6);
    setChipShowRight(x + vw < cw - 6);
  };

  const scrollCategoryChips = (direction: -1 | 1) => {
    const vw = chipViewWRef.current;
    const cw = chipContentWRef.current;
    const x = chipScrollXRef.current;
    const step = Math.max(96, Math.round(vw * 0.55));
    const maxX = Math.max(0, cw - vw);
    const next =
      direction < 0 ? Math.max(0, x - step) : Math.min(maxX, x + step);
    chipScrollRef.current?.scrollTo({ x: next, animated: true });
  };

  const topPad = Math.max(insets.top, pt) + 10;
  const titleFont = winW < 360 ? 22 : winW < 480 ? 26 : 28;
  const headerPadH = Math.max(14, Math.min(20, Math.round(winW * 0.045)));

  useEffect(() => {
    const query = q != null ? String(q).trim() : '';
    const c = cat != null ? String(cat).trim() : '';
    if (query) setActiveCat('all');
    else if (c) setActiveCat(c);
  }, [cat, q]);

  useEffect(() => {
    if (!authReady) return undefined;
    const u1 = subscribeCategories(
      (c) => {
        setCategories(c.filter((x) => x.active !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        setMenuError(null);
      },
      (err) => {
        console.error('[MENU]', err);
        setMenuError('Something went wrong. Please try again.');
      }
    );
    return u1;
  }, [authReady, retryTick]);

  useEffect(() => {
    if (!authReady) return undefined;
    setLoading(true);
    const u2 = subscribeProducts(
      (p) => {
        setProducts(p);
        setLoading(false);
        setMenuError(null);
      },
      (err) => {
        console.error('[MENU]', err);
        setMenuError('Something went wrong. Please try again.');
        setLoading(false);
      },
      activeCat === 'all' ? undefined : activeCat
    );
    return u2;
  }, [authReady, activeCat, retryTick]);

  const chips = useMemo(
    () => [{ id: 'all', name: 'All' } as Category, ...categories],
    [categories]
  );

  const searchQuery = (q != null ? String(q) : '').trim().toLowerCase();
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter((p) => p.name.toLowerCase().includes(searchQuery));
  }, [products, searchQuery]);

  const openOptions = (p: Product) => {
    const categoryLabel =
      p.category ?? categories.find((c) => c.id === p.categoryId)?.name;
    setSheetProduct({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      image: p.image || p.img,
      type: p.type,
      category: categoryLabel,
    });
    sheetRef.current?.present();
  };

  const listBottomPad = tabBarBottomInset + 12;
  const listPadH = Math.max(12, Math.min(18, Math.round(winW * 0.04)));

  const menuHeader = (
    <View style={[styles.header, { paddingTop: topPad, paddingHorizontal: headerPadH }]} collapsable={false}>
      <View style={styles.headerBrand}>
        <StmLogo size={winW < 380 ? 44 : 52} />
        <View style={styles.headerTitles}>
          <Text style={[styles.title, { fontSize: titleFont }]} numberOfLines={1}>
            Menu
          </Text>
          <Text style={styles.sub} numberOfLines={winW < 400 ? 2 : 1}>
            {searchQuery
              ? `Search: “${(q != null ? String(q) : '').trim()}”`
              : 'Live from Firestore — same catalog as stmsalam.sg'}
          </Text>
        </View>
      </View>
      <View
        style={styles.chipsWrap}
        onLayout={(e) => {
          chipViewWRef.current = e.nativeEvent.layout.width;
          syncChipScrollArrows();
        }}
      >
        <ScrollView
          ref={chipScrollRef}
          horizontal
          showsHorizontalScrollIndicator
          indicatorStyle="white"
          persistentScrollbar={Platform.OS === 'android'}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          contentContainerStyle={styles.chipsRow}
          style={styles.chipsScroll}
          onContentSizeChange={(w) => {
            chipContentWRef.current = w;
            syncChipScrollArrows();
          }}
          onScroll={(ev) => {
            chipScrollXRef.current = ev.nativeEvent.contentOffset.x;
            syncChipScrollArrows();
          }}
          scrollEventThrottle={32}
        >
          {chips.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[styles.chip, activeCat === c.id && styles.chipOn]}
              onPress={() => setActiveCat(c.id)}
              activeOpacity={0.85}
              hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
            >
              <Text style={[styles.chipText, activeCat === c.id && styles.chipTextOn]} numberOfLines={1}>
                {c.emoji ? `${c.emoji} ` : ''}
                {c.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {chipShowLeft ? (
          <TouchableOpacity
            style={[styles.chipScrollBtn, styles.chipScrollBtnLeft]}
            onPress={() => scrollCategoryChips(-1)}
            accessibilityRole="button"
            accessibilityLabel="Scroll categories left"
            activeOpacity={0.85}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
        ) : null}
        {chipShowRight ? (
          <TouchableOpacity
            style={[styles.chipScrollBtn, styles.chipScrollBtnRight]}
            onPress={() => scrollCategoryChips(1)}
            accessibilityRole="button"
            accessibilityLabel="Scroll categories right"
            activeOpacity={0.85}
          >
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      {menuHeader}
      {menuError ? (
        <ErrorState
          title="Failed to load menu"
          subtitle="Check your connection and try again."
          onRetry={() => {
            setMenuError(null);
            setRetryTick((n) => n + 1);
          }}
        />
      ) : loading ? (
        <ActivityIndicator color={GREEN} style={{ marginTop: 32 }} size="large" />
      ) : (
        <FlatList
          style={styles.productList}
          data={filteredProducts}
          keyExtractor={(p) => p.id}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={Platform.OS === 'android'}
          contentContainerStyle={[
            styles.list,
            {
              paddingBottom: listBottomPad,
              paddingHorizontal: listPadH,
            },
          ]}
          ListEmptyComponent={<Text style={styles.empty}>No items in this category.</Text>}
          renderItem={({ item: p }) => (
            <ProductCard
              product={p}
              onPress={() => navPush(router, { kind: 'product', productId: p.id }, navRole)}
              onQuickAdd={() => openOptions(p)}
            />
          )}
        />
      )}
      <ProductOptionsBottomSheet
        ref={sheetRef}
        product={sheetProduct}
        onClose={() => setSheetProduct(null)}
        onAddToCart={({ quantity, unitPrice, options }: ProductOptionsPayload) => {
          if (!sheetProduct) return;
          addProduct(
            {
              id: sheetProduct.id,
              name: sheetProduct.name,
              price: unitPrice,
              image: sheetProduct.image,
              type: sheetProduct.type,
              category: sheetProduct.category,
            },
            quantity,
            options
          );
        }}
        onBuyNow={({ quantity, unitPrice, options }: ProductOptionsPayload) => {
          if (!sheetProduct) return;
          addProduct(
            {
              id: sheetProduct.id,
              name: sheetProduct.name,
              price: unitPrice,
              image: sheetProduct.image,
              type: sheetProduct.type,
              category: sheetProduct.category,
            },
            quantity,
            options
          );
          navPush(router, { kind: 'checkout' }, navRole);
        }}
      />
      <SupportFloatingButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    ...Platform.select({
      web: {
        width: '100%',
        maxWidth: '100%',
        minHeight: 0,
      },
      default: {},
    }),
  },
  header: {
    backgroundColor: GREEN,
    paddingBottom: 14,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    zIndex: 8,
    elevation: 8,
    ...Platform.select({
      web: { position: 'relative' as const },
      default: {},
    }),
  },
  headerBrand: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  headerTitles: { flex: 1, minWidth: 0 },
  title: { fontWeight: '900', color: '#FFF' },
  sub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '600',
    marginTop: 4,
    flexShrink: 1,
  },
  chipsWrap: {
    position: 'relative',
    width: '100%',
  },
  chipsScroll: { width: '100%' },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    paddingVertical: 2,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    flexShrink: 0,
  },
  chipOn: { backgroundColor: GOLD, borderColor: GOLD },
  chipText: { fontSize: 12, fontWeight: '800', color: 'rgba(255,255,255,0.9)' },
  chipTextOn: { color: GREEN },
  chipScrollBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(1, 50, 32, 0.82)',
    zIndex: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  chipScrollBtnLeft: {
    left: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0,
  },
  chipScrollBtnRight: {
    right: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 0,
  },
  productList: { flex: 1, minHeight: 0, zIndex: 1 },
  list: { paddingTop: 12 },
  empty: { textAlign: 'center', color: '#94A3B8', fontWeight: '600', marginTop: 24 },
});
