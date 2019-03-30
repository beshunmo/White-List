//  ACTION TYPES
export const APP_TYPES = {
  Username_To_Redux: 'Username_To_Redux'
};

// ACTION CREATORS
export const usernameToReduxAC = username => ({
  type: APP_TYPES.Username_To_Redux,
  username
});
