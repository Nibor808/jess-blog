import axios from 'axios';
import { SAVE_COMMENT, RESET_COMMENT_STATE, ERROR } from './types';

export function saveComment({ id, isReview, isPost, user, title, content }) {
  if (isPost) {
    return function(dispatch) {
      axios.defaults.headers['authorization'] = localStorage.getItem('token');
      axios.post('/savepostcomment', { id, user, title, content })
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
        .catch(error => {
          dispatch({
            type: ERROR,
            payload: error
          })
        });
    }
  }
  if (isReview) {
    return function(dispatch) {
      axios.defaults.headers['authorization'] = localStorage.getItem('token');
      axios.post('/savereviewcomment', { id, user, title, content })
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
        .catch(error => {
          dispatch({
            type: ERROR,
            payload: error
          })
        });
    }
  }

}