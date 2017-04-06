import './styles/styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import PostsPage from './components/post/posts_page';
import ReviewsPage from './components/review/reviews_page';
import QuestionsPage from './components/question/questions_page';
import AdminPage from './components/admin/admin_page';
import Article from './components/article/article';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import CommentModal from './components/comment/comment_modal';
import EditModal from './components/comment/edit_modal';
import DeleteModal from './components/comment/delete_modal';
import AskQuestion from './components/question/ask_question';
import requireAuth from './components/auth/requireAuth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

const childRoutes = [
  <Route path='/signin' component={Signin} />,
  <Route path='/signup' component={Signup} />,
  <Route path='/addcomment' component={requireAuth(CommentModal)} />,
  <Route path='/editcomment/:id' component={EditModal} />,
  <Route path='/replytocomment/:id' component={CommentModal} />,
  <Route path='/deletecomment/:id' component={DeleteModal} />
]

const questionChildren = [
  <Route path='/signin_question' component={Signin} />,
  <Route path='/signup_question' component={Signup} />,
  <Route path='/askquestion' component={requireAuth(AskQuestion)} />
]

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={PostsPage} />
        <Route path='/article/:id' component={Article} children={childRoutes} />
        <Route path='/reviews' component={ReviewsPage} />
        <Route path='/questions' component={QuestionsPage} children={questionChildren}/>
        <Route path='/admin' component={AdminPage} />
      </Route>
    </Router>
  </Provider>
, document.querySelector('.main'));