import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme"
import jwtDecode from "jwt-decode"
//redux
import {Provider} from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
// components
import NavBar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
// pages
import user from './pages/user';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import axios from "axios";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL="https://asia-northeast1-shan0801-186f9.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if(token) {
  const decodedToken = jwtDecode(token);
  // console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()) {
    // window.location.href = "/login"
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED});
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
// console.log("token: ", token);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route exact path="/users/:handle/scream/:screamId" component={user} />
            </Switch>
          </div>
        </Router>
      </Provider>
      
    </MuiThemeProvider>
    
  );
}

export default App;
