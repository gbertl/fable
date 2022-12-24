const express = require('express');

const {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} = require('../controllers/products');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', upload.single('imageFile'), createProduct);
router.get('/', getProducts);
router.put('/:id', upload.single('imageFile'), updateProduct);
router.route('/:id').get(getProduct).delete(deleteProduct);

module.exports = router;
