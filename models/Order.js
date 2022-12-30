const mongoose = require('mongoose');

const { Sizes, DeliveryMethods, PaymentMethods } = require('../constants');

const schema = mongoose.Schema(
  {
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true,
    },
    color: { type: String, required: true },
    size: { type: String, enum: Sizes, required: true },
    quantity: { type: Number, required: true },
    buyer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Buyer',
      required: true,
    },
    deliveryMethod: {
      type: String,
      enum: DeliveryMethods,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: PaymentMethods,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', schema);
