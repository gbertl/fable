const express = require('express');

const {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} = require('../controllers/products');
const checkJwt = require('../middleware/checkJwt');
const checkClaims = require('../middleware/checkClaims');
const upload = require('../middleware/upload');

const router = express.Router();

router.post(
  '/',
  checkJwt,
  checkClaims('create:product'),
  upload.single('imageFile'),
  createProduct
);
router.get('/', getProducts);
router.put(
  '/:id',
  checkJwt,
  checkClaims('update:product'),
  upload.single('imageFile'),
  updateProduct
);
router.get('/:id', getProduct);
router.delete('/:id', checkJwt, checkClaims('delete:product'), deleteProduct);

module.exports = router;
