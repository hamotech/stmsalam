import type { CartLineOptions } from '@/src/context/CartContext';

export type ProductOptionsSheetProduct = {
  id: string;
  name: string;
  price: number;
  image?: string;
  /** Pass through from menu/catalog so food vs drink options match `isFoodItem`. */
  type?: string;
  category?: string;
};

export type ProductOptionsPayload = {
  quantity: number;
  unitPrice: number;
  options: CartLineOptions;
};

/** Imperative API used by screens (`present` / `dismiss`). */
export type ProductOptionsSheetRef = {
  present: () => void;
  dismiss: () => void;
};

export type ProductOptionsBottomSheetProps = {
  product: ProductOptionsSheetProduct | null;
  onAddToCart: (p: ProductOptionsPayload) => void;
  onBuyNow: (p: ProductOptionsPayload) => void;
  onClose?: () => void;
};
