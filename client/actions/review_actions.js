import axios from 'axios';
import { GET_REVIEWS, GET_REVIEW, ERROR } from './types';
import { ROOT_URL } from '../config/config.json';

export function getAllReviews() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/reviews`)
      .then(response => {
        dispatch({
          type: GET_REVIEWS,
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

export function getReview(id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/review/${id}`)
      .then(response => {
        dispatch({
          type: GET_REVIEW,
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

