// backend/models/Menu.js
import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    category: { type: String, required: true },
    image: { type: String }, // Cloudinary URL or local path
    price: { type: Number, required: true },
    halalStatus: { type: Boolean, default: true },
    availability: { type: Boolean, default: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Menu', menuSchema);
