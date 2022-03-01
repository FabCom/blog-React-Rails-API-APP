import { combineReducers } from "redux";
import postReducer from "./post.reducer.jsx"
import userReducer from "./user.reducer.jsx"


export default combineReducers({
  postReducer,
  userReducer,
})