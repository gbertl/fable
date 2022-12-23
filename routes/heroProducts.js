const express = require('express');

const upload = require('../middleware/upload');
const {
  createHeroProduct,
  getHeroProducts,
  getHeroProduct,
  deleteHeroProduct,
} = require('../controllers/heroProducts');

const router = express.Router();

router.post('/', upload.single('imageFile'), createHeroProduct);
router.get('/', getHeroProducts);
router.route('/:id').get(getHeroProduct).delete(deleteHeroProduct);

module.exports = router;
