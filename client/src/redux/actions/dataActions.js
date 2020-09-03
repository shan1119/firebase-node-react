import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM } from '../types';
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
