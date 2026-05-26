import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, default: 1 }
});

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // STM-xxxxxx format
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, required: true, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  mode: { type: String, enum: ['delivery', 'pickup'], default: 'delivery' },
  payment: {
    method: { type: String, enum: ['cash', 'paynow', 'stripe', 'paypal'], default: 'paynow' },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    transactionId: { type: String, default: '' }
  },
  notes: { type: String, default: '' },
  status: {
    type: String,
    enum: ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'placed'
  },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
  otp: { type: String, required: true }, // 4 digit Delivery OTP
  driverLocation: {
    lat: { type: Number },
    lng: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
