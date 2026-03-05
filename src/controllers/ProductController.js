const productService = require('../services/ProductService');

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateStock = async (req, res) => {
  try {
    const { variantIndex, quantity } = req.body;
    const result = await productService.updateStock(req.params.id, variantIndex, quantity);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAggregatedStats = async (req, res) => {
  try {
    const stats = await productService.getAggregatedStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const { threshold } = req.query;
    const products = await productService.getLowStockProducts(parseInt(threshold) || 10);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
  getAggregatedStats,
  getLowStockProducts
};