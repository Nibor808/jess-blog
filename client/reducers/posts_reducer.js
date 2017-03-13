import { GET_POSTS, GET_POST } from '../actions/types';

const INITIAL_STATE = {
  allPosts: [],
  post: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_POSTS:
    return { ...state, allPosts: action.payload };
  case GET_POST:
    return { ...state, post: action.payload };
  }

  return state;
}