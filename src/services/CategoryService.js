const categoryRepo = require('../repositories/CategoryRepository');

class CategoryService {
  async createCategory(data) {
    if (!data.name) throw new Error('Name is required');
    return await categoryRepo.create(data);
  }

  async getAllCategories() {
    return await categoryRepo.findAll();
  }

  async getCategoryById(id) {
    const category = await categoryRepo.findById(id);
    if (!category) throw new Error('Category not found');
    return category;
  }

  async updateCategory(id, data) {
    const category = await this.getCategoryById(id);
    return await categoryRepo.update(id, data);
  }

  async deleteCategory(id) {
    await this.getCategoryById(id);
    return await categoryRepo.delete(id);
  }

  // Business logic: Get categories with product counts
  async getCategoriesWithCounts() {
    return await categoryRepo.aggregateProductCount();
  }
}

module.exports = new CategoryService();