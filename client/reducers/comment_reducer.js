import { SAVE_COMMENT, GET_COMMENTS, RESET_COMMENT_STATE,
  GET_A_COMMENT, GET_COMMENT_REPLIES, DELETE_COMMENT, ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
  case SAVE_COMMENT:
    return { ...state, commentSaved: true, error: '' };
  case RESET_COMMENT_STATE:
    return { ...state, commentSaved: false, commentDeleted: false, error: '' };
  case GET_COMMENTS:
    return { ...state, commentArray: action.payload, error: '' }
  case GET_A_COMMENT:
    return { ...state, singleComment: action.payload, error: '' }
  case GET_COMMENT_REPLIES:
    return { ...state, repliesArray: action.payload, error: '' }
  case DELETE_COMMENT:
    return { ...state, commentDeleted: true, error: '' }
  case ERROR:
    return { ...state, commentSaved: false, error: action.payload };
  default:
    return state;
  }
}