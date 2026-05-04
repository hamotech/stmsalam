/**
 * Web: RN Modal instead of @gorhom/bottom-sheet (avoids blank screen / native deps).
 */

import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Brand, cardShadow } from '@/src/theme/brand';
import { productImageUrl } from '@/src/utils/productImage';
import {
  PRODUCT_SIZES,
  PRODUCT_SUGARS,
  PRODUCT_ICE,
  PRODUCT_ADDONS,
  defaultOptionSelection,
  computeUnitPrice,
  selectionToCartOptionsForProduct,
  type OptionSelection,
  type ProductSize,
  type ProductSugar,
  type ProductIce,
} from '@/src/config/productOptions';
import { isFoodItem } from '@/src/utils/productOptionsEngine';
import type {
  ProductOptionsBottomSheetProps,
  ProductOptionsPayload,
  ProductOptionsSheetRef,
} from './ProductOptionsBottomSheet.types';

const RadioRow = ({
  label,
  choices,
  value,
  onChange,
}: {
  label: string;
  choices: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <View style={styles.optionBlock}>
    <Text style={styles.optionLabel}>{label}</Text>
    <View style={styles.radioWrap}>
      {choices.map((opt) => {
        const on = value === opt;
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.radioChip, on && styles.radioChipOn]}
            onPress={() => onChange(opt)}
            activeOpacity={0.85}
          >
            <View style={[styles.radioDot, on && styles.radioDotOn]} />
            <Text style={[styles.radioText, on && styles.radioTextOn]}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

export const ProductOptionsBottomSheet = forwardRef<ProductOptionsSheetRef, ProductOptionsBottomSheetProps>(
  function ProductOptionsBottomSheet({ product, onAddToCart, onBuyNow, onClose }, ref) {
    const insets = useSafeAreaInsets();
    const [open, setOpen] = useState(false);

    const [sel, setSel] = useState<OptionSelection>(defaultOptionSelection);
    const [qty, setQty] = useState(1);

    useImperativeHandle(ref, () => ({
      present: () => setOpen(true),
      dismiss: () => {
        setOpen(false);
        onClose?.();
      },
    }));

    useEffect(() => {
      if (!product?.id) return;
      setSel(defaultOptionSelection());
      setQty(1);
    }, [product?.id]);

    const unitPrice = useMemo(
      () => (product ? computeUnitPrice(product.price, sel) : 0),
      [product, sel]
    );

    const lineTotal = useMemo(() => unitPrice * qty, [unitPrice, qty]);

    const sheetProductLike = product
      ? { name: product.name, type: product.type, category: product.category }
      : null;
    const omitSugarIce = sheetProductLike ? isFoodItem(sheetProductLike) : false;

    const buildPayload = (): ProductOptionsPayload | null => {
      if (!product) return null;
      return {
        quantity: qty,
        unitPrice,
        options: selectionToCartOptionsForProduct(sel, {
          name: product.name,
          type: product.type,
          category: product.category,
        }),
      };
    };

    const close = () => {
      setOpen(false);
      onClose?.();
    };

    const onPressAdd = () => {
      const p = buildPayload();
      if (!p) return;
      onAddToCart(p);
      close();
    };

    const onPressBuy = () => {
      const p = buildPayload();
      if (!p) return;
      onBuyNow(p);
      close();
    };

    const uri = product ? productImageUrl(product.image) : null;

    return (
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={close}
        statusBarTranslucent
      >
        <View style={styles.modalRoot}>
          <Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close" />
          <View
            style={[
              styles.sheet,
              cardShadow,
              { paddingBottom: Math.max(insets.bottom, 16) + 8 },
            ]}
          >
            <View style={styles.handle} />
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              {!product ? (
                <Text style={styles.empty}>Loading…</Text>
              ) : (
                <>
                  <View style={styles.headerRow}>
                    {uri ? (
                      <Image source={{ uri }} style={styles.thumb} contentFit="cover" />
                    ) : (
                      <View style={[styles.thumb, styles.thumbPh]}>
                        <Text style={styles.thumbPhTxt}>🍽️</Text>
                      </View>
                    )}
                    <View style={styles.headerText}>
                      <Text style={styles.title} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text style={styles.unitPrice}>
                        ${unitPrice.toFixed(2)} <Text style={styles.each}>each</Text>
                      </Text>
                    </View>
                  </View>

                  <RadioRow
                    label="Size"
                    choices={PRODUCT_SIZES}
                    value={sel.size}
                    onChange={(v) => setSel((s) => ({ ...s, size: v as ProductSize }))}
                  />
                  {!omitSugarIce ? (
                    <>
                      <RadioRow
                        label="Sugar level"
                        choices={PRODUCT_SUGARS}
                        value={sel.sugar}
                        onChange={(v) => setSel((s) => ({ ...s, sugar: v as ProductSugar }))}
                      />
                      <RadioRow
                        label="Ice level"
                        choices={PRODUCT_ICE}
                        value={sel.ice}
                        onChange={(v) => setSel((s) => ({ ...s, ice: v as ProductIce }))}
                      />
                    </>
                  ) : null}

                  <View style={styles.optionBlock}>
                    <Text style={styles.optionLabel}>Add-ons</Text>
                    {PRODUCT_ADDONS.map((a) => {
                      const on = sel.addonIds.includes(a.id);
                      return (
                        <TouchableOpacity
                          key={a.id}
                          style={[styles.checkRow, on && styles.checkRowOn]}
                          onPress={() =>
                            setSel((s) => ({
                              ...s,
                              addonIds: on
                                ? s.addonIds.filter((x) => x !== a.id)
                                : [...s.addonIds, a.id],
                            }))
                          }
                          activeOpacity={0.88}
                        >
                          <Text style={styles.checkLabel}>
                            {a.label}
                            {a.price > 0 ? `  +$${a.price.toFixed(2)}` : ''}
                          </Text>
                          <Text style={styles.checkBox}>{on ? '☑' : '☐'}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <View style={styles.qtyBlock}>
                    <Text style={styles.optionLabel}>Quantity</Text>
                    <View style={styles.qtyRow}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => setQty((q) => Math.max(1, q - 1))}
                      >
                        <Text style={styles.qtyBtnTxt}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyVal}>{qty}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => setQty((q) => Math.min(99, q + 1))}
                      >
                        <Text style={styles.qtyBtnTxt}>+</Text>
                      </TouchableOpacity>
                      <Text style={styles.lineTotal}>
                        Total <Text style={styles.lineTotalBold}>${lineTotal.toFixed(2)}</Text>
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.actions, cardShadow]}>
                    <TouchableOpacity style={styles.btnAdd} onPress={onPressAdd} activeOpacity={0.9}>
                      <Text style={styles.btnAddText}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnBuy} onPress={onPressBuy} activeOpacity={0.9}>
                      <Text style={styles.btnBuyText}>Buy Now</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
);

const BOTTOM_SHEET_STACK_Z = 5000;

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: BOTTOM_SHEET_STACK_Z,
    elevation: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 0,
  },
  sheet: {
    backgroundColor: Brand.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '88%',
    zIndex: 1,
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: Brand.border,
    marginTop: 10,
    marginBottom: 6,
  },
  scrollContent: {
    paddingHorizontal: Brand.space,
    paddingTop: 8,
    paddingBottom: 24,
  },
  empty: { textAlign: 'center', color: Brand.muted, fontWeight: '600', padding: 24 },
  headerRow: { flexDirection: 'row', gap: 14, marginBottom: 20 },
  thumb: {
    width: 88,
    height: 88,
    borderRadius: 14,
    backgroundColor: Brand.bg,
  },
  thumbPh: { alignItems: 'center', justifyContent: 'center' },
  thumbPhTxt: { fontSize: 32 },
  headerText: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '900', color: Brand.text, lineHeight: 24 },
  unitPrice: { marginTop: 6, fontSize: 20, fontWeight: '900', color: Brand.green },
  each: { fontSize: 13, fontWeight: '700', color: Brand.muted },

  optionBlock: { marginBottom: 18 },
  optionLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: Brand.text,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  radioWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  radioChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Brand.border,
    backgroundColor: Brand.bg,
  },
  radioChipOn: {
    borderColor: Brand.gold,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
  },
  radioDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Brand.muted,
  },
  radioDotOn: { borderColor: Brand.green, backgroundColor: Brand.green },
  radioText: { fontSize: 13, fontWeight: '700', color: Brand.text },
  radioTextOn: { color: Brand.green },

  checkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Brand.border,
    marginBottom: 8,
    backgroundColor: Brand.bg,
  },
  checkRowOn: { borderColor: Brand.gold, backgroundColor: 'rgba(212, 175, 55, 0.08)' },
  checkLabel: { fontSize: 14, fontWeight: '700', color: Brand.text },
  checkBox: { fontSize: 20, color: Brand.green },

  qtyBlock: { marginBottom: 20 },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Brand.bg,
    borderWidth: 1,
    borderColor: Brand.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnTxt: { fontSize: 22, fontWeight: '900', color: Brand.green },
  qtyVal: {
    fontSize: 18,
    fontWeight: '900',
    color: Brand.text,
    minWidth: 36,
    textAlign: 'center',
  },
  lineTotal: { marginLeft: 'auto', fontSize: 14, fontWeight: '700', color: Brand.muted },
  lineTotalBold: { color: Brand.green, fontSize: 18 },

  actions: {
    gap: 12,
    paddingTop: 4,
  },
  btnAdd: {
    backgroundColor: Brand.card,
    borderWidth: 2,
    borderColor: Brand.gold,
    borderRadius: Brand.radius,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnAddText: { fontSize: 16, fontWeight: '900', color: Brand.green },
  btnBuy: {
    backgroundColor: Brand.gold,
    borderRadius: Brand.radius,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnBuyText: { fontSize: 16, fontWeight: '900', color: Brand.green },
});
