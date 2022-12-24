const { PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = require('../config/s3');
const randomImageName = require('./randomImageName');

const uploadToS3 = async (file, objectKey = '') => {
  try {
    if (!objectKey) {
      objectKey = randomImageName();
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: objectKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    return Promise.resolve(objectKey);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

module.exports = uploadToS3;
