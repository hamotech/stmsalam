/**
 * Explicit DTO for admin payment overview — mapped from Firestore, never cast from raw any.
 */

import type { DocumentData } from 'firebase/firestore';
import {
  normalizeGrabOrderStatus,
  normalizePaymentMethod,
  normalizeCanonicalPaymentStatus,
} from '@/src/domain/orderPipeline';
import type { GrabOrderStatus } from '@/src/services/grabFlowOrderService';

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
  paymentStatus: ReturnType<typeof normalizeCanonicalPaymentStatus>;
  orderStatus: GrabOrderStatus;
}

/**
 * Map a Firestore `orders` document into PaymentOrder using explicit field reads.
 */
export function mapFirestoreOrderToPaymentOrder(orderId: string, data: DocumentData): PaymentOrder {
  const paymentFields = {
    paymentMethod: data.paymentMethod,
    payment_method: data.payment_method,
  };
  const statusFields = {
    paymentStatus: data.paymentStatus,
    payment_status: data.payment_status,
  };
  const pipelineFields = {
    orderStatus: data.orderStatus,
    status: data.status,
    stage: data.stage,
  };

  return {
    orderId,
    totalAmount: readFiniteNumber(data.totalAmount ?? data.total),
    paymentMethod: normalizePaymentMethod(paymentFields),
    paymentStatus: normalizeCanonicalPaymentStatus(statusFields),
    orderStatus: normalizeGrabOrderStatus(pipelineFields),
  };
}
