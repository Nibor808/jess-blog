import { GET_USERS, GET_ALL_ARTICLES, ERROR } from '../actions/types';

const INITIAL_STATE = {
  users: [],
  allArticles: []
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_USERS:
    return { ...state, users: action.payload }
  case GET_ALL_ARTICLES:
    return { ...state, allArticles: action.payload }
  case ERROR:
    return { ...state, error: action.payload }
  default:
    return state;
  }
}