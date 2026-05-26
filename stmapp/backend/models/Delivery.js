import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  currentLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
  },
  status: { type: String, enum: ['assigned','accepted','in_transit','delivered','cancelled'], default: 'assigned' },
}, { timestamps: true });

deliverySchema.index({ currentLocation: '2dsphere' });

export default mongoose.model('Delivery', deliverySchema);
