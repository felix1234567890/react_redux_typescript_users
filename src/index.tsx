import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import "./i18n";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login";
import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root");
if (!domNode) throw new Error("Failed to find the root element");
const root = createRoot(domNode);
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Suspense fallback={null}>
          <Routes>
            <Route
              path="/users"
              element={
                // <PrivateRoute>
                  <App />
                // </PrivateRoute>
              }
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </Suspense>
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
