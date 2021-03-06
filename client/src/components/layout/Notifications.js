import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// MUI stuff
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
// icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// redux
import { connect } from "react-redux";
import { markNotificationsRead } from '../../redux/actions/userActions'

class Nodifications extends Component {
    state = {
        anchorEl: null,
    }
    handleOpen = (event) => {
        this.setState({ anchorEl: event.target })
    }
    handleClose = () => {
        this.setState({ anchorEl: null })
    }
    onMenuOpened = () => {
        let unreadNotificationsId = this.props.notifications.filter(not => !not.read)
            .map(not => not.notificationId);
        console.log(this.props.notifications.filter(not => !not.read));
        console.log(unreadNotificationsId);
        this.props.markNotificationsRead(unreadNotificationsId);
    }
    render(){
        const { notifications } = this.props;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);
        let notificationIcon;
        if(notifications && notifications.length > 0) {
            let not = notifications.filter(not => not.read === false).length
            not > 0 ? notificationIcon = (
                    <Badge badgeContent={not} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                ) : (
                    notificationIcon = <NotificationsIcon/>
                )
        } else {
            notificationIcon = <NotificationsIcon/>
        }
        let notificationsMarkup = notifications && notifications.length > 0 ? (
            notifications.map(not => {
                const verb = not.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? ' primary' : 'secondary';
                const icon = not.type === 'like' ? (
                    <FavoriteIcon color={iconColor} style={{ marginRight: 10}} />
                ) : (
                    <ChatIcon color={iconColor} style={{ marginRight: 10}} />
                )

                return (
                    <MenuItem key={not.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography component={Link} color="default" variant="body1"
                            to={`/users/${not.recipient}/scream/${not.screamId}`}>
                                {not.sender} {verb} your scream {time}
                            </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                You have no notifications yet
            </MenuItem>
        )

        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true" onClick={this.handleOpen}>
                            {notificationIcon}
                        </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}
                    onEntered={this.onMenuOpened}>
                        {notificationsMarkup}
                    </Menu>
            </Fragment>
        )
    }
}

Nodifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    notifications: state.user.notifications
})
const mapDispatchToProps = {
    markNotificationsRead
}

export default connect(mapStateToProps, mapDispatchToProps)(Nodifications)