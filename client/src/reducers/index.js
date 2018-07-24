import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import spotifyReducer from "./spotifyReducer";
export default combineReducers({
  auth: authReducer,
  spotify: spotifyReducer,
  errors: errorReducer
});
