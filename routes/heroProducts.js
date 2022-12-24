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
const checkClaims = require('../middleware/checkClaims');

const router = express.Router();

router.post(
  '/',
  checkJwt,
  checkClaims('create:heroProduct'),
  upload.single('imageFile'),
  createHeroProduct
);
router.get('/', getHeroProducts);
router.put(
  '/:id',
  checkJwt,
  checkClaims('update:heroProduct'),
  upload.single('imageFile'),
  updateHeroProduct
);
router.get('/:id', getHeroProduct);
router.delete(
  '/:id',
  checkJwt,
  checkClaims('delete:heroProduct'),
  deleteHeroProduct
);

module.exports = router;
