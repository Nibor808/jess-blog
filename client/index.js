import './styles/styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import PostsPage from './components/posts_page';
import ReviewPage from './components/reviews_page';
import QuestionPage from './components/questions_page';
import QuestionList from './components/question/question_list';
import Post from './components/post/post';
import Review from './components/review/review';
import Question from './components/question/question';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import AddComment from './components/comment/add_comment';
import EditComment from './components/comment/edit_comment';
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

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={PostsPage} />
        <Route path='/reviews' component={ReviewPage} />
        <Route path='/questions' component={QuestionPage}>
          <Route path='/signin_question_page' component={Signin} />
          <Route path='/signup_question_page' component={Signup} />
          <Route path='/askquestion' component={requireAuth(AskQuestion)} />
        </Route>
        <Route path='/post/:id' component={Post}>
          <Route path='/signin_post' component={Signin} />
          <Route path='/signup_post' component={Signup} />
          <Route path='/addcomment_post' component={requireAuth(AddComment)} />
          <Route path='/editcomment_post/:id' component={EditComment} />
        </Route>
        <Route path='/review/:id' component={Review}>
          <Route path='/signin_review' component={Signin} />
          <Route path='/signup_review' component={Signup} />
          <Route path='/addcomment_review' component={requireAuth(AddComment)} />
          <Route path='/editcomment_review/:id' component={EditComment} />
        </Route>
        <Route path='/question/:id' component={Question}>
          <Route path='/signin_question' component={Signin} />
          <Route path='/signup_question' component={Signup} />
          <Route path='/addcomment_question' component={requireAuth(AddComment)} />
          <Route path='/editcomment_question/:id' component={EditComment} />
        </Route>
      </Route>
    </Router>
  </Provider>
, document.querySelector('.main'));