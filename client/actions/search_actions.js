import axios from 'axios';
import { SEARCH_RESULT, RESET_SEARCH_RESULT, ERROR } from './types';
import { ROOT_URL } from '../config/config.json';

export function search({ keywordArray }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/search`, { keywordArray })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ERROR,
            payload: response.data.error
          });
        }else {
          dispatch({
            type: SEARCH_RESULT,
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

export function resetSearch() {
  return function(dispatch) {
    dispatch({
      type: RESET_SEARCH_RESULT
    });
  }
}
