import { APP_TYPES } from '../actions/app-actions';

const appReducerInitState = {
  username: ''
};

export default function appReducer(state = appReducerInitState, action) {
  switch (action.type) {
    case APP_TYPES.Username_To_Redux:
      return { ...state, username: action.username };
    default:
      return state;
  }
}
