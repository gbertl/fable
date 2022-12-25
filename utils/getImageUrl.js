const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = require('../config/s3');

const getImageUrl = async (objectKey) => {
  try {
    const params = {
      Bucket: process.env.APP_AWS_BUCKET_NAME,
      Key: objectKey,
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return Promise.resolve(url);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

module.exports = getImageUrl;
