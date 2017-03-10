import axios from 'axios';
// import { browserHistory } from 'react-router';
import { AUTH_USER, GET_POSTS, ERROR } from './types';
import { ROOT_URL } from '../../config/config.json';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        console.log('resp', response);
        // request is good dispatch new state
        dispatch({ type: AUTH_USER });
        //save JWT in localStorage
        localStorage.setItem('token', response.data.token);
        console.log('token set');
      });
  };
}

export function getAllPosts() {
  return function(dispatch) {
    axios.get('/posts')
      .then(response => {
        dispatch({
          type: GET_POSTS,
          payload: response.data.ok
        });
      })
      .catch(response => {
        dispatch({
          type: ERROR,
          payload: response.data
        });
      });
  };
}