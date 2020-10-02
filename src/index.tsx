import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import store from "./redux/store";
import "./i18n";
import { rrfConfig } from "./firebase";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfConfig}>
          <Suspense fallback={null}>
            <Switch>
              <PrivateRoute path="/users">
                <App />
              </PrivateRoute>
              <Route path="/" exact>
                <Login />
              </Route>
            </Switch>
          </Suspense>
        </ReactReduxFirebaseProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
