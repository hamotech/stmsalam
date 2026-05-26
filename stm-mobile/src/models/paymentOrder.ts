/**

 * Explicit DTO for admin payment overview — mapped from Firestore, never cast from raw any.

 */



import type { DocumentData } from 'firebase/firestore';

import { getOrderContext } from '@/src/domain/orderPipeline';



function readFiniteNumber(v: unknown): number {

  if (typeof v === 'number' && Number.isFinite(v)) return v;

  if (typeof v === 'string') {

    const n = parseFloat(v);

    return Number.isFinite(n) ? n : 0;

  }

  return 0;

}



/** Normalized row for Payments admin UI. */

export interface PaymentOrder {

  orderId: string;

  totalAmount: number;

  paymentMethod: string;

  paymentStatus: string;

  /** Canonical `orders.status` (snake_case). */

  orderStatus: string;

}



/**

 * Map a Firestore `orders` document into PaymentOrder using explicit field reads.

 */

export function mapFirestoreOrderToPaymentOrder(orderId: string, data: DocumentData): PaymentOrder {

  const doc = { ...(data as Record<string, unknown>), id: orderId };

  const ctx = getOrderContext(doc);



  return {

    orderId,

    totalAmount: readFiniteNumber(data.totalAmount ?? data.total),

    paymentMethod: ctx.paymentMethodNorm,

    paymentStatus: ctx.paymentStatusNorm,

    orderStatus: ctx.canonicalStatus,

  };

}

