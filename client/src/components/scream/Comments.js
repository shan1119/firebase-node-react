import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// redux
import { connect } from "react-redux";

import { postComment } from "../../redux/actions/dataActions"

const styles = theme => ({
    ...theme.sub,
    commentImage: {
        maxWidth: "100%",
        height: 100,
        objectFit: "cover",
        borderRadius: "50%"
    }
})

class Comments extends Component {
    state = {  };
    render() { 
        const { classes, scream: { comments } } = this.props;
        return ( 
            <Grid item sm={12}>
                {
                comments.map( comment => {
                    return (
                        <Fragment key={comment.createdAt}>
                            <hr className={classes.visibleSeparator} />
                            <Grid container>
                                <Grid item sm={3}>
                                    <img src={comment.imageUrl} alt="Profile" className={classes.commentImage} />
                                </Grid>
                                <Grid item sm={9}>
                                    <Typography component={Link} color="primary" variant="h5" to={`/users/${comment.userHandle}`}>
                                        @{comment.userHandle}
                                    </Typography>
                                    <hr className={classes.invisibleSeparator} />
                                    <Typography variant="body2" color="textSecondary">
                                        {dayjs(comment.createdAt).format("h:mm a, MMMM DD YYYY")}
                                    </Typography>
                                    <hr className={classes.invisibleSeparator} />
                                    <Typography variant="body1">{comment.body}</Typography>
                                    
                                </Grid>
                            </Grid>
                        </Fragment>
                    );
                })}
            </Grid>
         );
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    user: state.user,
})
const mapActionsToProps = {
    postComment,
}
 
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Comments));
