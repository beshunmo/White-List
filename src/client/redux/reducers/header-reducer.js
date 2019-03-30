import { APP_TYPES } from '../actions/header-actions';

const headerReducerInitState = {
  searchText: ''
};

export default function headerReducer(state = headerReducerInitState, { type, payload }) {
  switch (type) {
    case APP_TYPES.INPUT_SEARCH_TEXT:
      return { ...state, ...payload };
    default:
      return state;
  }
}
