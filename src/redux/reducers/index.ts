import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  firebase: firebaseReducer,
});
export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
