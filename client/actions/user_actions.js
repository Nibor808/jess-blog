import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_USERS } from './types';
import { ROOT_URL } from '../config/config.json';

export function signupUser({ email, password, username }) {
  return function(dispatch) {
    return axios.post(`${ROOT_URL}/signup`, { email, password, username })
      .then((response) => {
        if (response.data.error) {
          dispatch({
            type: AUTH_ERROR,
            payload: response.data.error
          })
        }else {
          dispatch({
            type: AUTH_USER,
            payload: response.data.username
          });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.username);
          browserHistory.goBack();
        }
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: err.message
        });
      });
  };
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    return axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({
          type: AUTH_USER,
          payload: response.data.username
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.username);
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Invalid Login Info'
        });
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  return {
    type: UNAUTH_USER
  };
}

export function getUsers() {
  return function(dispatch) {
    return axios.get(`${ROOT_URL}/users`)
      .then(response => {
        dispatch({
          type: GET_USERS,
          payload: response.data.ok
        })
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Could not get users.'
        })
      });
  }
}
