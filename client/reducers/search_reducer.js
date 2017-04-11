import { SEARCH_RESULT, RESET_SEARCH_RESULT, ERROR } from '../actions/types';

export default function(state = { searchResult: [] }, action) {
  switch(action.type) {
    case SEARCH_RESULT:
      return { ...state, searchResult: action.payload, error: '' }
    case RESET_SEARCH_RESULT:
      return { ...state, searchResult: '', error: '' }
    case ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}
