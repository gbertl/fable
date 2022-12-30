const express = require('express');
const { createBuyer, getBuyer, updateBuyer } = require('../controllers/buyers');

const router = express.Router();

router.post('/', createBuyer);
router.get('/:id', getBuyer);
router.put('/:id', updateBuyer);

module.exports = router;
