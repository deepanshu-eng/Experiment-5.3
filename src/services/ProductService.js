const productRepo = require('../repositories/ProductRepository');

class ProductService {
  async createProduct(data) {
    if (!data.name || !data.category || data.variants.length === 0) {
      throw new Error('Name, category, and at least one variant required');
    }
    // Validate variants
    data.variants.forEach(v => {
      if (!v.size || !v.color || v.price < 0 || v.stock < 0) {
        throw new Error('Invalid variant data');
      }
    });
    return await productRepo.create(data);
  }

  async getAllProducts() {
    return await productRepo.findAll();
  }

  async getProductById(id) {
    const product = await productRepo.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async updateProduct(id, data) {
    const product = await this.getProductById(id);
    // Merge variants/reviews if provided
    if (data.variants) product.variants = data.variants;
    if (data.reviews) product.reviews = data.reviews;
    return await productRepo.update(id, data);
  }

  async deleteProduct(id) {
    await this.getProductById(id);
    return await productRepo.delete(id);
  }

  // Stock management: Update stock for a variant
  async updateStock(productId, variantIndex, quantity) {
    if (quantity < 0) throw new Error('Quantity must be positive');
    const product = await this.getProductById(productId);
    const variant = product.variants[variantIndex];
    if (!variant) throw new Error('Variant not found');
    if (variant.stock < quantity) throw new Error('Insufficient stock');
    variant.stock -= quantity;
    await product.save();
    return { remainingStock: variant.stock };
  }

  // Business logic: Aggregations
  async getAggregatedStats() {
    return await productRepo.aggregateByCategory();
  }

  async getLowStockProducts(threshold = 10) {
    return await productRepo.findLowStock(threshold);
  }
}

module.exports = new ProductService();