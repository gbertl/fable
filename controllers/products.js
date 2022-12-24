const HeroProduct = require('../models/HeroProduct');
const Product = require('../models/Product');
const deleteToS3 = require('../utils/deleteToS3');
const getImageUrl = require('../utils/getImageUrl');
const uploadToS3 = require('../utils/uploadToS3');

const createProduct = async (req, res) => {
  const body = req.body;

  try {
    body.image = await uploadToS3(req.file);

    if (body.heroProduct) {
      const heroProduct = await HeroProduct.findById(body.heroProduct);

      const product = await Product.create(body);

      heroProduct.product = product._id;
      await heroProduct.save();

      res.status(201).json(product);
    } else {
      const product = await Product.create(body);
      res.status(201).json(product);
    }
  } catch (e) {
    if (body.image) {
      await deleteToS3(body.image);
    }

    res.status(400).json({ message: e.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();

    for (const product of products) {
      product.imageUrl = await getImageUrl(product.image);

      if (req.query.fields?.includes('heroImageUrl') && product.heroProduct) {
        const heroProduct = await HeroProduct.findById(product.heroProduct);
        product.heroImageUrl = await getImageUrl(heroProduct.image);
      }
    }

    res.json(products);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();

    if (!product) res.sendStatus(404);

    product.imageUrl = await getImageUrl(product.image);

    if (req.query.fields?.includes('heroImageUrl') && product.heroProduct) {
      const heroProduct = await HeroProduct.findById(product.heroProduct);
      product.heroImageUrl = await getImageUrl(heroProduct.image);
    }

    res.json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const body = req.body;

    if (req.file) {
      await uploadToS3(req.file, body.image);
    }

    // handles updating heroProduct
    const product = await Product.findById(req.params.id);

    if (body.heroProduct !== product.heroProduct) {
      const heroProduct = await HeroProduct.findById(body.heroProduct);

      heroProduct.product = product._id;
      await heroProduct.save();
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    await deleteToS3(product.image);
    await HeroProduct.findByIdAndDelete(product.heroProduct);

    res.sendStatus(204);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
