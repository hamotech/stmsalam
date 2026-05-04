/**
 * Priority-based customization engine — driven by `productCustomizationSchema.ts`
 * and optional Firestore `product.customizationOverride`.
 */

import type { CartLineOptions } from '@/src/context/CartContext';
import {
  PRODUCT_CUSTOMIZATION_SCHEMA,
  normalizeSchemaOptions,
  normalizeFieldInput,
  isCartOptionKey,
  type CustomizationSchemaEntry,
  type OptionFieldDef,
  type OptionFieldInput,
} from '@/src/config/productCustomizationSchema';

export type ProductLike = {
  name: string;
  type?: string;
  category?: string;
  /** Firestore: per-SKU override — always wins for listed fields. */
  customizationOverride?: Record<string, OptionFieldInput>;
};

/** Resolved field ready for UI + cart mapping. */
export type ResolvedOptionField = OptionFieldDef;

export type ResolvedCustomization = {
  /** Winning rule id, or `override-only` / `none`. */
  schemaId: string | null;
  fields: Record<string, ResolvedOptionField>;
};

function norm(s: string): string {
  return s.toLowerCase().trim();
}

/** Drink categories override food when present (production safety). */
const DRINK_CATEGORY_HINTS = [
  'drink',
  'drinks',
  'beverage',
  'beverages',
  'juice',
  'tea',
  'coffee',
  'milk tea',
  'bubble tea',
  'soft drink',
  'cold drink',
  'smoothie',
  'soda',
];

/** Category / name hints that imply food (not drinks) — normalized substring match. */
const FOOD_CATEGORY_HINTS = [
  'burger',
  'kabab',
  'kebab',
  'snack',
  'rice',
  'meal',
  'pizza',
  'fried',
  'noodle',
  'food',
  'main',
  'combo',
  'biryani',
  'shawarma',
  'grill',
  'sides',
  'platter',
];

const FOOD_NAME_HINTS = [
  'burger',
  'biryani',
  'shawarma',
  'kebab',
  'kabab',
  'pizza',
  'nasi ',
  'nasi-',
  'mee ',
  'mee-',
  'fried chicken',
  'nugget',
  'combo meal',
  'wrap',
  'sandwich',
  'hotdog',
  'roti',
  'prata',
  'curry',
  'plate',
  'goreng',
];

/**
 * Drink name overrides (highest keyword priority). Word boundaries where needed.
 * If both food + drink hints match in the name, drink wins.
 */
const DRINK_NAME_PATTERNS: RegExp[] = [
  /juice/,
  /smoothie/,
  /milkshake/,
  /soda/,
  /cola/,
  /coca[\s-]?cola/,
  /coke/,
  /pepsi/,
  /sprite/,
  /fanta/,
  /coffee/,
  /latte/,
  /cappuccino/,
  /espresso/,
  /\btea\b/,
  /teh/,
  /tarik/,
  /bubble tea/,
  /milk tea/,
  /\bchai\b/,
  /drink/,
  /beverage/,
];

function nameMatchesDrinkOverride(name: string): boolean {
  if (!name.length) return false;
  return DRINK_NAME_PATTERNS.some((re) => re.test(name));
}

function nameMatchesFoodHint(name: string): boolean {
  if (!name.length) return false;
  return FOOD_NAME_HINTS.some((h) => name.includes(h));
}

/**
 * Food vs drink for ice/sugar gating.
 *
 * Order: (1) explicit `type` food/drink → final; (2) drink category → not food;
 * (3) name drink vs food keywords — **both** → drink wins; (4) food category → food;
 * (5) food name hints; (6) unknown → not food (avoid stripping drink options).
 */
export function isFoodItem(product: ProductLike): boolean {
  const pType = norm(product.type || '');
  if (pType === 'food') return true;
  if (pType === 'drink' || pType === 'beverage') return false;

  const name = norm(product.name || '');
  const cat = norm(product.category || '');

  const catDrink = !!(cat && DRINK_CATEGORY_HINTS.some((h) => cat.includes(h)));
  const catFood = !!(cat && FOOD_CATEGORY_HINTS.some((h) => cat.includes(h)));

  if (catDrink) return false;

  const nameDrink = nameMatchesDrinkOverride(name);
  const nameFood = nameMatchesFoodHint(name);

  if (nameDrink && nameFood) return false;
  if (nameDrink) return false;

  if (catFood) return true;
  if (nameFood) return true;

  return false;
}

/**
 * Immutable cart options: food lines never carry ice/sugar; drinks keep all fields.
 * Use before persistence (cart write, Firestore order payload).
 */
export function sanitizeCartOptions(
  product: ProductLike,
  options: CartLineOptions | undefined
): CartLineOptions | undefined {
  if (options == null) return undefined;
  const keys = Object.keys(options);
  if (keys.length === 0) {
    return { ...options };
  }
  const clone: CartLineOptions = {
    ...options,
    addons: options.addons?.length ? [...options.addons] : undefined,
  };
  if (!isFoodItem(product)) return clone;
  delete clone.ice;
  delete clone.sugar;
  return clone;
}

function stripIceSugarForFood(
  product: ProductLike,
  fields: Record<string, ResolvedOptionField>
): Record<string, ResolvedOptionField> {
  if (!isFoodItem(product)) return fields;
  const next = { ...fields };
  delete next.ice;
  delete next.sugar;
  return next;
}

/**
 * Safety net at UI boundary — same rules as {@link sanitizeCartOptions}; never mutates input.
 */
export function filterInvalidOptions(product: ProductLike, options: CartLineOptions): CartLineOptions {
  return sanitizeCartOptions(product, options) ?? {};
}

function schemaMatches(product: ProductLike, entry: CustomizationSchemaEntry): boolean {
  const name = norm(product.name);
  const pType = norm(product.type || '');
  const m = entry.match;
  const hasType = !!(m.type?.length);
  const hasKw = !!(m.keywords?.length);
  if (!hasType && !hasKw) return false;

  const typeOk = !hasType || m.type!.some((t) => pType === norm(t));
  const kwOk = !hasKw || m.keywords!.some((kw) => name.includes(norm(kw)));

  if (hasType && hasKw) return typeOk || kwOk;
  if (hasType) return typeOk;
  return kwOk;
}

function pickWinningSchema(product: ProductLike): CustomizationSchemaEntry | null {
  const matches = PRODUCT_CUSTOMIZATION_SCHEMA.filter((e) => schemaMatches(product, e));
  if (!matches.length) return null;
  matches.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.id.localeCompare(b.id);
  });
  return matches[0];
}

function applyOverride(
  base: Record<string, ResolvedOptionField>,
  override?: Record<string, OptionFieldInput>
): Record<string, ResolvedOptionField> {
  if (!override || typeof override !== 'object') return base;
  const next = { ...base };
  for (const [key, raw] of Object.entries(override)) {
    const def = normalizeFieldInput(raw);
    if (def.choices.length) next[key] = def;
  }
  return next;
}

/** Keep only keys that the cart line type supports (extras ignored until cart extended). */
function filterCartSafeFields(fields: Record<string, ResolvedOptionField>): Record<string, ResolvedOptionField> {
  const out: Record<string, ResolvedOptionField> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (isCartOptionKey(k)) out[k] = v;
  }
  return out;
}

/**
 * Resolve customization: highest-priority matching schema, then apply Firestore override.
 * Override keys replace or add fields and always win for those dimensions.
 */
export function getProductOptions(product: ProductLike): ResolvedCustomization {
  const override = product.customizationOverride;
  const winner = pickWinningSchema(product);

  if (!winner) {
    if (override && Object.keys(override).length) {
      const raw = filterCartSafeFields(applyOverride({}, override));
      const fields = stripIceSugarForFood(product, raw);
      return {
        schemaId: Object.keys(fields).length ? 'override-only' : null,
        fields,
      };
    }
    return { schemaId: null, fields: {} };
  }

  const base = normalizeSchemaOptions(winner.options);
  const merged = applyOverride(base, override);
  const fields = stripIceSugarForFood(product, filterCartSafeFields(merged));

  return {
    schemaId: Object.keys(fields).length ? winner.id : null,
    fields,
  };
}

export function hasSmartOptions(resolved: ResolvedCustomization): boolean {
  return Object.keys(resolved.fields).some((k) => resolved.fields[k]?.choices?.length);
}

/** Default picks: first single choice; multi fields start empty. */
export function defaultSelectionsFromResolved(resolved: ResolvedCustomization): CartLineOptions {
  const o: CartLineOptions = {};
  for (const [key, field] of Object.entries(resolved.fields)) {
    if (!field.choices.length) continue;
    if (field.optionType === 'multi') {
      if (key === 'addons') o.addons = [];
    } else if (isCartOptionKey(key)) {
      const first = field.choices[0];
      if (key === 'size') o.size = first;
      else if (key === 'sugar') o.sugar = first;
      else if (key === 'ice') o.ice = first;
      else if (key === 'quantity') o.quantity = first;
    }
  }
  return o;
}

/** Build cart options from current UI state using only resolved fields. */
export function selectionToCartOptions(
  resolved: ResolvedCustomization,
  sel: CartLineOptions
): CartLineOptions {
  const o: CartLineOptions = {};
  for (const key of Object.keys(resolved.fields)) {
    if (!isCartOptionKey(key)) continue;
    const field = resolved.fields[key];
    if (field.optionType === 'multi') {
      if (key === 'addons' && sel.addons?.length) {
        o.addons = [...sel.addons].sort();
      }
    } else {
      const v = sel[key as keyof CartLineOptions];
      if (typeof v === 'string' && v) {
        if (key === 'size') o.size = v;
        else if (key === 'sugar') o.sugar = v;
        else if (key === 'ice') o.ice = v;
        else if (key === 'quantity') o.quantity = v;
      }
    }
  }
  return o;
}
