import axios from 'axios';
import { GET_POSTS, GET_POST, ERROR } from './types';
import { ROOT_URL } from '../config/config.json';

export function getAllPosts() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/posts`)
      .then(response => {
        dispatch({
          type: GET_POSTS,
          payload: response.data.ok
        });
      })
      .catch(error => {
        dispatch({
          type: ERROR,
          payload: error
        });
      });
  };
}

export function getPost(id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/post/${id}`)
      .then(response => {
        dispatch({
          type: GET_POST,
          payload: response.data.ok
        });
      })
      .catch(({ response }) => {
        dispatch({
          type: ERROR,
          payload: response.data.error
        });
      });
  };
}