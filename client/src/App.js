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
// components
import NavBar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if(token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()) {
    // window.location.href = "/login"
    authenticated = false;
  } else {
    authenticated = true;
  }
}
console.log("token: ", token);
console.log("authenticated: ", authenticated);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </Provider>
      
    </MuiThemeProvider>
    
  );
}

export default App;
