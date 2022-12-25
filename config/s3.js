const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.APP_AWS_BUCKET_REGION,
});

module.exports = s3;
