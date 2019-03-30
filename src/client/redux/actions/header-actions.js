//  ACTION TYPES
export const APP_TYPES = {
  INPUT_SEARCH_TEXT: 'INPUT_SEARCH_TEXT'
};

// ACTION CREATORS
export const inputTextAC = text => ({
  type: APP_TYPES.INPUT_SEARCH_TEXT,
  payload: {
    searchText: text
  }
});
