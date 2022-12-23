const Product = require('../models/Product');
const deleteToS3 = require('../utils/deleteToS3');
const getImageUrl = require('../utils/getImageUrl');
const uploadToS3 = require('../utils/uploadToS3');

const createProduct = async (req, res) => {
  try {
    const body = req.body;

    body.image = await uploadToS3(req.files['imageFile'][0]);

    if (req.files['heroImageFile']) {
      body.heroImage = await uploadToS3(req.files['heroImageFile'][0]);
    }

    const product = await Product.create(body);

    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();

    for (const product of products) {
      product.imageUrl = await getImageUrl(product.image);

      if (product.heroImage) {
        product.heroImageUrl = await getImageUrl(product.heroImage);
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

    if (product.heroImage) {
      product.heroImageUrl = await getImageUrl(product.heroImage);
    }

    res.json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) res.sendStatus(404);

    await deleteToS3(product.image);

    if (product.heroImage) {
      await deleteToS3(product.heroImage);
    }

    await product.remove();
    res.sendStatus(204);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
};
