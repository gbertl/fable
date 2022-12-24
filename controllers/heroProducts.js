const HeroProduct = require('../models/HeroProduct');
const Product = require('../models/Product');
const deleteToS3 = require('../utils/deleteToS3');
const getImageUrl = require('../utils/getImageUrl');
const uploadToS3 = require('../utils/uploadToS3');

const createHeroProduct = async (req, res) => {
  try {
    const body = req.body;

    body.image = await uploadToS3(req.file);

    if (body.product) {
      const product = await Product.findById(body.product);

      const heroProduct = await HeroProduct.create(body);

      product.heroProduct = heroProduct._id;

      await product.save();
      res.status(201).json(heroProduct);
    } else {
      const heroProduct = await HeroProduct.create(body);
      res.status(201).json(heroProduct);
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getHeroProducts = async (req, res) => {
  try {
    let query = HeroProduct.find();

    if (req.query.populate?.includes('product')) {
      query = query.populate('product');
    }

    const heroProducts = await query.lean();

    for (const heroProduct of heroProducts) {
      heroProduct.imageUrl = await getImageUrl(heroProduct.image);
    }

    res.json(heroProducts);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getHeroProduct = async (req, res) => {
  try {
    let query = HeroProduct.findById(req.params.id);

    if (req.query.populate?.includes('product')) {
      query = query.populate('product');
    }

    const heroProduct = await query.lean();

    heroProduct.imageUrl = await getImageUrl(heroProduct.image);

    res.json(heroProduct);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const updateHeroProduct = async (req, res) => {
  const body = req.body;

  try {
    if (req.file) {
      await uploadToS3(req.file, body.image);
    }

    const heroProduct = await HeroProduct.findById(req.params.id);

    // handles updating product
    if (body.product !== heroProduct.product) {
      const product = await Product.findById(body.product);
      product.heroProduct = heroProduct._id;
      await product.save();
    }

    const updatedHeroProduct = await HeroProduct.findByIdAndUpdate(
      req.params.id,
      body,
      {
        new: true,
      }
    );

    res.json(updatedHeroProduct);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const deleteHeroProduct = async (req, res) => {
  try {
    const heroProduct = await HeroProduct.findByIdAndDelete(req.params.id);
    await deleteToS3(heroProduct.image);

    // handles updating product
    const product = await Product.findById(heroProduct.product);
    product.heroProduct = undefined;
    await product.save();

    res.sendStatus(204);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  createHeroProduct,
  getHeroProducts,
  getHeroProduct,
  updateHeroProduct,
  deleteHeroProduct,
};
