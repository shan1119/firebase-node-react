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

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: "20px auto 20px auto",
    width: "50px",
    height: "50px"
  },
  pageTitle: {
    margin: "20px auto 20px auto",
  },
  textField: {
    margin: "20px auto 20px auto",

  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "10px"
  },
  button: {
    marginTop: "20px",
    position: "relative"
  },
  progress: {
    position: "absolute"
  }
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log(userData);
    axios.post("/login", userData)
        .then(res => {
            console.log(res.data);
            this.setState({loading: false})
            this.props.history.push("/");
        })
        .catch(err => {
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
            <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField id="email" name="email" type="email" label="Email" 
                  helperText={errors.email} error={errors.email ? true : false}
                  className={classes.textField} value={this.state.email} onChange={this.handleChange} fullWidth />
              <TextField id="password" name="password" type="password" label="Password" 
                  helperText={errors.password} error={errors.password ? true : false}
                  className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
              )}
              <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                Login {loading && (
                  <CircularProgress size={30} className={classes.progress}></CircularProgress>
                )}
              </Button>
              <br/>
              <small>don't have an account ? sign up <Link href="/signup">here</Link></small>
            </form>
          </Grid>
          <Grid item sm></Grid>
        </Grid>
      );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);
