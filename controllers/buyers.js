const Buyer = require('../models/Buyer');

const createBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.create(req.body);
    res.json(buyer);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getBuyer = async (req, res) => {
  try {
    let query = Buyer.findById(req.params.id);

    if (req.query.populate?.includes('orders')) {
      query = query.populate('orders');
    }

    const buyer = await query;

    res.json(buyer);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const updateBuyer = async (req, res) => {
  try {
    const { orders, ...body } = req.body;

    const buyer = await Buyer.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });

    if (orders) {
      for (const order of orders) {
        buyer.orders.push(order);
      }
    }

    const updatedBuyer = await buyer.save();

    res.json(updatedBuyer);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  createBuyer,
  getBuyer,
  updateBuyer,
};
