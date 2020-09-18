
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// mui stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { connect } from "react-redux";
import { postComment } from "../../redux/actions/dataActions";

const styles = theme => ({
    ...theme.spreadThis,
    
})

class CommentForm extends Component {
    state = { 
        body: "",
        errors: {},
     }
     componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ errors: {}, body: ""});
        }
;    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postComment(this.props.screamId, {body: this.state.body});
    }
    render() { 
        const { classes, authenticated } = this.props;
        const { errors } = this.state;
        return authenticated ? (
            <Grid item sm={12} style={{textAlign: 'center'}}>
                <hr className={classes.visibleSeparator} />
                <form onSubmit={this.handleSubmit}>
                    <TextField name="body" type="text" label="Scream Body"
                        placeholder="Input Scream Body"
                        error={errors.body ? true : false}
                        helperText={errors.body}
                        value={this.state.body}
                        onChange={this.handleChange} className={classes.textField} fullWidth />
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
            </Grid>
         ) : null;
    }
}

CommentForm.prototypes = {
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
    postComment: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    UI: state.UI,
})
const mapActionsToProps = {
    postComment,
}
 
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));