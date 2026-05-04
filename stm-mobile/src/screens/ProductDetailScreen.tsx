/**
 * Product detail — customization UI driven only by `getProductOptions` resolution (schema + override).
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { navPush } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchProductById, type Product } from '@/src/services/menuService';
import { useCart, type CartLineOptions } from '@/src/context/CartContext';
import { productImageUrl } from '@/src/utils/productImage';
import HeaderBar from '@/src/components/stm/HeaderBar';
import SupportFloatingButtons from '@/src/components/SupportFloatingButtons';
import { Brand, cardShadow } from '@/src/theme/brand';
import type { ProductLike, ResolvedOptionField } from '@/src/utils/productOptionsEngine';
import {
  getProductOptions,
  hasSmartOptions,
  defaultSelectionsFromResolved,
  selectionToCartOptions,
  sanitizeCartOptions,
} from '@/src/utils/productOptionsEngine';

function catalogAsProductLike(p: Product): ProductLike {
  return {
    name: p.name,
    type: p.type,
    category: p.category,
    customizationOverride: p.customizationOverride as ProductLike['customizationOverride'],
  };
}

const FIELD_ORDER = ['size', 'sugar', 'ice', 'quantity', 'addons'];

function sortFieldKeys(keys: string[]): string[] {
  return [...keys].sort((a, b) => {
    const ia = FIELD_ORDER.indexOf(a);
    const ib = FIELD_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

function titleForFieldKey(key: string): string {
  const labels: Record<string, string> = {
    size: 'Size',
    sugar: 'Sugar',
    ice: 'Ice',
    quantity: 'Quantity',
    addons: 'Add-ons',
  };
  return labels[key] ?? key.replace(/^\w/, (c) => c.toUpperCase());
}

function OptionFieldBlock({
  fieldKey,
  field,
  singleValue,
  multiValue,
  onSingle,
  onToggleMulti,
}: {
  fieldKey: string;
  field: ResolvedOptionField;
  singleValue?: string;
  multiValue?: string[];
  onSingle: (v: string) => void;
  onToggleMulti: (choice: string) => void;
}) {
  if (!field.choices.length) return null;

  if (field.optionType === 'multi') {
    const set = new Set(multiValue ?? []);
    return (
      <View style={[styles.optionCard, cardShadow]}>
        <Text style={styles.optionTitle}>
          {titleForFieldKey(fieldKey)}
          {field.required ? ' *' : ''}
        </Text>
        <View style={styles.chipWrap}>
          {field.choices.map((c) => {
            const on = set.has(c);
            return (
              <TouchableOpacity
                key={c}
                style={[styles.chip, on && styles.chipOn]}
                onPress={() => onToggleMulti(c)}
                activeOpacity={0.85}
              >
                <Text style={[styles.chipText, on && styles.chipTextOn]}>{c}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.optionCard, cardShadow]}>
      <Text style={styles.optionTitle}>
        {titleForFieldKey(fieldKey)}
        {field.required ? ' *' : ''}
      </Text>
      <View style={styles.chipWrap}>
        {field.choices.map((c) => {
          const on = singleValue === c;
          return (
            <TouchableOpacity
              key={c}
              style={[styles.chip, on && styles.chipOn]}
              onPress={() => onSingle(c)}
              activeOpacity={0.85}
            >
              <Text style={[styles.chipText, on && styles.chipTextOn]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function customizationSatisfied(resolved: ReturnType<typeof getProductOptions>, sel: CartLineOptions): boolean {
  for (const [key, field] of Object.entries(resolved.fields)) {
    if (!field.required) continue;
    if (field.optionType === 'multi') {
      const arr = key === 'addons' ? sel.addons : undefined;
      if (!arr?.length) return false;
    } else {
      const v = sel[key as keyof CartLineOptions];
      if (typeof v !== 'string' || !v.trim()) return false;
    }
  }
  return true;
}

export default function ProductDetailScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const insets = useSafeAreaInsets();
  const { productId: rawId } = useLocalSearchParams<{ productId: string }>();
  const productId = decodeURIComponent(rawId ?? '').trim();
  const { addProduct } = useCart();

  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [sel, setSel] = useState<CartLineOptions>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!productId) {
        setProduct(null);
        return;
      }
      const p = await fetchProductById(productId);
      if (!cancelled) setProduct(p);
    })();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  const resolved = useMemo(
    () => (product ? getProductOptions(catalogAsProductLike(product)) : { schemaId: null, fields: {} }),
    [product]
  );

  useEffect(() => {
    if (!product) return;
    const r = getProductOptions(catalogAsProductLike(product));
    if (!hasSmartOptions(r)) {
      setSel({});
      return;
    }
    setSel(defaultSelectionsFromResolved(r));
  }, [product?.id]);

  const showOptions = product != null && hasSmartOptions(resolved);
  const fieldKeys = useMemo(() => sortFieldKeys(Object.keys(resolved.fields)), [resolved.fields]);

  const hint = useMemo(() => {
    if (!product) return '';
    if (!hasSmartOptions(resolved)) {
      return 'Ready to add — no customizations for this item.';
    }
    const labels = fieldKeys.map(titleForFieldKey);
    return `Choose ${labels.join(', ')} below, then add to cart.`;
  }, [product, resolved, fieldKeys]);

  const setSingle = (key: string, v: string) => {
    setSel((s) => {
      const next = { ...s };
      if (key === 'size') next.size = v;
      else if (key === 'sugar') next.sugar = v;
      else if (key === 'ice') next.ice = v;
      else if (key === 'quantity') next.quantity = v;
      return next;
    });
  };

  const toggleMulti = (key: string, choice: string) => {
    if (key !== 'addons') return;
    setSel((s) => {
      const cur = s.addons ?? [];
      const has = cur.includes(choice);
      const next = has ? cur.filter((x) => x !== choice) : [...cur, choice];
      return { ...s, addons: next.length ? next : undefined };
    });
  };

  const applyLine = (p: Product, goCheckout: boolean) => {
    if (showOptions && !customizationSatisfied(resolved, sel)) {
      return;
    }
    const raw = showOptions ? selectionToCartOptions(resolved, sel) : undefined;
    const opts =
      raw && Object.keys(raw).length ? sanitizeCartOptions(catalogAsProductLike(p), raw) : undefined;
    addProduct(
      {
        id: p.id,
        name: p.name,
        price: Number(p.price),
        image: p.image || p.img,
        type: p.type,
        category: p.category,
      },
      1,
      opts && Object.keys(opts).length ? opts : undefined
    );
    if (goCheckout) navPush(router, { kind: 'checkout' }, navRole);
  };

  const canSubmit = !showOptions || customizationSatisfied(resolved, sel);

  if (product === undefined) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Brand.green} size="large" />
        <SupportFloatingButtons />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.miss}>Product not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>Go back</Text>
        </TouchableOpacity>
        <SupportFloatingButtons />
      </View>
    );
  }

  const uri = productImageUrl(product.image || product.img);
  const fromPrice = Number(product.price).toFixed(2);

  return (
    <View style={styles.root}>
      <HeaderBar
        title={product.name}
        subtitle={showOptions ? 'Customize below' : 'Add to cart'}
        showBack
      />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {uri ? (
          <Image source={{ uri }} style={styles.hero} contentFit="cover" />
        ) : (
          <View style={[styles.hero, styles.heroPh]}>
            <Text style={styles.heroPhText}>🍽️</Text>
          </View>
        )}

        <View style={[styles.card, cardShadow]}>
          <Text style={styles.from}>${fromPrice}</Text>
          {product.description?.trim() ? (
            <Text style={styles.desc}>{product.description.trim()}</Text>
          ) : null}
          <Text style={styles.hint}>{hint}</Text>
        </View>

        {showOptions ? (
          <View style={styles.optionsBlock}>
            {fieldKeys.map((key) => {
              const field = resolved.fields[key];
              if (!field) return null;
              const singleValue =
                key === 'size'
                  ? sel.size
                  : key === 'sugar'
                    ? sel.sugar
                    : key === 'ice'
                      ? sel.ice
                      : key === 'quantity'
                        ? sel.quantity
                        : undefined;
              return (
                <OptionFieldBlock
                  key={key}
                  fieldKey={key}
                  field={field}
                  singleValue={field.optionType === 'single' ? singleValue : undefined}
                  multiValue={field.optionType === 'multi' && key === 'addons' ? sel.addons : undefined}
                  onSingle={(v) => setSingle(key, v)}
                  onToggleMulti={(c) => toggleMulti(key, c)}
                />
              );
            })}
          </View>
        ) : null}
      </ScrollView>

      <View style={[styles.footer, cardShadow, { paddingBottom: Math.max(insets.bottom, 12) + 8 }]}>
        <TouchableOpacity
          style={[styles.footerAdd, !canSubmit && styles.footerDisabled]}
          onPress={() => applyLine(product, false)}
          activeOpacity={0.9}
          disabled={!canSubmit}
        >
          <Text style={styles.footerAddText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerBuy, !canSubmit && styles.footerDisabled]}
          onPress={() => applyLine(product, true)}
          activeOpacity={0.9}
          disabled={!canSubmit}
        >
          <Text style={styles.footerBuyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      <SupportFloatingButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  scroll: { paddingBottom: 120 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Brand.bg },
  miss: { fontSize: 16, fontWeight: '800', color: Brand.text },
  back: { marginTop: 12, color: Brand.green, fontWeight: '800' },
  hero: { width: '100%', height: 240, backgroundColor: Brand.card },
  heroPh: { alignItems: 'center', justifyContent: 'center' },
  heroPhText: { fontSize: 56 },
  card: {
    backgroundColor: Brand.card,
    marginHorizontal: Brand.space,
    marginTop: Brand.spaceSm,
    padding: Brand.space,
    borderRadius: Brand.radius,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  from: { fontSize: 24, fontWeight: '900', color: Brand.green },
  desc: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
    color: Brand.text,
    lineHeight: 22,
  },
  hint: { marginTop: 10, fontSize: 14, fontWeight: '600', color: Brand.muted, lineHeight: 21 },
  optionsBlock: {
    marginHorizontal: Brand.space,
    marginTop: Brand.spaceSm,
    gap: Brand.spaceSm,
  },
  optionCard: {
    backgroundColor: Brand.card,
    padding: Brand.space,
    borderRadius: Brand.radius,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  optionTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: Brand.text,
    marginBottom: 10,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: Brand.bg,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  chipOn: {
    backgroundColor: Brand.green,
    borderColor: Brand.green,
  },
  chipText: { fontSize: 13, fontWeight: '800', color: Brand.text },
  chipTextOn: { color: '#FFF' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 12,
    padding: Brand.space,
    backgroundColor: Brand.card,
    borderTopWidth: 1,
    borderTopColor: Brand.border,
  },
  footerDisabled: { opacity: 0.45 },
  footerAdd: {
    flex: 1,
    borderWidth: 2,
    borderColor: Brand.gold,
    borderRadius: Brand.radius,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: Brand.card,
  },
  footerAddText: { fontSize: 15, fontWeight: '900', color: Brand.green },
  footerBuy: {
    flex: 1,
    backgroundColor: Brand.gold,
    borderRadius: Brand.radius,
    paddingVertical: 15,
    alignItems: 'center',
  },
  footerBuyText: { fontSize: 15, fontWeight: '900', color: Brand.green },
});
