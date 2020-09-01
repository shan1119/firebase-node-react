import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// redux
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";
// mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import MyButton from './MyButton';
// icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    ...theme.profile,
    button: {
      float: 'right'
    }
  });

class EditDetails extends Component {
    state = {
        bio: "",
        website: "",
        location: "",
        open: false,
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : "",
            website: credentials.website ? credentials.website : "",
            location: credentials.location ? credentials.location : "",
        })
    }
    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name="bio" type="text"  label="Bio" multiline rows="3" 
                                placeholder="A short bio about yourself"
                                className={classes.TextField} value={this.state.bio} 
                                onChange={this.handleChange} fullWidth />
                            <TextField name="website" type="text" label="Website" 
                                placeholder="Your personal/professional website"
                                className={classes.TextField} value={this.state.website} 
                                onChange={this.handleChange} fullWidth />
                            <TextField name="location" type="text"  label="Location"
                                placeholder="Where you live"
                                className={classes.TextField} value={this.state.location} 
                                onChange={this.handleChange} fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancle</Button>
                        <Button onClick={this.handleSubmit} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
});

const mapActionsToProps = { editUserDetails };
  
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));