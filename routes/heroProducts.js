const express = require('express');

const upload = require('../middleware/upload');
const {
  createHeroProduct,
  getHeroProducts,
  getHeroProduct,
  deleteHeroProduct,
  updateHeroProduct,
} = require('../controllers/heroProducts');

const router = express.Router();

router.post('/', upload.single('imageFile'), createHeroProduct);
router.get('/', getHeroProducts);
router.put('/:id', upload.single('imageFile'), updateHeroProduct);
router.route('/:id').get(getHeroProduct).delete(deleteHeroProduct);

module.exports = router;
