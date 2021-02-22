import { combineReducers } from "redux";
import currentUser from "./currentUser";
import alert from "./alert";
import country from "./country";

const rootReducer = combineReducers({
  currentUser, //currentUser: currentUser
  country,
  alert,
});

export default rootReducer;
