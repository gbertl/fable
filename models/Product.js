const mongoose = require('mongoose');

const schema = mongoose.Schema({
  heroImage: String,
  image: String,
  collection: String,
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category',
  },
  size: {
    type: String,
    enum: ['xs', 's', 'm', 'l', 'xl'],
  },
  color: String,
  price: Number,
});

module.exports = mongoose.model('Project', schema);
