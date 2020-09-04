import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MyButton from "./MyButton";

// icons
import HomeIcon from "@material-ui/icons/Home"
import Notifications from "@material-ui/icons/Notifications"
import PostScream from "./PostScream";

class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
              <ToolBar className="nav-container">
                {authenticated ? (
                  <Fragment>
                    <PostScream />
                    <MyButton tip="Home">
                      <HomeIcon />
                    </MyButton>
                    <MyButton tip="Notifications">
                      <Notifications />
                    </MyButton>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">SignUp</Button>
                  </Fragment>
                  
                )}
                  
              </ToolBar>
            </AppBar>
          )
    }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);