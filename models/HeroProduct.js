const mongoose = require('mongoose');

const schema = mongoose.Schema({
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
  },
  image: { type: String, required: true },
});

module.exports = mongoose.model('HeroProduct', schema);
