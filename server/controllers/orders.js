const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  createOrder,
};
