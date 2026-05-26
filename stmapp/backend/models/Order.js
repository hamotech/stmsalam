// backend/models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }, // price at order time
});

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending','Confirmed','Preparing','Picked Up','On The Way','Delivered','Cancelled'],
      default: 'Pending',
    },
    deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
