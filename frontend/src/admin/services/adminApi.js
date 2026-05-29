// Admin API wrapper for Firebase callable adminTransition
// Provides a simple function for the admin dashboard to request state transitions.
// This file lives under frontend/src/admin/services/adminApi.js

import { functions } from '../../lib/firebase';
import { httpsCallable } from 'firebase/functions';

// Create a callable reference once – it will be reused across calls.
const adminTransitionCallable = httpsCallable(functions, 'adminTransition');

/**
 * Invoke the backend adminTransition callable.
 *
 * @param {string} orderId   Firestore order document ID.
 * @param {string} eventName FSM event name (e.g., 'paid', 'accept').
 * @param {object} payload   Additional fields required by the transition.
 * @returns {Promise<any>}    Result payload from the cloud function.
 */
export async function adminTransition(orderId, eventName, payload = {}) {
  const data = { orderId, eventName, ...payload };
  const result = await adminTransitionCallable(data);
  return result.data;
}
