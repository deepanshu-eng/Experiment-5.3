const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Simplified; use ObjectId for User in prod
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true }
}, { timestamps: true });

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 }
});

// Indexes on variants for queries
variantSchema.index({ price: 1 });
variantSchema.index({ stock: 1 });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  variants: [variantSchema],
  reviews: [reviewSchema]
}, {
  timestamps: true
});

// Indexes for aggregation/optimization
productSchema.index({ category: 1 });
productSchema.index({ 'variants.price': 1 });
productSchema.index({ 'variants.stock': 1 });

module.exports = mongoose.model('Product', productSchema);