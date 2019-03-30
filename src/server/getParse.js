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

export const seed = async () => {
  console.log('started');
  let i = 0;
  const images = [
    'https://www.perekrestok.ru/src/product.file/list/image/33/48/94833.jpeg',
    'https://www.perekrestok.ru/src/product.file/list/image/87/58/75887.jpeg',
    'https://www.perekrestok.ru/src/product.file/list/image/61/45/54561.jpeg',
    'https://www.perekrestok.ru/src/product.file/list/image/46/80/18046.jpeg',
    'https://www.perekrestok.ru/src/product.file/list/image/09/57/75709.jpeg',
    'https://www.perekrestok.ru/src/product.file/list/image/33/62/96233.jpeg',
    'https://www.perekrestok.ru/src/product.file/list/image/86/77/17786.jpeg',
    'https://www.perekrestok.ru/src/product.file/list/image/71/21/12171.jpeg',
    'https://www.perekrestok.ru/src/product.file/list/image/47/96/89647.jpeg',
    'https://www.perekrestok.ru/src/product.file/list/image/77/37/83777.jpeg'
  ];


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
    for (const item of productsObj.result.objects) { // eslint-disable-line
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
        // console.log(`savedProduct${savedProduct}`);
        // console.log(savedProduct);
      for (const shopItem of item.sources) { // eslint-disable-line
        // console.log(shopItem);
        const testShop = await Shops.findOne({ // eslint-disable-line
            name: shopItem.company_name,
          product_id: savedProduct._id // eslint-disable-line
          });
          // console.log(testShop);
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
          } else if ((testShop.presence !== shopItem.in_stock) || (testShop.price !== shopItem.price)) {
            console.log('TCL: getFromParser -> shopItem', shopItem);
            // console.log('TCL: getFromParser -> shopItem', shopItem.name);
            console.log('TCL: getFromParser -> testShop', testShop);
            await Shops.findOneAndUpdate({ _id: testShop._id }, { presence: shopItem.in_stock, price: shopItem.price })  // eslint-disable-line
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
  for (const item of products) { // eslint-disable-line
    const shops = await Shops.find({ product_id: item._id }); // eslint-disable-line
      // console.log(shops);
      let lowPrice = shops[0].price || 0;
    for (let i=0; i<shops.length; i+=1) { // eslint-disable-line
        if ((shops[i].price < lowPrice) && (shops[i].presence !== 0)) {
          lowPrice = shops[i].price;
        }
      }
      // console.log(`${item.name}: ${lowPrice}`);
    await Product.findOneAndUpdate({ _id: item._id }, { lowPrice }); // eslint-disable-line
    }
  };

  const setMaxPrice = async () => {
    const products = await Product.find();
    // console.log(products);
  for (const item of products) { // eslint-disable-line
    const shops = await Shops.find({ product_id: item._id }); // eslint-disable-line
      // console.log(shops);
      let maxPrice = 0;
    for (let i=0; i<shops.length; i+=1) { // eslint-disable-line
        if ((shops[i].price > maxPrice) && (shops[i].presence !== 0)) {
          maxPrice = shops[i].price;
        }
      }
      // console.log(`${item.name}: ${lowPrice}`);
    await Product.findOneAndUpdate({ _id: item._id }, { maxPrice }); // eslint-disable-line
    }
  };

  try {
    await getFromParser();
    setLowerPrice();
    setMaxPrice();
    console.log('finished');
  } catch (e) {
    console.error(e);
  }
};

// seed();
