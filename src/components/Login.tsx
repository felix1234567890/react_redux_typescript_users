import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";
import { Redirect, useHistory } from "react-router-dom";
import { ReactComponent as Google } from "../images/GoogleSVG.svg";

const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const auth = useSelector((state: any) => state.firebase.auth);

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/users");
      });
  };

  if (isLoaded(auth) && !isEmpty(auth)) return <Redirect to="/users" />;
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
