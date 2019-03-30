'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fetch = require('node-fetch');
// const mongoose = require('mongoose');
const Product = require('./models/product');
const Shops = require('./models/shops');

// const db = mongoose.connect( // eslint-disable-line
//   process.env.database,
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   }
// );

const seed = exports.seed = async () => {
  console.log('started');
  let i = 0;
  const images = ['https://www.perekrestok.ru/src/product.file/list/image/33/48/94833.jpeg', 'https://www.perekrestok.ru/src/product.file/list/image/87/58/75887.jpeg', 'https://www.perekrestok.ru/src/product.file/list/image/61/45/54561.jpeg', 'https://www.perekrestok.ru/src/product.file/list/image/46/80/18046.jpeg', 'https://www.perekrestok.ru/src/product.file/list/image/09/57/75709.jpeg', 'https://www.perekrestok.ru/src/product.file/list/image/33/62/96233.jpeg', 'https://www.perekrestok.ru/src/product.file/list/image/86/77/17786.jpeg', 'https://www.perekrestok.ru/src/product.file/list/image/71/21/12171.jpeg', 'https://www.perekrestok.ru/src/product.file/list/image/47/96/89647.jpeg', 'https://www.perekrestok.ru/src/product.file/list/image/77/37/83777.jpeg'];

  const getFromParser = async () => {
    try {
      const products = await fetch('https://api.priceva.com/api/v1/product/list', {
        method: 'POST',
        headers: { Apikey: 'lK8nk2JQdQOK4bkv4ImomBhxMWKSG2X6' },
        body: JSON.stringify({
          params: {
            filters: {
              page: 1,
              limit: 100
            },
            sources: {
              add: true,
              add_term: true
            }
          }
        })
      });
      const productsObj = await products.json();
      // console.log(productsObj);
      for (const item of productsObj.result.objects) {
        // eslint-disable-line
        const test = await Product.findOne({ name: item.name }); // eslint-disable-line
        if (test === null) {
          const product = new Product({
            name: item.name,
            rating: 5,
            lastSync: Date.now(),
            img: images[i]
          });
          i += 1;
          await product.save(); // eslint-disable-line
        }
        const savedProduct = await Product.findOne({ name: item.name }); // eslint-disable-line
        console.log(`savedProduct${savedProduct}`);
        console.log(savedProduct);
        for (const shopItem of item.sources) {
          // eslint-disable-line
          // console.log(shopItem);
          const testShop = await Shops.findOne({ // eslint-disable-line
            name: shopItem.company_name,
            product_id: savedProduct._id // eslint-disable-line
          });
          if (testShop === null) {
            const shop = new Shops({
              name: shopItem.company_name,
              price: shopItem.price,
              presence: shopItem.in_stock,
              lastUpdate: shopItem.date * 1000,
              product_id: savedProduct._id, // eslint-disable-line
              link: shopItem.url
            });
            // console.log(shop);
            shop.save();
          } else if (testShop.price !== shopItem.price || testShop.presence !== shopItem.in_stock) {
            await Product.findOneAndUpdate({ _id: testShop._id }, { price: shopItem.price, presence: shopItem.in_stock }); // eslint-disable-line
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setLowerPrice = async () => {
    const products = await Product.find();
    // console.log(products);
    for (const item of products) {
      // eslint-disable-line
      const shops = await Shops.find({ product_id: item._id }); // eslint-disable-line
      let lowPrice = 0;
      for (const shopItem of shops) {
        // eslint-disable-line
        if (shopItem.price > lowPrice) {
          lowPrice = shopItem.price;
        }
      }
      // console.log(lowPrice);
      await Product.findOneAndUpdate({ _id: item._id }, { lowPrice }); // eslint-disable-line
    }
  };

  try {
    await getFromParser();
    setLowerPrice();
    console.log('finished');
  } catch (e) {
    console.error(e);
  }
};

// seed();