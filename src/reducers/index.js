import initialState from "../actions";

// Create Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_MSG":
      return {
        ...state,
        mgs: action.payload
      };
    case "UPDATE_RECEIVE":
      return {
        ...state,
        receiveMsg: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
