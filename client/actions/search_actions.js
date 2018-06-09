import axios from 'axios';
import { SEARCH_RESULT, RESET_SEARCH_RESULT, SEARCH_ERROR } from './types';

export function search({ keywordArray }) {
  return function (dispatch) {
    return axios.post(`${SERVER_URL}/search`, { keywordArray })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: SEARCH_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: SEARCH_RESULT,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: SEARCH_ERROR,
          payload: err.message
        });
      });
  }
}

export function resetSearch() {
  return function (dispatch) {
    dispatch({
      type: RESET_SEARCH_RESULT
    });
  }
}
