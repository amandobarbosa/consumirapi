import { combineReducers } from "redux";
import exampleReducer from "./reducer";

export default combineReducers({
  example: exampleReducer,
});
