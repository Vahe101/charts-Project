import { combineReducers } from "redux";
import { usersReducer } from "./index";

const rootReducers = combineReducers({
  users: usersReducer
});

export default rootReducers;
