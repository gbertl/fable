require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const { products, heroProducts } = require('./data');

app.get('/heroProducts', (req, res) => {
  res.json(heroProducts);
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  res.json(product);
});

app.post('/checkout', async (req, res) => {
  try {
    const line_items = req.body.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      return {
        price_data: {
          currency: 'php',
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      };
    });

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

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running at ${port}`));
