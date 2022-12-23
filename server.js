require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const connectDB = require('./config/db');
const { products, heroProducts } = require('./data');

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const heroProductsRouter = require('./routes/heroProducts');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/hero-products', heroProductsRouter);

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
