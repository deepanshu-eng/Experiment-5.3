const Product = require('../models/Product');

class ProductRepository {
  async create(data) {
    return await Product.create(data);
  }

  async findById(id) {
    return await Product.findById(id).populate('category', 'name');
  }

  async findAll() {
    return await Product.find({}).populate('category', 'name');
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  // Aggregation: Average rating and low-stock products by category
  async aggregateByCategory() {
    return await Product.aggregate([
      { $group: {
          _id: '$category',
          avgRating: { $avg: { $avg: '$reviews.rating' } },
          lowStockVariants: { $sum: { $cond: [{ $lt: ['$variants.stock', 10] }, 1, 0] } }
        }
      },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $project: { category: '$category.name', avgRating: 1, lowStockVariants: 1 } }
    ]);
  }

  // Find low-stock products
  async findLowStock(threshold = 10) {
    return await Product.find({
      'variants.stock': { $lt: threshold }
    }).populate('category', 'name');
  }
}

module.exports = new ProductRepository();