import { combineReducers } from 'redux';
import PostsReducer from './posts_reducer';
import ReviewsReducer from './reviews_reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  reviews: ReviewsReducer
});

export default rootReducer;