import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';

import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import { Dialog, DialogContent, CircularProgress, Grid } from '@material-ui/core';

// redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
import MyButton from './MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const styles = theme => ({
  ...theme.spreadThis,
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "1%",
  },
  dialogContent: {
      width: 500,
      padding: 20,
  },
  spinnerDiv: {
      textAlign: "center",
  }
})

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: "",
        newPath: "",
    };
    componentDidMount() {
        if(this.props.openDialog) {
            this.handleOpen();
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, screamId } = this.props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;

        if(oldPath === newPath) oldPath = `/users/${userHandle}`;
        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath })
        this.props.getScream(this.props.screamId);
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false })
        this.props.clearErrors();
    }
    render() {
        const { classes, UI: { loading }, data: { scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } } } = this.props;
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} />
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5} className={classes.profile}>
                    <img src={userImage} alt="Profile" className="profile-image" />
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <CommentForm screamId={screamId}/>
                <hr className={classes.visibleSeparator} />
                <Comments screamId={screamId}/>
            </Grid>
        );
        return (
            <Fragment>
                <MyButton tip="Display Scream" onClick={this.handleOpen} tipClassName={classes.expandButton}>
                    <UnfoldMore color="secondary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
                </Dialog>
            </Fragment>
        );
    }

}

ScreamDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    getScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  }
  const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data,
  });
  
  const mapActionsToProps = {
    getScream,
    clearErrors,
  }
  
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));
