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

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/products', productsRouter);
app.use('/hero-products', heroProductsRouter);
app.use('/buyers', buyersRouter);
app.use('/orders', ordersRouter);

app.post('/checkout', async (req, res) => {
  try {
    const cartItems = req.body;

    let line_items = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);

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
      line_items,
      success_url: `${process.env.CLIENT_URL}/#fable-of-klassik-section`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

connectDB().then(() => {
  const port = process.env.PORT;

  app.listen(port, () => console.log(`Server running at ${port}`));
});
