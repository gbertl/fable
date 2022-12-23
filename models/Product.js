const mongoose = require('mongoose');

const schema = mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  collectionName: { type: String, required: true },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category',
    required: true,
  },
  size: {
    type: String,
    enum: ['xs', 's', 'm', 'l', 'xl'],
    required: true,
  },
  color: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Project', schema);
