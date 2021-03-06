import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import CommentReducer from './comment_reducer';
import ArticleReducer from './article_reducer';
import AdminReducer from './admin_reducer';
import SearchReducer from './search_reducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  comment: CommentReducer,
  auth: AuthReducer,
  article: ArticleReducer,
  admin: AdminReducer,
  search: SearchReducer,
  form
});

export default rootReducer;
