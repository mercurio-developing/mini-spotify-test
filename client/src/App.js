import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { Provider } from "react-redux";
import store from "./store";
import { setSpotifyUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";
import Login from "./components/login/Login";
import Search from "./components/search/Search";
import Current from "./components/current/Current";
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setSpotifyUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact={true} path={"/"}>
            <div className="App h-100">
              <div className="container h-100">
                <Switch>
                  <Redirect path={"/"} exact to="/login" />
                  <Route exact={true} path={"/login"} component={Login} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact={true}
                    path={"/search"}
                    component={Search}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact={true}
                    path={"/current"}
                    component={Current}
                  />
                </Switch>
              </div>
            </div>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
