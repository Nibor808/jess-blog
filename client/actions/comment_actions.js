import axios from 'axios';
import { SAVE_COMMENT, GET_COMMENTS, RESET_COMMENT_STATE, GET_POST, GET_REVIEW, ERROR } from './types';
import { ROOT_URL } from '../config/config.json';

export function saveComment({ idtype, typeid, user, title, content }) {
  return function(dispatch) {
    axios.defaults.headers['authorization'] = localStorage.getItem('token');
    axios.post(`${ROOT_URL}/savecomment/${idtype}/${typeid}`, { user, title, content })
      .then(response => {
        dispatch({
          type: SAVE_COMMENT
        });
      })
      .then(() => {
        dispatch({
          type: RESET_COMMENT_STATE
        });
      })
      .catch(response => {
        dispatch({
          type: ERROR,
          payload: response
        })
      });
  }
}

export function getComments(idtype, typeid) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/getcomments/${idtype}/${typeid}`)
    .then(response =>{
      dispatch({
        type: GET_COMMENTS,
        payload: response.data.ok
      });
    })
    .catch(response => {
      dispatch({
        type: ERROR,
        payload: response
      });
    });
  }
}