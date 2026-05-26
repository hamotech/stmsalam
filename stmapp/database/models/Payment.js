import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['cash', 'paynow', 'stripe', 'paypal'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  transactionId: { type: String, default: '' },
  payload: { type: mongoose.Schema.Types.Mixed }, // Complete raw response from Stripe/PayPal
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
