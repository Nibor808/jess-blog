import axios from 'axios';
import { GET_POSTS, GET_REVIEWS, GET_QUESTIONS,
  GET_ARTICLE, GET_ALL_ARTICLES, GET_ALL_PREVIEWS,
  SAVE_ARTICLE, RESET_ARTICLE_STATE, PUBLISH_ARTICLE,
  DELETE_ARTICLE, EDIT_ARTICLE, CLOSE_MODAL, OPEN_MODAL, ERROR } from './types';
import { ROOT_URL } from '../config/config.json';

export function getAllArticles(isPreview) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/allarticles/${isPreview}`,)
      .then(response => {
        if (isPreview === 0) {
          dispatch({
            type: GET_ALL_ARTICLES,
            payload: response.data.ok
          });
        }else {
          dispatch({
            type: GET_ALL_PREVIEWS,
            payload: response.data.ok
          });
        }

      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.message
        })
      });
  }
}

// get post, review, or question articles based on type (post = 1, review = 2, question = 3)
export function getArticles(type) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/articles/${type}`)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ERROR,
            payload: response.data.error
          });
        }else {
          if (type === 1) {
            dispatch({
              type: GET_POSTS,
              payload: response.data.ok
            });
          }else if (type === 2) {
            dispatch({
              type: GET_REVIEWS,
              payload: response.data.ok
            });
          }else if (type === 3) {
            dispatch({
              type: GET_QUESTIONS,
              payload: response.data.ok
            });
          }
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

export function getArticle(id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/article/${id}`)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ERROR,
            payload: response.data.error
          })
        }else {
          dispatch({
            type: GET_ARTICLE,
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

export function saveArticle({ type, title, content, category, keywordArray, cover_img, specs, pros, cons }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/savearticle`, { type, title, content, category, keywordArray, cover_img, specs, pros, cons })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ERROR,
            payload: response.data.error
          });
        }else {
          dispatch({
            type: SAVE_ARTICLE,
            payload: response.data.success
          });
        }
      })
      .then(() => {
        dispatch({
          type: RESET_ARTICLE_STATE
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

export function publishArticle(id) {
  return function(dispatch) {
    axios.defaults.headers['authorization'] = localStorage.getItem('token');
    axios.post(`${ROOT_URL}/publisharticle/${id}`)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ERROR,
            payload: response.data.error
          });
        }else {
          dispatch({
            type: PUBLISH_ARTICLE
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

export function deleteArticle(id) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/deletearticle/${id}`)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ERROR,
            payload: response.data.error
          });
        }else {
          dispatch({
            type: DELETE_ARTICLE,
            payload: response.data.success
          });
        }
      })
      .then(() => {
        dispatch({
          type: RESET_ARTICLE_STATE
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

export function updateArticle({ id, type, title, content, category, keywordArray, cover_img, specs, pros, cons }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/updatearticle/${id}`, { type, title, content, category, keywordArray, cover_img, specs, pros, cons })
    .then(response => {
      if (response.data.error) {
        dispatch({
          type: ERROR,
          payload: response.data.error
        });
        }else {
          dispatch({
            type: SAVE_ARTICLE,
            payload: response.data.success
          });
        }
      })
      .then(() => {
        dispatch({
          type: RESET_ARTICLE_STATE
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


export function toggleModal(modalOpen) {
  return function(dispatch) {
    if (modalOpen === true) {
      dispatch({
        type: CLOSE_MODAL
      })
    }else {
      dispatch({
        type: OPEN_MODAL
      })
    }
  }
}
