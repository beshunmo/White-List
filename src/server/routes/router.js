import express from 'express';

const path = require('path');
const multer = require('multer');
const fs = require('fs');
// const multiparty = require('multiparty');
const Product = require('../models/product');
const Shops = require('../models/shops');
const Carts = require('../models/cart');
// const authenticationMiddlewareApi = require('../authentication/middleware');


const router = express.Router();


const storage = multer.diskStorage({
  destination(req, file, callback) {
    fs.mkdir('./uploads', (err) => {
      if (err) {
        console.log(err.stack);
        callback(null, './uploads');
      } else {
        callback(null, './uploads');
      }
    });
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

router.post('/file', (req, res) => {
  const upload = multer({
    storage,
    fileFilter(req, file, callback) {
      const ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'));
      }
      callback(null, true);
    }
  }).single('userFile');
  upload(req, res, (err) => {
    if (err) {
      return res.end('Error uploading file.');
    }
    res.end('File is uploaded');
  });
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


router.post('/upload', (req, res, next) => {
  console.log(req);
  const imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ file: `public/${req.body.filename}.jpg` });
  });
});

// router.post('/upload', (req, res, next) => {
//   console.log('started');
//   // create a form to begin parsing
//   const form = new multiparty.Form();
//   const uploadFile = { uploadPath: '', type: '', size: 0 };
//   const maxSize = 20 * 1024 * 1024; // 20MB
//   const supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
//   const errors = [];

//   form.on('error', (err) => {
//     if (fs.existsSync(uploadFile.path)) {
//       fs.unlinkSync(uploadFile.path);
//       console.log('error');
//     }
//   });

//   form.on('close', () => {
//     if (errors.length == 0) {
//       res.send({ status: 'ok', text: 'Success' });
//       console.log('ok');
//     } else {
//       if (fs.existsSync(uploadFile.path)) {
//         fs.unlinkSync(uploadFile.path);
//       }
//       res.send({ status: 'bad', errors });
//       console.log(errors);
//     }
//   });

//   // listen on part event for image file
//   form.on('part', (part) => {
//     uploadFile.size = part.byteCount;
//     uploadFile.type = part.headers['content-type'];
//     uploadFile.path = `./files/${part.filename}`;
//     console.log(uploadFile.path);

//     if (uploadFile.size > maxSize) {
//       errors.push(`File size is ${uploadFile.size / 1024 / 1024}. Limit is${maxSize / 1024 / 1024}MB.`);
//     }

//     if (supportMimeTypes.indexOf(uploadFile.type) == -1) {
//       errors.push(`Unsupported mimetype ${uploadFile.type}`);
//     }

//     if (errors.length == 0) {
//       const out = fs.createWriteStream(uploadFile.path);
//       part.pipe(out);
//     } else {
//       part.resume();
//     }
//   });

//   // parse the form
//   form.parse(req);
// });

// // router.post('/upload', async (req, res) => {
// //   const product = await Product.findOne({ _id: req.params.id });
// //   console.log(product);
// //   res.status(200);
// //   res.send(product);
// // });

router.get('/upload', async (req, res) => {
  res.render('upload');
});

router.get('/upload2', async (req, res) => {
  res.render('upload2');
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

export default router;
