const Category = require('../models/Category');

class CategoryRepository {
  async create(data) {
    return await Category.create(data);
  }

  async findById(id) {
    return await Category.findById(id);
  }

  async findAll() {
    return await Category.find({});
  }

  async update(id, data) {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Category.findByIdAndDelete(id);
  }

  // Aggregation: Count products per category (requires populate in service)
  async aggregateProductCount() {
    return await Category.aggregate([
      { $lookup: { from: 'products', localField: '_id', foreignField: 'category', as: 'products' } },
      { $addFields: { productCount: { $size: '$products' } } },
      { $project: { products: 0, __v: 0 } }
    ]);
  }
}

module.exports = new CategoryRepository();