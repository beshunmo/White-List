import { APP_TYPES } from '../actions/home-page-actions';

const appReducerInitState = {
  products: [],
  cart: [],
  showProducts: []
};

export default function appReducer(state = appReducerInitState, action) {
  switch (action.type) {
    case APP_TYPES.Products_To_Redux:
      return { ...state, products: action.products };
    case APP_TYPES.CART_TO_REDUX:
      return { ...state, ...action.payload };
    case APP_TYPES.SHOW_PRODUCTS:
      return { ...state, ...action.payload };
    case APP_TYPES.PageName_To_Redux:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
