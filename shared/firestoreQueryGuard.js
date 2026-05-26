import { assertNoDirectProductQuery } from './productDomainGuard.js';

export function safeProductQuery(fn, context) {
  const normalizedContext = String(context || '');
  if (normalizedContext !== 'useProductsCore') {
    throw new Error('Unsafe product query access blocked');
  }
  assertNoDirectProductQuery(`shared/useProductsCore.js:${normalizedContext}`);
  return fn();
}

