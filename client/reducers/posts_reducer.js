import { GET_POSTS } from '../actions/types';

const INITIAL_STATE = {
  all: [],
  post: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_POSTS:
    return { ...state, all: action.payload };
  }

  return state;
}