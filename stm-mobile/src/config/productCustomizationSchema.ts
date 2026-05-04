/**
 * Data-driven product customization — priority-ordered rules (Grab / Zomato style).
 * Extend this array or set `product.customizationOverride` in Firestore; no engine code changes required.
 */

export type OptionType = 'single' | 'multi';

/** Full field definition (future: required, multi-select). */
export type OptionFieldDef = {
  choices: string[];
  optionType: OptionType;
  /** When true, UI should block add-to-cart until set (enforced in screen). */
  required?: boolean;
};

/** Shorthand: array of choices implies single-select. */
export type OptionFieldInput = OptionFieldDef | string[];

export type SchemaMatch = {
  /** Strong match: `product.type` must equal one of these (normalized). */
  type?: string[];
  /** Weak match: product name must include one of these substrings (normalized). */
  keywords?: string[];
};

export type CustomizationSchemaEntry = {
  id: string;
  /** Higher wins when multiple schemas match. */
  priority: number;
  match: SchemaMatch;
  /** Keys become customization dimensions (must map to cart-supported ids: size, sugar, ice, quantity, addons). */
  options: Record<string, OptionFieldInput>;
};

/**
 * Global customization rules — sorted by priority at runtime, not array order.
 * Matching: if both `type` and `keywords` are set, match when **either** fits (type OR keywords).
 */
export const PRODUCT_CUSTOMIZATION_SCHEMA: CustomizationSchemaEntry[] = [
  {
    id: 'tea',
    priority: 205,
    match: {
      keywords: ['teh', 'tarik', 'milk tea', 'bubble tea', 'chai', 'tea'],
    },
    options: {
      addons: {
        choices: ['Extra pearls', 'Extra concentrated'],
        optionType: 'multi',
        required: false,
      },
    },
  },
  {
    id: 'coffee',
    priority: 200,
    match: {
      keywords: ['coffee', 'latte', 'cappuccino', 'espresso'],
    },
    options: {
      ice: {
        choices: ['No Ice', 'Less Ice', 'Regular Ice'],
        optionType: 'single',
        required: false,
      },
      sugar: {
        choices: ['No Sugar', 'Less Sugar', 'Normal Sugar', 'Extra Sugar'],
        optionType: 'single',
        required: false,
      },
      addons: {
        choices: ['Extra shot', 'Oat milk', 'Whipped cream'],
        optionType: 'multi',
        required: false,
      },
    },
  },
  {
    id: 'dessert',
    priority: 150,
    match: {
      keywords: ['cake', 'ice cream', 'brownie', 'dessert'],
    },
    options: {
      quantity: {
        choices: ['1', '2', '3', '4', '5'],
        optionType: 'single',
        required: false,
      },
    },
  },
  {
    id: 'food',
    priority: 100,
    match: {
      type: ['food'],
      keywords: [
        'burger',
        'kebab',
        'kabab',
        'snack',
        'rice',
        'noodles',
        'pizza',
        'fried',
        'chicken',
        'meal',
        'combo',
        'shawarma',
        'biryani',
      ],
    },
    options: {
      size: {
        choices: ['Small', 'Medium', 'Large'],
        optionType: 'single',
        required: false,
      },
      addons: {
        choices: ['Extra cheese', 'Extra patty', 'Add egg'],
        optionType: 'multi',
        required: false,
      },
    },
  },
  {
    id: 'drink',
    priority: 100,
    match: {
      type: ['drink'],
      keywords: ['coke', 'pepsi', 'fanta', 'juice', 'sprite'],
    },
    options: {
      ice: {
        choices: ['No Ice', 'Less Ice', 'Regular Ice', 'Extra Ice'],
        optionType: 'single',
        required: false,
      },
    },
  },
];

/** Cart-safe field ids (must stay in sync with `CartLineOptions`). */
export const CART_OPTION_KEYS = ['size', 'sugar', 'ice', 'quantity', 'addons'] as const;
export type CartOptionKey = (typeof CART_OPTION_KEYS)[number];

export function isCartOptionKey(k: string): k is CartOptionKey {
  return (CART_OPTION_KEYS as readonly string[]).includes(k);
}

export function normalizeFieldInput(input: OptionFieldInput): OptionFieldDef {
  if (Array.isArray(input)) {
    return { choices: [...input], optionType: 'single', required: false };
  }
  return {
    choices: [...input.choices],
    optionType: input.optionType ?? 'single',
    required: input.required ?? false,
  };
}

export function normalizeSchemaOptions(
  options: Record<string, OptionFieldInput>
): Record<string, OptionFieldDef> {
  const out: Record<string, OptionFieldDef> = {};
  for (const [key, raw] of Object.entries(options)) {
    out[key] = normalizeFieldInput(raw);
  }
  return out;
}
