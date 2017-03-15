import './styles/styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Landing from './components/landing';
import Post from './components/post';
import Review from './components/review';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
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
        <IndexRoute component={Landing} />
        <Route path='/post/:id' component={Post} />
        <Route path='/review/:id' component={Review} />
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
      </Route>
    </Router>
  </Provider>
, document.querySelector('.main'));