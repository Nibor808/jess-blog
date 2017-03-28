import { SAVE_COMMENT, GET_COMMENTS, RESET_COMMENT_STATE, ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
  case SAVE_COMMENT:
    return { ...state, commentSaved: true, error: '' };
  case RESET_COMMENT_STATE:
    return { ...state, commentSaved: false, error: '' };
  case GET_COMMENTS:
    return { ...state, commentArray: action.payload, error: '' }
  case ERROR:
    return { ...state, commentSaved: false, error: action.payload };
  }

  return state;
}