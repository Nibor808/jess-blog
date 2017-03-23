import axios from 'axios';
import { SAVE_COMMENT, RESET_COMMENT_STATE, GET_POST, GET_REVIEW, ERROR } from './types';
import { ROOT_URL } from '../config/config.json';

export function saveComment({ id, isReview, isPost, user, title, content }) {
  if (isPost) {
    return function(dispatch) {
      axios.defaults.headers['authorization'] = localStorage.getItem('token');
      axios.post(`${ROOT_URL}/savepostcomment`, { id, user, title, content })
        .then(response => {
          dispatch({
            type: SAVE_COMMENT
          })
        })
        .then(() => {
          dispatch({
            type: RESET_COMMENT_STATE
          })
        })
        .catch(({ response }) => {
          dispatch({
            type: ERROR,
            payload: response.data.error
          })
        });
    }
  }
  if (isReview) {
    return function(dispatch) {
      axios.defaults.headers['authorization'] = localStorage.getItem('token');
      axios.post(`${ROOT_URL}/savereviewcomment`, { id, user, title, content })
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
        .catch(({ response }) => {
          dispatch({
            type: ERROR,
            payload: response.data.error
          })
        });
    }
  }

}