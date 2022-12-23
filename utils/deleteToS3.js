const { DeleteObjectCommand } = require('@aws-sdk/client-s3');

const s3 = require('../config/s3');

const deleteToS3 = async (objectKey) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: objectKey,
    };

    const command = new DeleteObjectCommand(params);

    await s3.send(command);

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e.message);
  }
};

module.exports = deleteToS3;
