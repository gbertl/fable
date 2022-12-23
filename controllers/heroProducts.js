const HeroProduct = require('../models/HeroProduct');
const deleteToS3 = require('../utils/deleteToS3');
const getImageUrl = require('../utils/getImageUrl');
const uploadToS3 = require('../utils/uploadToS3');

const createHeroProduct = async (req, res) => {
  try {
    const body = req.body;

    body.image = await uploadToS3(req.file);

    const heroProduct = await HeroProduct.create(body);

    res.status(201).json(heroProduct);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getHeroProducts = async (req, res) => {
  try {
    const heroProducts = await HeroProduct.find().lean();

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
    const heroProduct = await HeroProduct.findById(req.params.id).lean();

    if (!heroProduct) res.sendStatus(404);

    heroProduct.imageUrl = await getImageUrl(heroProduct.image);

    res.json(heroProduct);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const deleteHeroProduct = async (req, res) => {
  try {
    const heroProduct = await HeroProduct.findById(req.params.id);

    if (!heroProduct) res.sendStatus(404);

    await deleteToS3(heroProduct.image);

    await heroProduct.remove();
    res.sendStatus(204);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  createHeroProduct,
  getHeroProducts,
  getHeroProduct,
  deleteHeroProduct,
};
