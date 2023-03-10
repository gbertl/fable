require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const connectDB = require('./config/db');

const productsRouter = require('./routes/products');
const heroProductsRouter = require('./routes/heroProducts');
const buyersRouter = require('./routes/buyers');
const ordersRouter = require('./routes/orders');

const Product = require('./models/Product');
const Buyer = require('./models/Buyer');
const Order = require('./models/Order');

const app = express();

app.use(cors());

const endpointSecret = process.env.STRIPE_WH_SECRET;

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    const data = event.data.object;

    if (event.type === 'checkout.session.completed') {
      const customer = await stripe.customers.retrieve(data.customer);

      let { buyerId, deliveryMethod, paymentMethod, cartItems } =
        customer.metadata;

      cartItems = JSON.parse(cartItems);

      const buyer = await Buyer.findById(buyerId);

      for (const item of cartItems) {
        const order = await Order.create({
          product: item.product,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          buyer: buyerId,
          deliveryMethod,
          paymentMethod,
          status: 'paid',
        });

        buyer.orders.push(order._id);
        await buyer.save();
      }

      res.send();
    }

    res.send();
  }
);

app.use(express.json());

app.post('/checkout', async (req, res) => {
  try {
    const { buyerId, deliveryMethod, paymentMethod, cartItems } = req.body;

    const customer = await stripe.customers.create({
      metadata: {
        buyerId,
        deliveryMethod,
        paymentMethod,
        cartItems: JSON.stringify(cartItems),
      },
    });

    let line_items = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.product);

      const line_item = {
        price_data: {
          currency: 'php',
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      };

      line_items.push(line_item);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer: customer.id,
      line_items,
      success_url: `${process.env.CLIENT_URL}/profile?success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

app.use('/products', productsRouter);
app.use('/hero-products', heroProductsRouter);
app.use('/buyers', buyersRouter);
app.use('/orders', ordersRouter);

(async () => {
  try {
    await connectDB();

    const port = process.env.PORT;

    app.listen(port, () => console.log(`Server running at ${port}`));
  } catch (e) {
    console.log(e);
  }
})();
