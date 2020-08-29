import React, { Component } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppIcon from "../images/icon.png";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


import axios from "axios";

const styles = (theme) => ({
  ...theme.spreadThis
});

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      loading: false,
      errors: {}
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    }
    console.log(newUserData);
    axios.post("/signup", newUserData)
        .then(res => {
            console.log(res.data);
            localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`); // save token into local storage
            this.setState({loading: false})
            this.props.history.push("/");
        })
        .catch(err => {
          // console.log(err);
          this.setState({
            errors: err.response.data,
            loading: false
          })
        });
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
      return (
        <Grid container className={classes.form}>
          <Grid item sm></Grid>
          <Grid item sm>
            <img src={AppIcon} alt="setting" className={classes.image}/>
            <Typography variant="h2" className={classes.pageTitle}>SignUp</Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField id="email" name="email" type="email" label="Email" 
                  helperText={errors.email} error={errors.email ? true : false}
                  className={classes.textField} value={this.state.email} onChange={this.handleChange} fullWidth />
              <TextField id="password" name="password" type="password" label="Password" 
                  helperText={errors.password} error={errors.password ? true : false}
                  className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth />
              <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" 
                  helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false}
                  className={classes.textField} value={this.state.confirmPassword} onChange={this.handleChange} fullWidth />
              <TextField id="handle" name="handle" type="text" label="Handle" 
                  helperText={errors.handle} error={errors.handle ? true : false}
                  className={classes.textField} value={this.state.handle} onChange={this.handleChange} fullWidth />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
              )}
              <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                Signup {loading && (
                  <CircularProgress size={30} className={classes.progress}></CircularProgress>
                )}
              </Button>
              <br/>
              <small>Already have an account ? login <Link href="/login">here</Link></small>
            </form>
          </Grid>
          <Grid item sm></Grid>
        </Grid>
      );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup);
