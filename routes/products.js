const express = require('express');

const {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
} = require('../controllers/products');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', upload.single('imageFile'), createProduct);
router.get('/', getProducts);
router.route('/:id').get(getProduct).delete(deleteProduct);

module.exports = router;
