import express from 'express';
import Product from '../database/models/Product.js';
import { verifyToken } from './auth.js';

const router = express.Router();

// Static Categories representation matching premium customer requirements
const CATEGORIES = [
  { id: 'all',          name: 'Full Menu',           emoji: '🍽️' },
  { id: 'hot-drinks',   name: 'Hot Drinks',          emoji: '☕' },
  { id: 'cold-drinks',  name: 'Cold Drinks',         emoji: '🧊' },
  { id: 'can-drinks',   name: 'Can Drinks',          emoji: '🥫' },
  { id: 'sugarcane',    name: 'Sugarcane',           emoji: '🎋' },
  { id: 'dinosaur',     name: 'Dinosaur',            emoji: '🦕' },
  { id: 'burgers-kebabs', name: 'Burgers & Kebabs',  emoji: '🍔' },
  { id: 'snacks',       name: 'Snacks',              emoji: '🥟' },
  { id: 'sides',        name: 'Sides',               emoji: '🍟' },
  { id: 'desserts',     name: 'Desserts',            emoji: '🍰' },
  { id: 'indian',       name: 'Indian Food',         emoji: '🍛' },
];

// Seed initial products if DB is empty
const seedInitialMenu = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    console.log('🌱 Seeding initial STM Salam products catalog to MongoDB...');
    const INITIAL_PRODUCTS = [
      { name: 'Ginger Tea', category: 'hot-drinks', price: 2.00, description: 'Traditional warming ginger tea brewed fresh.', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
      { name: 'Horlicks Hot', category: 'hot-drinks', price: 2.50, description: 'Classic hot Horlicks – the comfort drink.', image: 'https://images.unsplash.com/photo-1553906982-d46921b021d7?auto=format&fit=crop&q=80&w=400' },
      { name: 'Teh O', category: 'hot-drinks', price: 1.80, description: 'Black tea with sugar, no milk.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400' },
      { name: 'Teh Tarik', category: 'hot-drinks', price: 2.00, description: "Singapore's iconic pulled milk tea, frothy & sweet.", image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
      { name: 'Kopi', category: 'hot-drinks', price: 1.80, description: 'Traditional Singapore coffee, rich and bold.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400' },
      { name: 'Kopi C Kosong Ice', category: 'cold-drinks', price: 2.50, description: 'Iced coffee with evaporated milk, no sugar.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
      { name: 'Honey Lemon Ice', category: 'cold-drinks', price: 3.00, description: 'Honey and fresh lemon over ice.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400' },
      { name: 'Teh Ginger Ice', category: 'cold-drinks', price: 2.80, description: 'Iced ginger tea – refreshing and spicy.', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=400' },
      { name: 'Fresh Lemon Juice Ice', category: 'cold-drinks', price: 3.00, description: 'Pure freshly squeezed lemon juice served over ice. Refreshing and zesty.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
      { name: 'Dasani Water', category: 'can-drinks', price: 1.50, description: 'Pure drinking water.', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400' },
      { name: 'KICKAPOO', category: 'can-drinks', price: 2.00, description: 'Classic citrus carbonated drink.', image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=400' },
      { name: 'Chrysanthemum Tea', category: 'can-drinks', price: 2.00, description: 'Sweet chrysanthemum flower tea.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400' },
      { name: 'Fresh Sugarcane, Lemon No Ice', category: 'sugarcane', price: 3.50, description: 'Freshly pressed sugarcane with a squeeze of lemon.', image: 'https://images.unsplash.com/photo-1596461404969-9ae70fc2975c?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
      { name: 'Fresh Sugarcane Less Ice with Lemon', category: 'sugarcane', price: 3.50, description: 'Less ice, more sugarcane goodness with lemon.', image: 'https://images.unsplash.com/photo-1596461404969-9ae70fc2975c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Fresh Sugarcane Asam Ice', category: 'sugarcane', price: 3.80, description: 'Sugarcane with asam (tamarind) – tangy & sweet.', image: 'https://images.unsplash.com/photo-1596461404969-9ae70fc2975c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Milo Dino ICE', category: 'dinosaur', price: 3.50, description: 'Iced Milo topped with Milo powder — the legendary dino.', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
      { name: 'Bandung Dinosaur', category: 'dinosaur', price: 3.80, description: 'Rose syrup milk topped with extra powder.', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=400' },
      { name: 'Horlicks Dinosaur Ice', category: 'dinosaur', price: 3.80, description: 'Iced Horlicks with extra Horlicks powder on top.', image: 'https://images.unsplash.com/photo-1553906982-d46921b021d7?auto=format&fit=crop&q=80&w=400' },
      { name: 'LAMB BURGER CLASSIC', category: 'burgers-kebabs', price: 10.00, description: 'Juicy lamb patty with fresh veggies in a brioche bun.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
      { name: 'Hummus Falafel Tortilla', category: 'burgers-kebabs', price: 8.50, description: 'Crispy falafel with creamy hummus in a tortilla wrap.', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=400' },
      { name: 'Chicken Burger Classic', category: 'burgers-kebabs', price: 8.00, description: 'Grilled chicken breast on a toasted brioche bun.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400' },
      { name: 'Roti Curry 1 Piece', category: 'snacks', price: 2.00, description: 'Flaky roti with savory curry dip.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400' },
      { name: '7 DAYS 1 Piece', category: 'snacks', price: 1.50, description: 'Classic 7 Days croissant snack.', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?auto=format&fit=crop&q=80&w=400' },
      { name: 'Bhai Suji', category: 'snacks', price: 3.00, description: 'Traditional Indian semolina snack.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
      { name: 'ONION RINGS', category: 'sides', price: 5.00, description: 'Golden crispy onion rings.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400' },
      { name: 'French Fries', category: 'sides', price: 4.00, description: 'Classic golden french fries.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
      { name: 'Cheese Fries', category: 'sides', price: 5.50, description: 'Fries topped with melted cheese sauce.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400' },
      { name: 'KUNAFA ORIGINAL', category: 'desserts', price: 6.00, description: 'Crunchy kunafa with cream cheese filling.', image: 'https://images.unsplash.com/photo-1518176258439-d3dd5480ba01?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
      { name: 'KUNAFA NUTELLA', category: 'desserts', price: 7.00, description: 'Kunafa drizzled with rich Nutella.', image: 'https://images.unsplash.com/photo-1518176258439-d3dd5480ba01?auto=format&fit=crop&w=400', badge: 'new' },
      { name: 'Mutton Biryani', category: 'indian', price: 9.00, description: 'Fragrant basmati rice with tender mutton.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
      { name: 'PRATA TELUR', category: 'indian', price: 2.50, description: 'Crispy prata with egg – a local classic.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400' },
      { name: 'MURTABAK MUTTON', category: 'indian', price: 7.00, description: 'Stuffed pancake with spiced mutton.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' }
    ];
    await Product.insertMany(INITIAL_PRODUCTS);
    console.log('✅ Menu seeding complete.');
  }
};
seedInitialMenu();

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ active: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET category list
router.get('/categories', (req, res) => {
  res.json(CATEGORIES);
});

// CREATE a product (Admin only)
router.post('/products', verifyToken(['admin']), async (req, res) => {
  const { name, category, price, description, image, prepTime, badge, isNutContaining } = req.body;
  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Missing product details' });
  }

  try {
    const newProduct = new Product({
      name,
      category,
      price: parseFloat(price),
      description,
      image,
      prepTime: prepTime ? parseInt(prepTime) : 15,
      badge,
      isNutContaining: !!isNutContaining
    });
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a product (Admin only)
router.patch('/products/:id', verifyToken(['admin']), async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a product (Admin only)
router.delete('/products/:id', verifyToken(['admin']), async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
