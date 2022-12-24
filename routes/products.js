const express = require('express');

const {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} = require('../controllers/products');
const checkJwt = require('../middleware/checkJwt');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', checkJwt, upload.single('imageFile'), createProduct);
router.get('/', getProducts);
router.put('/:id', checkJwt, upload.single('imageFile'), updateProduct);
router.get('/:id', getProduct);
router.delete('/:id', checkJwt, deleteProduct);

module.exports = router;
