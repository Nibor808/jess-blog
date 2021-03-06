import {
  GET_ARTICLE, SAVE_ARTICLE, DELETE_ARTICLE, RESET_ARTICLE_STATE,
  GET_POSTS, GET_QUESTIONS, GET_REVIEWS, IS_REVIEW, PUBLISH_ARTICLE,
  CLOSE_MODAL, OPEN_MODAL, ARTICLE_ERROR, CLEAR_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  allPosts: [],
  allQuestions: [],
  allReviews: [],
  article: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ARTICLE:
      return { ...state, article: action.payload, error: '' }
    case SAVE_ARTICLE:
      return { ...state, articleSaved: true, success: action.payload, error: '' }
    case DELETE_ARTICLE:
      return { ...state, articleDeleted: true, success: action.payload, error: '' }
    case RESET_ARTICLE_STATE:
      return { ...state, articleSaved: false, articleDeleted: false }
    case GET_POSTS:
      return { ...state, allPosts: action.payload, article: null, error: '' };
    case GET_QUESTIONS:
      return { ...state, allQuestions: action.payload, article: null, error: '' }
    case GET_REVIEWS:
      return { ...state, allReviews: action.payload, article: null, error: '' }
    case IS_REVIEW:
      return { ...state, isReview: action.payload }
    case PUBLISH_ARTICLE:
      return { ...state, success: action.payload }
    case CLOSE_MODAL:
      return { ...state, modalOpen: false }
    case OPEN_MODAL:
      return { ...state, modalOpen: true }
    case ARTICLE_ERROR:
      return { ...state, error: action.payload }
    case CLEAR_ERROR:
      return { ...state, error: '', success: '' }
    default:
      return state;
  }
}
