const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
  getAggregatedStats,
  getLowStockProducts
} = require('../controllers/ProductController');

const router = express.Router();

router.route('/')
  .get(getAllProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.post('/:id/update-stock', updateStock);
router.get('/stats', getAggregatedStats);
router.get('/low-stock', getLowStockProducts);

module.exports = router;