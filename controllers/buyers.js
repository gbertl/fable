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
      let options = { sort: { createdAt: -1 } };

      if (req.query.limit) {
        // [{ orders: 5}]
        req.query.limit.forEach((l) => {
          for (const [key, value] of Object.entries(l)) {
            if (key === 'orders')
              options = { ...options, limit: parseInt(value) };
          }
        });
      }

      query = query.populate({
        path: 'orders',
        options,
      });
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
