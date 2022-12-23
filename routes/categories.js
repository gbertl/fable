const express = require('express');
const { createCategory, getCategories } = require('../controllers/categories');

const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);

module.exports = router;
