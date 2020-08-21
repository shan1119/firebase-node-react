import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// NavBar
import NavBar from './components/Navbar';
// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#27CCA3',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}></Route>
              <Route exact path="/login" component={login}></Route>
              <Route exact path="/signup" component={signup}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
    
  );
}

export default App;
