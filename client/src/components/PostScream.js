import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// mui stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from "@material-ui/icons/Add"

// redux
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";
import MyButton from './MyButton';
import { Dialog, DialogTitle, DialogContent, CircularProgress } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.sub,
    submitButton: { position: "relative" },
    progressSpinner: { position: "absolute" },
    closeButton: { 
        position: "absolute",
        left: "90%",
        top: "10%",
    },
  });

class PostScream extends Component {
    state = {
        open: false,
        body: "",
        errors: {},
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.handleClose();
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false, errors: {}, body: ""});
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({body: this.state.body});
    }
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a new Scream">
                    <AddIcon />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Post a new Scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                        <TextField name="body" type="text"  label="Scream" multiline rows="3"
                                placeholder="write some content here"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.TextField} 
                                onChange={this.handleChange} fullWidth />
                        <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
                            Submit
                            {loading && (<CircularProgress size={30} className={classes.progressSpinner} />)}
                        </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI,
});

const mapActionsToProps = { postScream };
  
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream));