import React, { Component } from 'react';
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

import ChatIcon from "@material-ui/icons/Chat";

// redux
import { connect } from "react-redux";
import MyButton from './MyButton';
import LikeButton from './LikeButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

const styles = {
    card: {
        position: "relative",
        display: "flex",
        marginBottom: 20
    },
    content: {
        padding: 25
    },
    image: {
        minWidth: 200
    }
};

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }, 
                user: { authenticated, credentials: { handle }}} = this.props;
        
        const deleteButton = (authenticated && userHandle === handle) ? (<DeleteScream screamId={screamId} />) : (null);
        return (
            <Card className={classes.card}>
                <CardMedia className={classes.image} image={userImage} title={body}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1" >{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    scream: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool,
  }
  const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data,
  });
  
export default connect(mapStateToProps)(withStyles(styles)(Scream));
