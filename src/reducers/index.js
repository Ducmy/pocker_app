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
    case "SET_MODAL_SHOW":
      return {
        ...state,
        modalShow: action.payload
      };
    case "SET_CUR_SEAT_ID":
      return {
        ...state,
        curSeatID: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
