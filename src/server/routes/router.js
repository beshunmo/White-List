import express from 'express';

const Product = require('../models/product');
const Shops = require('../models/shops');
const Carts = require('../models/cart');
const authenticationMiddlewareApi = require('../authentication/middleware');

const router = express.Router();


router.get('/user', (req, res) => {
  if (req.user) {
    res.status(200);
    res.send({ username: req.user.username });
  } else {
    res.status(401);
    res.send('401 UNAUTHORISED USER');
  }
});


router.get('/cart', async (req, res) => {
  try {
    if (req.user) {
      const carts = await Carts.find({ user_id: req.user._id });
      res.status(200);
      res.send(carts);
    } else {
      res.status(401);
      res.send('401 UNAUTHORISED USER');
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

router.post('/cart', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = new Carts({
        user_id: req.user._id,
        cart: req.body.cart
      });
      await cart.save();
      res.status(200);
      res.send('CART SAVED');
    } else {
      res.status(401);
      res.send('401 UNAUTHORISED USER');
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});


router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.status(200);
  res.send(products);
});

router.get('/products/shop', async (req, res) => {
  const shops = await Shops.find();
  res.status(200);
  res.send(shops);
});

router.get('/products/:id', async (req, res) => {
  const shops = await Shops.find({ product_id: req.params.id });
  res.status(200);
  res.send(shops);
});

router.get('/product/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  console.log(product);
  res.status(200);
  res.send(product);
});

router.get('/upload', async (req, res) => {
  res.render('upload');
});

router.post('/upload', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  console.log(product);
  res.status(200);
  res.send(product);
});

router.get('/domophone', async (req, res) => {
  res.render('domophone');
});

router.post('/domophone', (req, res) => {
  const product = req.body.data;
  console.log(product);
  res.status(200);
  res.send('fdgg');
});

router.get('/whitelist', async (req, res) => {
  res.render('main-page');
});

export default router;
