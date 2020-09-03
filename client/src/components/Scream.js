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
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";
import MyButton from './MyButton';

const styles = {
    card: {
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
    likedScream = () => {
        return (this.props.user.likes && 
            this.props.user.likes.find(like => like.screamId === this.props.scream.screamId))
    }
    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    }

    render() {
        dayjs.extend(relativeTime);
        const { classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }, 
                user: { authenticated }} = this.props;
        const likeButton = !authenticated ? (
            <MyButton tip="like">
                <Link to="/login">
                    <FavoriteBorder color="primary"/>
                </Link>
            </MyButton>
        ) : 
        this.likedScream() ? (
            <MyButton tip="Undo like" onClick={this.unlikeScream}>
                <FavoriteIcon color="primary"/>
            </MyButton>
        ):(
            <MyButton tip="Like" onClick={this.likeScream}>
                <FavoriteBorder color="primary"/>
            </MyButton>
        );
        return (
            <Card className={classes.card}>
                <CardMedia className={classes.image} image={userImage} title={body}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1" >{body} {screamId}</Typography>
                    {likeButton}
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    scream: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
  }
  const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data,
  });
  
  const mapActionsToProps = {
    likeScream, unlikeScream
  }
  
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
