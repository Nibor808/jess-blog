import { GET_REVIEWS, GET_REVIEW } from '../actions/types';

const INITIAL_STATE = {
  allReviews: [],
  review: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_REVIEWS:
    return { ...state, allReviews: action.payload }
  case GET_REVIEW:
    return { ...state, review: action.payload }
  }

  return state;
}