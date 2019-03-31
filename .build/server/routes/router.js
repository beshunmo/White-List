'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetch = require('node-fetch');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
// const multiparty = require('multiparty');
const base64Img = require('base64-img');
const Product = require('../models/product');
const Shops = require('../models/shops');
const Carts = require('../models/cart');
const Guests = require('../models/guests');
// const authenticationMiddlewareApi = require('../authentication/middleware');
const compareFoto = require('../face/verify');

const router = _express2.default.Router();

// http://localhost:3000/assets/public/uploads/userFile-1554024227144.jpg

let newFile = '';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    fs.mkdir('./.build/client/public/uploads', err => {
      if (err) {
        console.log(err.stack);
        callback(null, './.build/client/public/uploads');
      } else {
        callback(null, './.build/client/public/uploads');
      }
    });
  },
  filename(req, file, callback) {
    newFile = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    console.log(newFile);
    callback(null, newFile);
  }
});

router.post('/file', async (req, res) => {
  try {
    // if (req.user) {

    const upload = multer({
      storage,
      fileFilter(req, file, callback) {
        const ext = path.extname(file.originalname);
        newFile = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
          return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
      }
    }).single('userFile');
    upload(req, res, async err => {
      if (err) {
        return res.end('Error uploading file.');
      }
      const guest = new Guests({
        // user_id: req.user._id,
        title: req.body.title,
        img: newFile
      });
      console.log('TCL: newFile', newFile);
      await guest.save();
      console.log('guest SAVED');
      res.end('File is uploaded');
    });

    // res.status(200);
    // res.send('guest SAVED');
    // } else {
    //   res.status(401);
    //   res.send('401 UNAUTHORISED USER');
    // }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

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

router.get('/upload2', async (req, res) => {
  // const baseUrl = process.env.baseurl || 'https://iot-whitelist.herokuapp.com/assets/public/uploads/';
  const baseUrl = 'https://iot-whitelist.herokuapp.com/assets/public/uploads/';
  console.log('TCL: baseUrl', baseUrl);
  res.render('upload2');
});

router.get('/domophone', async (req, res) => {
  res.render('domophone');
});

router.post('/domophone', async (req, res) => {
  try {
    // if (req.user) {
    // const guests = await Guests.find({ user_id: req.user._id });
    const guests = await Guests.find();
    const product = req.body.data;
    const testFile = `test${Date.now()}`;
    base64Img.img(product, './.build/client/public/uploads', testFile, (err, filepath) => {});
    // res.status(200);
    // res.send('fdgg');
    // res.status(200);
    // res.send('false');
    let answer = false;
    const baseUrl = 'https://iot-whitelist.herokuapp.com/assets/public/uploads/';
    for (const guest of guests) {
      // eslint-disable-line
      const url1 = `${baseUrl}${testFile}.jpg`;
      const url2 = `${baseUrl}${guest.img}`;
      answer = await compareFoto(url1, url2); // eslint-disable-line
      console.log('TCL: answer', answer);
    }
    res.status(200);
    console.log('TCL: answer', answer);
    res.send(answer);
    // } else {
    //   res.status(401);
    //   res.send('401 UNAUTHORISED USER');
    // }
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/whitelist', async (req, res) => {
  res.render('main-page');
});

exports.default = router;