const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    heroProduct: { type: mongoose.SchemaTypes.ObjectId, ref: 'HeroProduct' },
    image: { type: String, required: true },
    name: { type: String, required: true },
    collectionName: { type: String, required: true },
    category: {
      type: String,
      enum: ['jacket', 'shorts'],
      required: true,
    },
    size: {
      type: String,
      enum: ['xs', 's', 'm', 'l', 'xl'],
      required: true,
    },
    color: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', schema);
