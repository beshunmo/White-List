//  ACTION TYPES
export const APP_TYPES = {
  CART_TO_REDUX: 'CART_TO_REDUX',
  SHOW_PRODUCTS: 'SHOW_PRODUCTS',
  Products_To_Redux: 'Products_To_Redux',
  PageName_To_Redux: 'PageName_To_Redux'
};

// ACTION CREATORS
export const productsToReduxAC = products => ({
  type: APP_TYPES.Products_To_Redux,
  products
});

export const cartToReduxAC = item => ({
  type: APP_TYPES.CART_TO_REDUX,
  payload: {
    cart: item
  }
});

export const showProductsAC = products => ({
  type: APP_TYPES.SHOW_PRODUCTS,
  payload: {
    showProducts: products
  }
});

export const pageNameToReduxAC = pageName => ({
  type: APP_TYPES.PageName_To_Redux,
  payload: {
    pageName
  }
});
