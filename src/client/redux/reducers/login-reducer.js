const appReducerInitState = {
};

export default function loginReducer(state = appReducerInitState, action) {
  const login = action.text;
  return { ...state, login };
}
