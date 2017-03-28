import { combineReducers } from 'redux';
import PostsReducer from './posts_reducer';
import ReviewsReducer from './reviews_reducer';
import AuthReducer from './auth_reducer';
import CommentReducer from './comment_reducer';
import ImageReducer from './image_reducer';
import QuestionReducer from './question_reducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  reviews: ReviewsReducer,
  comments: CommentReducer,
  auth: AuthReducer,
  images: ImageReducer,
  questions: QuestionReducer,
  form
});

export default rootReducer;