import {initializeApp} from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {getAuth} from 'firebase/auth'
import firebaseConfig from "./config";

export const app =initializeApp(firebaseConfig);

export const auth = getAuth()