import axios from 'axios';
import {
  GET_POSTS, GET_REVIEWS, GET_QUESTIONS,
  GET_ARTICLE, GET_ALL_ARTICLES, GET_ALL_PREVIEWS,
  SAVE_ARTICLE, RESET_ARTICLE_STATE, PUBLISH_ARTICLE,
  DELETE_ARTICLE, EDIT_ARTICLE, CLOSE_MODAL, OPEN_MODAL, IS_REVIEW, ARTICLE_ERROR
} from './types';

export function getAllArticles(isPreview) {
  return function (dispatch) {
    return axios.get(`${SERVER_URL}/allarticles/${isPreview}`, )
      .then(response => {
        if (isPreview === 0) {
          dispatch({
            type: GET_ALL_ARTICLES,
            payload: response.data.ok
          });
        } else {
          dispatch({
            type: GET_ALL_PREVIEWS,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: ARTICLE_ERROR,
          payload: err.message
        })
      });
  }
}

// get post, review, or question articles based on type (post = 1, review = 2, question = 3)
export function getArticles(type) {
  return function (dispatch) {
    return axios.get(`${SERVER_URL}/articles/${type}`)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ARTICLE_ERROR,
            payload: response.data.error
          });
        } else {
          if (type === 1) {
            dispatch({
              type: GET_POSTS,
              payload: response.data.ok
            });
          } else if (type === 2) {
            dispatch({
              type: GET_REVIEWS,
              payload: response.data.ok
            });
          } else if (type === 3) {
            dispatch({
              type: GET_QUESTIONS,
              payload: response.data.ok
            });
          }
        }
      })
      .catch(err => {
        dispatch({
          type: ARTICLE_ERROR,
          payload: err.message
        });
      });
  }
}

export function getArticle(id) {
  return function (dispatch) {
    return axios.get(`${SERVER_URL}/article/${id}`)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ARTICLE_ERROR,
            payload: response.data.error
          })
        } else {
          dispatch({
            type: GET_ARTICLE,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: ARTICLE_ERROR,
          payload: err.message
        });
      });
  }
}

export function saveArticle({ type, title, content, category, keywordArray, cover_img, specs, pros, cons }) {
  return function (dispatch) {
    return axios.post(`${SERVER_URL}/savearticle`, { type, title, content, category, keywordArray, cover_img, specs, pros, cons })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ARTICLE_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: SAVE_ARTICLE,
            payload: response.data.ok
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
          type: ARTICLE_ERROR,
          payload: err.message
        });
      });
  }
}

export function publishArticle(id) {
  return function (dispatch) {
    axios.defaults.headers['authorization'] = localStorage.getItem('token');
    return axios.post(`${SERVER_URL}/publisharticle/${id}`)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ARTICLE_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: PUBLISH_ARTICLE,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: ARTICLE_ERROR,
          payload: err.message
        });
      });
  }
}

export function deleteArticle(id) {
  return function (dispatch) {
    return axios.post(`${SERVER_URL}/deletearticle/${id}`)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ARTICLE_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: DELETE_ARTICLE,
            payload: response.data.ok
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
          type: ARTICLE_ERROR,
          payload: err.message
        });
      });
  }
}

export function updateArticle({ id, type, title, content, category, keywordArray, cover_img, specs, pros, cons }) {
  return function (dispatch) {
    return axios.post(`${SERVER_URL}/updatearticle/${id}`, { type, title, content, category, keywordArray, cover_img, specs, pros, cons })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ARTICLE_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: SAVE_ARTICLE,
            payload: response.data.ok
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
          type: ARTICLE_ERROR,
          payload: err.message
        });
      });
  }
}


export function toggleModal(modalOpen) {
  return function (dispatch) {
    if (modalOpen) {
      dispatch({
        type: CLOSE_MODAL
      })
    } else {
      dispatch({
        type: OPEN_MODAL
      })
    }
  }
}

export function toggleReview(isReview) {
  return function (dispatch) {
    if (isReview) {
      dispatch({
        type: IS_REVIEW,
        payload: true
      });
    } else {
      dispatch({
        type: IS_REVIEW,
        payload: false
      });
    }
  }
}
