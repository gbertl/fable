const express = require('express');

const { createProduct, getProducts } = require('../controllers/products');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', upload.single('imageFile'), createProduct);
router.get('/', getProducts);

module.exports = router;
