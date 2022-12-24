const express = require('express');
const { createCategory, getCategories } = require('../controllers/categories');
const checkJwt = require('../middleware/checkJwt');
const checkClaims = require('../middleware/checkClaims');

const router = express.Router();

router.post('/', checkJwt, checkClaims('create:category'), createCategory);
router.get('/', getCategories);

module.exports = router;
