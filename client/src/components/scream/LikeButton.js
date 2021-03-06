import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
import MyButton from './MyButton';


class LikeButton extends Component {
    likedScream = () => {
        return (this.props.user.likes && 
            this.props.user.likes.find(like => like.screamId === this.props.screamId))
    }
    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    }
    render() { 
        const { user: { authenticated}} = this.props;
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

        return likeButton;
    }
}
 
LikeButton.propTypes = {
    screamId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
  }
  const mapStateToProps = (state) => ({
    user: state.user,
  });
  
  const mapActionsToProps = {
    likeScream, unlikeScream
  }
  
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
