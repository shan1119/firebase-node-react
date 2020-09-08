import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, 
    LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from '../types';
import axios from 'axios';

// get screams
export const getScreams = () => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get("/scream")
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data,
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: [],
            })
        });
}

// like scream
export const likeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data,
            })
        })
        .catch(err => console.log(err.code));
}

// unlike scream
export const unlikeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data,
            })
        })
        .catch(err => console.log(err.code));
}

// delete a scream
export const deleteScream = (screamId) => dispatch => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId,
            })
        })
        .catch(err => console.log(err.code));
}

// post a scream
export const postScream = (newScream) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.post('/scream', newScream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data,
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data,
            })
        });
}

// clear errors
 export const clearErrors = () => dispatch => {
     dispatch({ type: CLEAR_ERRORS });
 }