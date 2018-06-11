import './styles/styles.scss';
import './node_modules/jquery/dist/jquery.slim.min';
import './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import routes from './routes';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const middleWares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  console.log('ENV', process.env.NODE_ENV);
}

if (process.env.NODE_ENV === 'development') {
  const reduxLogger = createLogger({
    collapsed: true,
    timestamp: false
  });
  middleWares.push(reduxLogger);
}

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleWares)
  )
);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
  , document.querySelector('.main'));
