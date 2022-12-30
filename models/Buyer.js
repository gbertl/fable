const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  orders: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Order',
    },
  ],
});

module.exports = mongoose.model('Buyer', schema);
