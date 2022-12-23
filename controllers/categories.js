const Category = require('../models/Category');

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
};
