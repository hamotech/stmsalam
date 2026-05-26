import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true }, // e.g. 'hot-drinks', 'indian', 'burgers-kebabs'
  price: { type: Number, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  prepTime: { type: Number, default: 15 }, // in minutes
  active: { type: Boolean, default: true },
  badge: { type: String, default: null }, // e.g. 'bestseller', 'new'
  isNutContaining: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
