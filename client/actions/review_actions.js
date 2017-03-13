import axios from 'axios';
import { GET_REVIEWS, GET_REVIEW, ERROR } from './types';

export function getAllReviews() {
  return function(dispatch) {
    axios.get('/reviews')
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
    axios.get(`/review/${id}`)
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

