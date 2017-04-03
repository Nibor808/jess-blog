import axios from 'axios';
import { GET_POSTS, GET_REVIEWS, GET_QUESTIONS, GET_ARTICLE, SAVE_ARTICLE, RESET_ARTICLE_STATE, ERROR } from './types';
import { ROOT_URL } from '../config/config.json';

export function getArticles(type) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/articles/${type}`)
      .then(response => {
        if (type === 1) {
          dispatch({
            type: GET_POSTS,
            payload: response.data.ok
          })
        }else if (type === 2) {
          dispatch({
            type: GET_REVIEWS,
            payload: response.data.ok
          })
        }else if (type === 3) {
          dispatch({
            type: GET_QUESTIONS,
            payload: response.data.ok
          })
        }
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err
        });
      });
  }
}

export function getArticle(id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/article/${id}`)
      .then(response => {
        dispatch({
          type: GET_ARTICLE,
          payload: response.data.ok
        });
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err
        });
      });
  }
}

export function saveArticle({ type, title, content, category, keywordArray, cover_img, specs, pros, cons }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/savearticle`, { type, title, content, category, keywordArray, cover_img, specs, pros, cons })
      .then(response => {
        dispatch({
          type: SAVE_ARTICLE
        })
      })
      .then(() => {
        dispatch({
          type: RESET_ARTICLE_STATE
        })
      })
      .catch(({ response }) => {
        dispatch({
          type: ERROR,
          payload: response.data.error
        })
      })
  }
}
