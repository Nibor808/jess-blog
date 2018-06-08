import './styles/styles.scss';
import './node_modules/jquery/dist/jquery.slim.min';
import './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import PostsPage from './components/post/posts_page';
import ReviewsPage from './components/review/reviews_page';
import QuestionsPage from './components/question/questions_page';
import SearchPage from './components/search/search_page';
import About from './components/about/about_page';
import AdminPage from './components/admin/admin_page';
import EditArticleModal from './components/admin/edit_article_modal';
import DeleteArticleModal from './components/admin/delete_article_modal';
import Article from './components/article/article';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import CommentModal from './components/comment/comment_modal';
import EditModal from './components/comment/edit_modal';
import DeleteCommentModal from './components/comment/delete_comment_modal';
import AskQuestion from './components/question/ask_question';
import requireAuth from './components/auth/requireAuth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const history = createBrowserHistory();

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App>
        <Switch>
          <Route path='/article/:id' component={Article} />
          <Route path='/addcomment' component={requireAuth(CommentModal)} />
          <Route path='/editcomment/:id' component={EditModal} />
          <Route path='/replytocomment/:id' component={CommentModal} />
          <Route path='/deletecomment/:id' component={DeleteCommentModal} />
          <Route path='/editarticle/:id' component={EditArticleModal} />
          <Route path='/deletearticle/:id' component={DeleteArticleModal} />
          <Route path='/reviews' component={ReviewsPage} />
          <Route path='/questions' component={QuestionsPage} />
          <Route path='/askquestion' component={requireAuth(AskQuestion)} />
          <Route path='/admin' component={requireAuth(AdminPage)} />
          <Route path='/search' component={SearchPage} />
          <Route path='/about' component={About} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/' component={PostsPage} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
, document.querySelector('.main'));
