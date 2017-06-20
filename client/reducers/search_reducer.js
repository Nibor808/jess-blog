import { SEARCH_RESULT, RESET_SEARCH_RESULT, SEARCH_ERROR, CLEAR_ERROR } from '../actions/types';

export default function(state = { searchResult: [] }, action) {
  switch(action.type) {
  case SEARCH_RESULT:
    return { ...state, searchResult: action.payload, error: '' }
  case RESET_SEARCH_RESULT:
    return { ...state, searchResult: [] }
  case SEARCH_ERROR:
    return { ...state, error: action.payload }
  case CLEAR_ERROR:
    return { ...state, error: '' }
  default:
    return state;
  }
}
