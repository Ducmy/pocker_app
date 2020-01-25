import initialState from "../actions";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
