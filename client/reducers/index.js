import { combineReducers } from 'redux';
import PostsReducer from './posts_reducer';
import ReviewsReducer from './reviews_reducer';
import AuthReducer from './auth_reducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  reviews: ReviewsReducer,
  auth: AuthReducer,
  form
});

export default rootReducer;