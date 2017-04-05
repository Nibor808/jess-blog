import axios from 'axios';
import { SAVE_COMMENT, GET_COMMENTS, RESET_COMMENT_STATE,
  GET_A_COMMENT, GET_COMMENT_REPLIES, DELETE_COMMENT, ERROR } from './types';
import { ROOT_URL } from '../config/config.json';

export function saveComment({ type, id, user, title, content }) {
  return function(dispatch) {
    axios.defaults.headers['authorization'] = localStorage.getItem('token');
    axios.post(`${ROOT_URL}/savecomment`, {type, id, user, title, content })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ERROR,
            payload: response.data.error
          })
        }else {
          dispatch({
            type: SAVE_COMMENT
          });
        }
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

export function getComments(type, id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/comments/${type}/${id}`)
    .then(response =>{
      if (response.data.error) {
        dispatch({
          type: ERROR,
          payload: response.data.error
        })
      }else {
        dispatch({
          type: GET_COMMENTS,
          payload: response.data.ok
        });
      }
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.message
      });
    });
  }
}

export function getCommentReplies(type, id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/comments/${type}/${id}`)
    .then(response =>{
      if (response.data.error) {
        dispatch({
          type: ERROR,
          payload: response.data.error
        })
      }else {
        dispatch({
          type: GET_COMMENT_REPLIES,
          payload: response.data.ok
        });
      }
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.message
      });
    });
  }
}

export function getAComment(id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/editcomment/${id}`)
    .then(response => {
      if (response.data.error) {
        dispatch({
          type: ERROR,
          payload: response.data.error
        })
      }else {
        dispatch({
          type: GET_A_COMMENT,
          payload: response.data.ok
        })
      }
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.message
      });
    });
  }
}

export function updateComment({ id, title, content }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/updatecomment/${id}`, { title, content })
    .then(response => {
      if (response.data.error) {
        dispatch({
          type: ERROR,
          payload: response.data.error
        })
      }else {
        dispatch({
          type: SAVE_COMMENT
        });
      }
    })
    .then(() => {
      dispatch({
        type: RESET_COMMENT_STATE
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.message
      });
    });
  }
}

export function deleteComment(id) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/deletecomment/${id}`)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ERROR,
            payload: response.data.error
          })
        }else {
          dispatch({
            type: DELETE_COMMENT
          })
        }
      })
      .then(() => {
        dispatch({
          type: RESET_COMMENT_STATE
        });
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.message
        });
      });
  }
}