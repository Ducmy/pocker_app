import { createStore } from "redux";
import reducer from "../reducers";
// Create Store
const store = createStore(reducer);

export default store;
