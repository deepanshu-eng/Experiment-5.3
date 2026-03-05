const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' }
}, {
  timestamps: true
});

// Indexes for optimization
categorySchema.index({ name: 1 });

module.exports = mongoose.model('Category', categorySchema);