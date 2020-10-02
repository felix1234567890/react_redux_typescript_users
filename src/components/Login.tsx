import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { ReactComponent as Google } from "../images/GoogleSVG.svg";

const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();

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
