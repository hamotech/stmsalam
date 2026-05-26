export function assertNoLegacyProductFields(product) {
  if (product && Object.prototype.hasOwnProperty.call(product, 'active')) {
    throw new Error('product.active is forbidden. Use available only.');
  }
}

export function assertProductVisibility(product) {
  const hasAvailable = Object.prototype.hasOwnProperty.call(product || {}, 'available');
  if (!hasAvailable) {
    console.warn('[products.visibility] Missing `available`; defaulting to true for legacy doc.', {
      productId: product?.id || null,
    });
    return { ...product, available: true };
  }
  return product;
}

export function assertNoDirectProductQuery(source) {
  const text = String(source || '');
  const touchesProducts =
    text.includes("collection('products')") ||
    text.includes('collection("products")') ||
    text.includes('getDocs(products)') ||
    text.includes("getDocs(collection(db, 'products'))") ||
    text.includes('getDocs(collection(db, "products"))');

  const fromCore =
    text.includes('shared/useProductsCore.js') || text.includes('useProductsCore');

  if (touchesProducts && !fromCore) {
    throw new Error('Direct product query forbidden. Use shared/useProductsCore.js');
  }
}

