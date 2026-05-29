// Minimal wrapper for the adminTransition Firebase callable
// Adjust imports if your project uses the older namespaced SDK.

import { getFunctions, httpsCallable } from 'firebase/functions';
import { firebaseApp } from '../firebaseInit'; // Adjust path if needed

const functions = getFunctions(firebaseApp);

/**
 * Calls the cloud function `adminTransition`.
 *
 * @param {string} orderId - Firestore order document ID.
 * @param {string} fsmEvent - FSM event name (e.g., "PAID", "CANCELLED").
 * @param {object} [payload={}] - Optional extra payload (e.g., { paymentStatus: "PAID" }).
 * @returns {Promise<any>} Callable response data.
 */
export async function adminTransition(orderId, fsmEvent, payload = {}) {
  const callable = httpsCallable(functions, 'adminTransition');
  const request = {
    orderId,
    eventName: fsmEvent,
    ...payload,
  };
  const result = await callable(request);
  return result.data;
}
