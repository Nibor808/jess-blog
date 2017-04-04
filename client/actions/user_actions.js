import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';
import { ROOT_URL } from '../config/config.json';

export function signupUser({ email, password, username }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password, username })
      .then((response) => {
        dispatch({
          type: AUTH_USER,
          payload: response.data.username
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.username);
        browserHistory.goBack();
      })
      .catch(({ response }) => {
       dispatch({
          type: AUTH_ERROR,
          payload: response.data.error
        });
      });
  };
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({
          type: AUTH_USER,
          payload: response.data.username
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.username);
      })
      .catch(() => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Incorrect login info'
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