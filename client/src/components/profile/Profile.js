import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from "./EditDetails"
// mui stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// redux
import { connect } from "react-redux";
import { uploadUserImage, logoutUser } from "../../redux/actions/userActions";
import MyButton from '../scream/MyButton';

const styles = (theme) => ({
    ...theme.sub
  });

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadUserImage(formData);
    }
    handleEditImage = () => {
        const userImage = document.getElementById("userImage");
        userImage.click();
    }
    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { classes, user: { credentials: { 
            handle, createdAt, imageUrl, bio, website, location}, loading, authenticated}
        } = this.props;

        let profileContent = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id="userImage" hidden="hidden" onChange={this.handleImageChange}/>
                        <MyButton tip="Edit profile image" onClick={this.handleEditImage} btnClassName="button">
                            <EditIcon color="primary"/>
                        </MyButton>
                    </div>
                </div>
                <hr/>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <Fragment>
                            <LocationOn color="primary" /> <span>{location}</span>
                            <hr/>
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank">
                                {' '}{website}
                            </a>
                            <hr/>
                        </Fragment>
                    )}
                    <CalendarToday color="primary"/>{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
                <MyButton tip="Logout" onClick={this.handleLogout}>
                    <KeyboardReturn color="primary"/>
                </MyButton>
                <EditDetails/>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                </div>
            </Paper>
        )) : (<p>loading...</p>);
        return profileContent;
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = { uploadUserImage, logoutUser };
  
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));