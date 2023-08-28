import React from "react";
import { Navigate } from "react-router-dom";
import { ReactComponent as  Google } from "../../public/images/google.svg";
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const SignIn = () => {
  const [doSignInWithPopup, loggedInUser] = useSignInWithGoogle(auth)
  const navigate = useNavigate()

  const signInWithGoogle = () => {
    doSignInWithPopup()
      .then(() => {
        navigate("/users");
      });
  };

  if (loggedInUser) <Navigate to="/users" />
  return (
    <div className="container">
      <div className="center">
        <a className="google-button" onClick={signInWithGoogle}>
          <div className="icon">
            <Google />
          </div>
          <span>Sign in with Google</span>
        </a>
      </div>
    </div>
  );
};
export default SignIn;
