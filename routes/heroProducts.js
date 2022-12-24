const express = require('express');

const upload = require('../middleware/upload');
const {
  createHeroProduct,
  getHeroProducts,
  getHeroProduct,
  deleteHeroProduct,
  updateHeroProduct,
} = require('../controllers/heroProducts');
const checkJwt = require('../middleware/checkJwt');

const router = express.Router();

router.post('/', checkJwt, upload.single('imageFile'), createHeroProduct);
router.get('/', getHeroProducts);
router.put('/:id', checkJwt, upload.single('imageFile'), updateHeroProduct);
router.get('/:id', getHeroProduct);
router.delete('/:id', checkJwt, deleteHeroProduct);

module.exports = router;
