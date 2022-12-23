const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = require('../config/s3');
const Product = require('../models/Product');
const randomImageName = require('../utils/randomImageName');

const bucketName = process.env.AWS_BUCKET_NAME;

const createProduct = async (req, res) => {
  try {
    const body = req.body;

    if (req.file) {
      const imageName = randomImageName();

      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);
      body.image = imageName;
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
      const params = {
        Bucket: bucketName,
        Key: product.image,
      };

      const command = new GetObjectCommand(params);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      product.imageUrl = url;
    }

    res.json(products);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
};
