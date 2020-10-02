import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { ReactReduxFirebaseProviderProps } from "react-redux-firebase";
import firebaseConfig from "./config";
import store from "../redux/store";

firebase.initializeApp(firebaseConfig);

export const rrfConfig: ReactReduxFirebaseProviderProps = {
  firebase,
  dispatch: store.dispatch,
  config: { logErrors: true },
};
