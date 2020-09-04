import React, { Component, Fragment } from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
// redux
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions";
import MyButton from './MyButton';
import DeleteButton from '@material-ui/icons/Delete';
// mui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    btnDelete : {
        position: "absolute",
        left: "90%",
        top: "10%"
    }
};
class DeleteScream extends Component {
    state = {
        open: false,
    };
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    handleDelete = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open: false })
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="Delete Scream" onClick={this.handleOpen} btnClassName={classes.btnDelete}>
                    <DeleteButton color="secondary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Delete Scream Conform</DialogTitle>
                    <DialogContent>Are you sure to delete this scream?</DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancle</Button>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

DeleteScream.propTypes = {
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.object.isRequired,
    deleteScream: PropTypes.func.isRequired,
  }
  const mapActionsToProps = {
    deleteScream
  }
  
export default connect(null, mapActionsToProps)(withStyles(styles)(DeleteScream));
