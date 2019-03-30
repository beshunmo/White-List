import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appReducer from './app-reducer';
import userReducer from './user-reducer';
import postReducer from './post-reducer';
import loginReducer from './login-reducer';
import homeReducer from './home-page-reducer';
import headerReducer from './header-reducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  app: appReducer,
  user: userReducer,
  post: postReducer,
  login: loginReducer,
  products: homeReducer,
  searchProduct: headerReducer
});

export default reducers;
