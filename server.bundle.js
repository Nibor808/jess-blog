/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var AUTH_USER = exports.AUTH_USER = 'AUTH_USER';
var UNAUTH_USER = exports.UNAUTH_USER = 'UNAUTH_USER';
var AUTH_ERROR = exports.AUTH_ERROR = 'AUTH_ERROR';
var GET_POSTS = exports.GET_POSTS = 'GET_POSTS';
var GET_POST = exports.GET_POST = 'GET_POST';
var GET_REVIEWS = exports.GET_REVIEWS = 'GET_REVIEWS';
var GET_REVIEW = exports.GET_REVIEW = 'GET_REVIEW';
var SAVE_COMMENT = exports.SAVE_COMMENT = 'SAVE_COMMENT';
var RESET_COMMENT_STATE = exports.RESET_COMMENT_STATE = 'RESET_COMMENT_STATE';
var ERROR = exports.ERROR = 'ERROR';

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  formatDate: function formatDate(date) {
    return date.substring(0, date.length - 9);
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
	"DB_HOST": "127.0.0.1",
	"DB_USER": "root",
	"DB_PASS": "",
	"DB_NAME": "jessblog",
	"JWT_SECRET": "kwCOHWE893OIooewc",
	"MAIL_PASS": "Austen90",
	"MAIL_USER": "jessica.e.austen@gmail.com",
	"ROOT_URL": "http://localhost:3000"
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var knex = __webpack_require__(52);
var config = __webpack_require__(45);

module.exports = knex(config);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("redux-form");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupUser = signupUser;
exports.signinUser = signinUser;
exports.signoutUser = signoutUser;
exports.authError = authError;

var _axios = __webpack_require__(7);

var _axios2 = _interopRequireDefault(_axios);

var _reactRouter = __webpack_require__(2);

var _types = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signupUser(_ref) {
  var email = _ref.email,
      password = _ref.password,
      username = _ref.username;

  return function (dispatch) {
    _axios2.default.post('/signup', { email: email, password: password, username: username }).then(function (response) {
      dispatch({
        type: _types.AUTH_USER,
        payload: response.data.username
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.username);
      _reactRouter.browserHistory.goBack();
    }).catch(function (_ref2) {
      var response = _ref2.response;

      dispatch(authError(response.data.error));
    });
  };
}

function signinUser(_ref3) {
  var email = _ref3.email,
      password = _ref3.password;

  return function (dispatch) {
    _axios2.default.post('/signin', { email: email, password: password }).then(function (response) {
      dispatch({
        type: _types.AUTH_USER,
        payload: response.data.username
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.username);
    }).catch(function () {
      dispatch(authError('Incorrect login info'));
    });
  };
}

function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  return {
    type: _types.UNAUTH_USER
  };
}

function authError(error) {
  return {
    type: _types.AUTH_ERROR,
    payload: error
  };
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllPosts = getAllPosts;
exports.getPost = getPost;

var _axios = __webpack_require__(7);

var _axios2 = _interopRequireDefault(_axios);

var _types = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllPosts() {
  return function (dispatch) {
    _axios2.default.get('/posts').then(function (response) {
      dispatch({
        type: _types.GET_POSTS,
        payload: response.data.ok
      });
    }).catch(function (error) {
      dispatch({
        type: _types.ERROR,
        payload: error
      });
    });
  };
}

function getPost(id) {
  return function (dispatch) {
    _axios2.default.get('/post/' + id).then(function (response) {
      dispatch({
        type: _types.GET_POST,
        payload: response.data.ok
      });
    }).catch(function (error) {
      dispatch({
        type: _types.ERROR,
        payload: error
      });
    });
  };
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllReviews = getAllReviews;
exports.getReview = getReview;

var _axios = __webpack_require__(7);

var _axios2 = _interopRequireDefault(_axios);

var _types = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllReviews() {
  return function (dispatch) {
    _axios2.default.get('/reviews').then(function (response) {
      dispatch({
        type: _types.GET_REVIEWS,
        payload: response.data.ok
      });
    }).catch(function (error) {
      dispatch({
        type: _types.ERROR,
        payload: error
      });
    });
  };
}

function getReview(id) {
  return function (dispatch) {
    _axios2.default.get('/review/' + id).then(function (response) {
      dispatch({
        type: _types.GET_REVIEW,
        payload: response.data.ok
      });
    }).catch(function (error) {
      dispatch({
        type: _types.ERROR,
        payload: error
      });
    });
  };
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderComments = renderComments;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _date_format = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderComments(commentData) {
  var commentDate = (0, _date_format.formatDate)(commentData.commentCreatedAt);

  return _react2.default.createElement(
    'li',
    {
      key: commentData.commentId,
      className: 'comment_item' },
    _react2.default.createElement(
      'h4',
      null,
      commentData.commentTitle
    ),
    _react2.default.createElement(
      'p',
      null,
      commentData.commentContent
    ),
    _react2.default.createElement(
      'small',
      null,
      'posted: ',
      commentDate,
      ' by: ',
      commentData.username
    ),
    _react2.default.createElement('hr', null)
  );
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(10);

var _posts_reducer = __webpack_require__(43);

var _posts_reducer2 = _interopRequireDefault(_posts_reducer);

var _reviews_reducer = __webpack_require__(44);

var _reviews_reducer2 = _interopRequireDefault(_reviews_reducer);

var _auth_reducer = __webpack_require__(41);

var _auth_reducer2 = _interopRequireDefault(_auth_reducer);

var _comment_reducer = __webpack_require__(42);

var _comment_reducer2 = _interopRequireDefault(_comment_reducer);

var _reduxForm = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  posts: _posts_reducer2.default,
  reviews: _reviews_reducer2.default,
  comments: _comment_reducer2.default,
  auth: _auth_reducer2.default,
  form: _reduxForm.reducer
});

exports.default = rootReducer;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PostsController = __webpack_require__(46);
var passport = __webpack_require__(8);

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.get('/posts', PostsController.getAllPosts);
  app.get('/post/:id', PostsController.getPost);
  app.post('/savepost', PostsController.savePost);
  app.post('/updatepost/:id', PostsController.updatePost);
  app.post('/deletepost/:id', PostsController.deletePost);
  app.post('/savepostcomment', requireAuth, PostsController.savePostComment);
  app.post('/deletepostcomment/:id', PostsController.deletePostComment);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ReviewController = __webpack_require__(47);
var passport = __webpack_require__(8);

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.get('/reviews', ReviewController.getAllReviews);
  app.get('/review/:id', ReviewController.getReview);
  app.post('/savereview', ReviewController.saveReview);
  app.post('/updatereview/:id', ReviewController.updateReview);
  app.post('/deletereview/:id', ReviewController.deleteReview);
  app.post('/savereviewcomment', requireAuth, ReviewController.saveReviewComment);
  app.post('/deletereviewcomment/:id', ReviewController.deleteReviewComment);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(2);

var _app = __webpack_require__(31);

var _app2 = _interopRequireDefault(_app);

var _landing = __webpack_require__(36);

var _landing2 = _interopRequireDefault(_landing);

var _post = __webpack_require__(37);

var _post2 = _interopRequireDefault(_post);

var _review = __webpack_require__(39);

var _review2 = _interopRequireDefault(_review);

var _signup = __webpack_require__(34);

var _signup2 = _interopRequireDefault(_signup);

var _signin = __webpack_require__(33);

var _signin2 = _interopRequireDefault(_signin);

var _addComment = __webpack_require__(30);

var _addComment2 = _interopRequireDefault(_addComment);

var _requireAuth = __webpack_require__(32);

var _requireAuth2 = _interopRequireDefault(_requireAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _app2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _landing2.default }),
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/post/:id', component: _post2.default },
    _react2.default.createElement(_reactRouter.Route, { path: '/signin_post', component: _signin2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/signup_post', component: _signup2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/addcomment_post', component: (0, _requireAuth2.default)(_addComment2.default) })
  ),
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/review/:id', component: _review2.default },
    _react2.default.createElement(_reactRouter.Route, { path: '/signin_review', component: _signin2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/signup_review', component: _signup2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/addcomment_review', component: (0, _requireAuth2.default)(_addComment2.default) })
  )
);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var UserController = __webpack_require__(48);
__webpack_require__(49);
var passport = __webpack_require__(8);

var requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/users', UserController.getUsers);
  app.get('/user/:id', UserController.getUser);
  app.post('/signup', UserController.signupUser);
  app.post('/signin', requireSignin, UserController.signinUser);
  app.post('/deleteuser/:id', UserController.deleteUser);
  app.post('/passreset', UserController.passwordReset);
  app.post('passresetlink/:token/:user', UserController.passResetLink);
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveComment = saveComment;

var _axios = __webpack_require__(7);

var _axios2 = _interopRequireDefault(_axios);

var _types = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveComment(_ref) {
  var id = _ref.id,
      isReview = _ref.isReview,
      isPost = _ref.isPost,
      user = _ref.user,
      title = _ref.title,
      content = _ref.content;

  if (isPost) {
    return function (dispatch) {
      _axios2.default.defaults.headers['authorization'] = localStorage.getItem('token');
      _axios2.default.post('/savepostcomment', { id: id, user: user, title: title, content: content }).then(function (response) {
        dispatch({
          type: _types.SAVE_COMMENT
        });
      }).then(function () {
        dispatch({
          type: _types.RESET_COMMENT_STATE
        });
      }).catch(function (_ref2) {
        var response = _ref2.response;

        dispatch({
          type: _types.ERROR,
          payload: response.data.error
        });
      });
    };
  }
  if (isReview) {
    return function (dispatch) {
      _axios2.default.defaults.headers['authorization'] = localStorage.getItem('token');
      _axios2.default.post('/savereviewcomment', { id: id, user: user, title: title, content: content }).then(function (response) {
        dispatch({
          type: _types.SAVE_COMMENT
        });
      }).then(function () {
        dispatch({
          type: _types.RESET_COMMENT_STATE
        });
      }).catch(function (_ref3) {
        var response = _ref3.response;

        dispatch({
          type: _types.ERROR,
          payload: response.data.error
        });
      });
    };
  }
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(9);

var _reactRedux = __webpack_require__(1);

var _comment_actions = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderField = function renderField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      type = _ref.type,
      textarea = _ref.textarea,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;

  var textareaType = _react2.default.createElement('textarea', _extends({}, input, { type: type, className: 'form-control' }));
  var inputType = _react2.default.createElement('input', _extends({}, input, { type: type, className: 'form-control' }));

  return _react2.default.createElement(
    'div',
    { className: 'form-group' },
    _react2.default.createElement(
      'label',
      null,
      label
    ),
    _react2.default.createElement(
      'div',
      null,
      textarea ? textareaType : inputType,
      touched && error ? _react2.default.createElement(
        'span',
        { className: 'text-danger' },
        error
      ) : ''
    )
  );
};

var AddComment = function (_Component) {
  _inherits(AddComment, _Component);

  function AddComment() {
    _classCallCheck(this, AddComment);

    return _possibleConstructorReturn(this, (AddComment.__proto__ || Object.getPrototypeOf(AddComment)).apply(this, arguments));
  }

  _createClass(AddComment, [{
    key: 'handleFormSubmit',
    value: function handleFormSubmit(_ref2) {
      var title = _ref2.title,
          content = _ref2.content;

      var user = localStorage.getItem('user');

      if (this.props.post_id === undefined) {
        var id = this.props.review_id;
        var isReview = true;
        var isPost = false;
        this.props.saveComment({ id: id, isReview: isReview, isPost: isPost, user: user, title: title, content: content });
      } else {
        var _id = this.props.post_id;
        var _isPost = true;
        var _isReview = false;
        this.props.saveComment({ id: _id, isReview: _isReview, isPost: _isPost, user: user, title: title, content: content });
      }
    }
  }, {
    key: 'renderAlert',
    value: function renderAlert() {
      if (this.props.errorMessage) {
        return _react2.default.createElement(
          'div',
          { className: 'alert alert-danger' },
          this.props.errorMessage
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.didSave) {
        this.context.router.goBack();
      }

      var _props = this.props,
          handleSubmit = _props.handleSubmit,
          submitting = _props.submitting;

      return _react2.default.createElement(
        'form',
        { onSubmit: handleSubmit(this.handleFormSubmit.bind(this)), className: 'comment_form' },
        _react2.default.createElement(_reduxForm.Field, { name: 'title', type: 'text', component: renderField, label: 'Title: (optional)' }),
        _react2.default.createElement(_reduxForm.Field, { name: 'content', type: 'textarea', component: renderField, label: 'Comment:', textarea: true }),
        this.renderAlert(),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-default', type: 'button', onClick: this.context.router.goBack },
          'cancel'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-default pull-right', type: 'submit', disabled: submitting },
          'add comment'
        )
      );
    }
  }]);

  return AddComment;
}(_react.Component);

AddComment.propTypes = {
  input: _react.PropTypes.element,
  label: _react.PropTypes.string,
  type: _react.PropTypes.string,
  meta: _react.PropTypes.object,
  post_id: _react.PropTypes.number,
  saveComment: _react.PropTypes.func,
  errorMessage: _react.PropTypes.string,
  didSave: _react.PropTypes.bool,
  handleSubmit: _react.PropTypes.func,
  submitting: _react.PropTypes.bool,
  review_id: _react.PropTypes.number
};
AddComment.contextTypes = {
  router: _react.PropTypes.object
};


function validate(values) {
  var errors = {};

  if (!values.content) {
    errors.content = 'Please enter a comment';
  }
}

function mapStateToProps(_ref3) {
  var posts = _ref3.posts,
      reviews = _ref3.reviews,
      comments = _ref3.comments;

  if (posts.post) {
    return {
      post_id: posts.post.postId,
      didSave: comments.commentSaved,
      errorMessage: comments.error
    };
  }
  if (reviews.review) {
    return {
      review_id: reviews.review.reviewId,
      didSave: comments.commentSaved,
      errorMessage: comments.error
    };
  }
}

AddComment = (0, _reduxForm.reduxForm)({
  form: 'add comment',
  validate: validate
})(AddComment);

exports.default = (0, _reactRedux.connect)(mapStateToProps, { saveComment: _comment_actions.saveComment })(AddComment);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _header = __webpack_require__(35);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'h1',
          { className: 'logo' },
          'Jess\' Blog'
        ),
        _react2.default.createElement(_header2.default, null),
        this.props.children
      );
    }
  }]);

  return App;
}(_react.Component);

App.propTypes = {
  children: _react.PropTypes.any
};
exports.default = App;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (ComposedComponent) {
  var Authentication = function (_Component) {
    _inherits(Authentication, _Component);

    function Authentication() {
      _classCallCheck(this, Authentication);

      return _possibleConstructorReturn(this, (Authentication.__proto__ || Object.getPrototypeOf(Authentication)).apply(this, arguments));
    }

    _createClass(Authentication, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (!this.props.authenticated) {
          this.context.router.goBack();
        }
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate() {
        if (!nextProps.authenticated) {
          this.context.router.goBack();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ComposedComponent, this.props);
      }
    }]);

    return Authentication;
  }(_react.Component);

  Authentication.propTypes = {
    authenticated: _react.PropTypes.bool
  };
  Authentication.contextTypes = {
    router: _react.PropTypes.object
  };


  function mapStateToProps(_ref) {
    var auth = _ref.auth;

    return {
      authenticated: auth.authenticated
    };
  }

  return (0, _reactRedux.connect)(mapStateToProps)(Authentication);
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(9);

var _reactRouter = __webpack_require__(2);

var _reactRedux = __webpack_require__(1);

var _user_actions = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signin = function (_Component) {
  _inherits(Signin, _Component);

  function Signin() {
    _classCallCheck(this, Signin);

    return _possibleConstructorReturn(this, (Signin.__proto__ || Object.getPrototypeOf(Signin)).apply(this, arguments));
  }

  _createClass(Signin, [{
    key: 'handleFormSubmit',
    value: function handleFormSubmit(_ref) {
      var email = _ref.email,
          password = _ref.password;

      this.props.signinUser({ email: email, password: password });
    }
  }, {
    key: 'renderAlert',
    value: function renderAlert() {
      if (this.props.errorMessage) {
        return _react2.default.createElement(
          'div',
          { className: 'alert alert-danger' },
          this.props.errorMessage
        );
      }
      if (this.props.authenticated) {
        this.context.router.goBack();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var handleSubmit = this.props.handleSubmit;


      return _react2.default.createElement(
        'div',
        { className: 'signin_div' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'form',
            { onSubmit: handleSubmit(this.handleFormSubmit.bind(this)), className: 'signin_form' },
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'email' },
                'Email'
              ),
              _react2.default.createElement(_reduxForm.Field, { name: 'email', component: 'input', type: 'email', className: 'form-control' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'password' },
                'Password:'
              ),
              _react2.default.createElement(_reduxForm.Field, { name: 'password', component: 'input', type: 'password', className: 'form-control' })
            ),
            this.renderAlert(),
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'btn btn-default', onClick: this.context.router.goBack },
              'cancel'
            ),
            _react2.default.createElement(
              'button',
              { type: 'submit', className: 'btn btn-default pull-right' },
              'sign in'
            )
          )
        )
      );
    }
  }]);

  return Signin;
}(_react.Component);

Signin.propTypes = {
  signinUser: _react.PropTypes.func,
  errorMessage: _react.PropTypes.string,
  authenticated: _react.PropTypes.bool,
  handleSubmit: _react.PropTypes.func
};
Signin.contextTypes = {
  router: _react.PropTypes.object
};


function mapStateToProps(_ref2) {
  var auth = _ref2.auth;

  return {
    errorMessage: auth.error,
    authenticated: auth.authenticated
  };
}

Signin = (0, _reduxForm.reduxForm)({
  form: 'sign in'
})(Signin);

exports.default = (0, _reactRedux.connect)(mapStateToProps, { signinUser: _user_actions.signinUser })(Signin);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(9);

var _reactRedux = __webpack_require__(1);

var _user_actions = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderField = function renderField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      type = _ref.type,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;

  return _react2.default.createElement(
    'div',
    { className: 'form-group' },
    _react2.default.createElement(
      'label',
      null,
      label
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', _extends({}, input, { type: type, className: 'form-control' })),
      touched && error ? _react2.default.createElement(
        'span',
        { className: 'text-danger' },
        error
      ) : ''
    )
  );
};

var Signup = function (_Component) {
  _inherits(Signup, _Component);

  function Signup() {
    _classCallCheck(this, Signup);

    return _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).apply(this, arguments));
  }

  _createClass(Signup, [{
    key: 'handleFormSubmit',
    value: function handleFormSubmit(values) {
      this.props.signupUser(values);
    }
  }, {
    key: 'renderAlert',
    value: function renderAlert() {
      if (this.props.errorMessage) {
        return _react2.default.createElement(
          'div',
          { className: 'alert alert-danger' },
          this.props.errorMessage
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          handleSubmit = _props.handleSubmit,
          submitting = _props.submitting;

      return _react2.default.createElement(
        'form',
        { onSubmit: handleSubmit(this.handleFormSubmit.bind(this)), className: 'signup_form' },
        _react2.default.createElement(_reduxForm.Field, { name: 'email', type: 'email', component: renderField, label: 'Email:' }),
        _react2.default.createElement(_reduxForm.Field, { name: 'username', type: 'text', component: renderField, label: 'Username:' }),
        _react2.default.createElement(_reduxForm.Field, { name: 'password', type: 'password', component: renderField, label: 'Password:' }),
        _react2.default.createElement(_reduxForm.Field, { name: 'passwordConfirm', type: 'password', component: renderField, label: 'Confirm Password:' }),
        this.renderAlert(),
        _react2.default.createElement(
          'button',
          { type: 'button', className: 'btn btn-default', onClick: this.context.router.goBack },
          'cancel'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-default pull-right', type: 'submit', disabled: submitting },
          'sign up'
        )
      );
    }
  }]);

  return Signup;
}(_react.Component);

Signup.propTypes = {
  input: _react.PropTypes.element,
  label: _react.PropTypes.string,
  type: _react.PropTypes.string,
  meta: _react.PropTypes.object,
  submitting: _react.PropTypes.bool
};
Signup.contextTypes = {
  router: _react.PropTypes.object
};
Signup.propTypes = {
  signupUser: _react.PropTypes.func,
  errorMessage: _react.PropTypes.string,
  handleSubmit: _react.PropTypes.func
};


function validate(values) {
  var errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required';
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(_ref2) {
  var auth = _ref2.auth;

  return {
    errorMessage: auth.error
  };
}

Signup = (0, _reduxForm.reduxForm)({
  form: 'sign up',
  validate: validate
})(Signup);

exports.default = (0, _reactRedux.connect)(mapStateToProps, { signupUser: _user_actions.signupUser })(Signup);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(2);

var _user_actions = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'renderNavRight',
    value: function renderNavRight() {
      var user = localStorage.getItem('user');
      if (this.props.authenticated) {
        return _react2.default.createElement(
          'div',
          { className: 'signout_div' },
          'signed in as: ',
          user ? user : this.props.user,
          _react2.default.createElement(
            'button',
            { className: 'btn btn-default signout_btn', onClick: this.props.signoutUser },
            'sign out'
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'nav',
        { className: 'navbar navbar-default' },
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'div',
            { className: 'navbar-header' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#main-nav', 'aria-expanded': 'false' },
              _react2.default.createElement(
                'span',
                { className: 'sr-only' },
                'Toggle navigation'
              ),
              _react2.default.createElement('span', { className: 'icon-bar' }),
              _react2.default.createElement('span', { className: 'icon-bar' }),
              _react2.default.createElement('span', { className: 'icon-bar' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'collapse navbar-collapse', id: 'main-nav' },
            _react2.default.createElement(
              'ul',
              { className: 'nav navbar-nav' },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/' },
                  'Home'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '!#' },
                  'Reviews'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '!#' },
                  'Q&A'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'nav navbar-nav navbar-right' },
              this.renderNavRight()
            )
          )
        )
      );
    }
  }]);

  return Header;
}(_react.Component);

Header.propTypes = {
  authenticated: _react.PropTypes.bool,
  user: _react.PropTypes.string,
  signoutUser: _react.PropTypes.func
};


function mapStateToProps(_ref) {
  var auth = _ref.auth;

  return {
    authenticated: auth.authenticated,
    user: auth.user
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { signoutUser: _user_actions.signoutUser })(Header);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _posts_list = __webpack_require__(38);

var _posts_list2 = _interopRequireDefault(_posts_list);

var _review_list = __webpack_require__(40);

var _review_list2 = _interopRequireDefault(_review_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Landing = function (_Component) {
  _inherits(Landing, _Component);

  function Landing() {
    _classCallCheck(this, Landing);

    return _possibleConstructorReturn(this, (Landing.__proto__ || Object.getPrototypeOf(Landing)).apply(this, arguments));
  }

  _createClass(Landing, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'landing_main' },
        _react2.default.createElement(_posts_list2.default, null),
        _react2.default.createElement(_review_list2.default, null)
      );
    }
  }]);

  return Landing;
}(_react.Component);

exports.default = Landing;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(2);

var _redux = __webpack_require__(10);

var _post_actions = __webpack_require__(12);

var _date_format = __webpack_require__(4);

var _comments = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Post = function (_Component) {
  _inherits(Post, _Component);

  function Post() {
    _classCallCheck(this, Post);

    return _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).apply(this, arguments));
  }

  _createClass(Post, [{
    key: 'handleProp',
    value: function handleProp() {
      this.forceUpdate();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getPost(this.props.params.id);
      addEventListener('popstate', this.handleProp);
    }
  }, {
    key: 'renderSignin',
    value: function renderSignin() {
      if (!this.props.authenticated) {
        return _react2.default.createElement(
          'div',
          { className: 'col-md-6' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/signin_post', className: 'pull-right comment_login' },
            _react2.default.createElement(
              'button',
              { className: 'btn btn-default' },
              'sign in to comment'
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'col-md-6' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/addcomment_post', className: 'pull-right comment_login' },
            _react2.default.createElement(
              'button',
              { className: 'btn btn-default' },
              'add a comment'
            )
          )
        );
      }
    }
  }, {
    key: 'renderSignup',
    value: function renderSignup() {
      if (!this.props.authenticated) {
        return _react2.default.createElement(
          'div',
          { className: 'signup_prompt text-center' },
          _react2.default.createElement(
            'h3',
            null,
            'Not already part of the converstation?'
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/signup_post' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'btn btn-primary' },
              'sign up'
            )
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.post) {
        return _react2.default.createElement(
          'div',
          null,
          'Loading...'
        );
      }

      var postDate = (0, _date_format.formatDate)(this.props.post.createdAt);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          {
            key: this.props.post.postId,
            className: 'post_item' },
          _react2.default.createElement(
            'h1',
            null,
            this.props.post.postTitle
          ),
          _react2.default.createElement(
            'small',
            null,
            'posted: ',
            postDate
          ),
          _react2.default.createElement(
            'p',
            null,
            this.props.post.postContent
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'comments_section col-md-6' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-6' },
              _react2.default.createElement(
                'h3',
                null,
                'Comments:'
              )
            ),
            this.renderSignin()
          ),
          _react2.default.createElement(
            'ul',
            { className: 'comments_list' },
            this.props.post.comments.map(function (comment) {
              return (0, _comments.renderComments)(comment);
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-md-5 col-md-offset-1 auth_children' },
          this.props.children,
          this.renderSignup()
        )
      );
    }
  }]);

  return Post;
}(_react.Component);

Post.propTypes = {
  getPost: _react.PropTypes.func,
  post: _react.PropTypes.object,
  params: _react.PropTypes.object,
  id: _react.PropTypes.number,
  authenticated: _react.PropTypes.bool
};
Post.contextTypes = {
  router: _react.PropTypes.object
};


function mapStateToProps(_ref) {
  var posts = _ref.posts,
      auth = _ref.auth,
      comments = _ref.comments;

  return {
    post: posts.post,
    authenticated: auth.authenticated,
    didSave: comments.commentSaved
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { getPost: _post_actions.getPost })(Post);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _post_actions = __webpack_require__(12);

var _reactRouter = __webpack_require__(2);

var _date_format = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostsList = function (_Component) {
  _inherits(PostsList, _Component);

  function PostsList() {
    _classCallCheck(this, PostsList);

    return _possibleConstructorReturn(this, (PostsList.__proto__ || Object.getPrototypeOf(PostsList)).apply(this, arguments));
  }

  _createClass(PostsList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getAllPosts();
    }
  }, {
    key: 'renderPosts',
    value: function renderPosts(postData) {
      var content = postData.content.substring(0, 250);
      var postDate = (0, _date_format.formatDate)(postData.createdAt);
      return _react2.default.createElement(
        'div',
        {
          key: postData.id,
          className: 'post_item' },
        _react2.default.createElement(
          _reactRouter.Link,
          { className: 'posts_link', to: 'post/' + postData.id },
          _react2.default.createElement(
            'h2',
            null,
            postData.title
          )
        ),
        _react2.default.createElement(
          'small',
          null,
          postDate
        ),
        _react2.default.createElement(
          'p',
          { className: 'post_content' },
          content,
          '...'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'col-md-8 post_list_item' },
        this.props.allPosts.map(this.renderPosts)
      );
    }
  }]);

  return PostsList;
}(_react.Component);

PostsList.propTypes = {
  allPosts: _react.PropTypes.array,
  getAllPosts: _react.PropTypes.func
};


function mapStateToProps(_ref) {
  var posts = _ref.posts;

  return {
    allPosts: posts.allPosts
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { getAllPosts: _post_actions.getAllPosts })(PostsList);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _date_format = __webpack_require__(4);

var _review_actions = __webpack_require__(13);

var _comments = __webpack_require__(14);

var _reactRouter = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Review = function (_Component) {
  _inherits(Review, _Component);

  function Review() {
    _classCallCheck(this, Review);

    return _possibleConstructorReturn(this, (Review.__proto__ || Object.getPrototypeOf(Review)).apply(this, arguments));
  }

  _createClass(Review, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getReview(this.props.params.id);
    }
  }, {
    key: 'renderSignin',
    value: function renderSignin() {
      if (!this.props.authenticated) {
        return _react2.default.createElement(
          'div',
          { className: 'col-md-6' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/signin_review', className: 'pull-right comment_login' },
            _react2.default.createElement(
              'button',
              { className: 'btn btn-default' },
              'sign in to comment'
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'col-md-6' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/addcomment_review', className: 'pull-right comment_login' },
            _react2.default.createElement(
              'button',
              { className: 'btn btn-default' },
              'add a comment'
            )
          )
        );
      }
    }
  }, {
    key: 'renderSignup',
    value: function renderSignup() {
      if (!this.props.authenticated) {
        return _react2.default.createElement(
          'div',
          { className: 'signup_prompt text-center' },
          _react2.default.createElement(
            'h3',
            null,
            'Not already part of the converstation?'
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/signup_review' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'btn btn-primary' },
              'sign up'
            )
          )
        );
      }
    }
  }, {
    key: 'renderSpecs',
    value: function renderSpecs(specs) {
      var specsList = [];

      for (var item in specs) {
        if (specs.hasOwnProperty(item)) {
          var formattedItem = item.replace(new RegExp('_', 'g'), ' ');
          specsList.push(formattedItem + ': ' + specs[item]);
        }
      }
      return specsList.map(function (spec, index) {
        return _react2.default.createElement(
          'li',
          { key: index },
          spec
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.review) {
        return _react2.default.createElement(
          'div',
          null,
          'Loading...'
        );
      }
      var reviewDate = (0, _date_format.formatDate)(this.props.review.createdAt);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          {
            key: this.props.review.reviewId,
            className: 'review_item col-md-12' },
          _react2.default.createElement(
            'h1',
            null,
            this.props.review.reviewTitle
          ),
          _react2.default.createElement(
            'small',
            null,
            'posted: ',
            reviewDate
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-6' },
              _react2.default.createElement(
                'h3',
                null,
                'Pros'
              ),
              _react2.default.createElement(
                'p',
                null,
                this.props.review.pros
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-md-6' },
              _react2.default.createElement(
                'h3',
                null,
                'Cons'
              ),
              _react2.default.createElement(
                'p',
                null,
                this.props.review.cons
              )
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            this.props.review.reviewContent
          ),
          _react2.default.createElement(
            'h3',
            null,
            'Specs'
          ),
          _react2.default.createElement(
            'ul',
            { className: 'col-md-12 specs_list' },
            this.renderSpecs(this.props.review.specs)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'comments_section col-md-6' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-6' },
              _react2.default.createElement(
                'h3',
                null,
                'Comments:'
              )
            ),
            this.renderSignin()
          ),
          _react2.default.createElement(
            'ul',
            { className: 'comments_list' },
            this.props.review.comments.map(function (comment) {
              return (0, _comments.renderComments)(comment);
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-md-4' },
          this.props.children,
          this.renderSignup()
        )
      );
    }
  }]);

  return Review;
}(_react.Component);

Review.propTypes = {
  getReview: _react.PropTypes.func,
  params: _react.PropTypes.object,
  id: _react.PropTypes.number,
  review: _react.PropTypes.object,
  authenticated: _react.PropTypes.bool
};


function mapStateToProps(_ref) {
  var reviews = _ref.reviews,
      auth = _ref.auth;

  return {
    review: reviews.review,
    authenticated: auth.authenticated
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { getReview: _review_actions.getReview })(Review);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _review_actions = __webpack_require__(13);

var _reactRouter = __webpack_require__(2);

var _date_format = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReviewList = function (_Component) {
  _inherits(ReviewList, _Component);

  function ReviewList() {
    _classCallCheck(this, ReviewList);

    return _possibleConstructorReturn(this, (ReviewList.__proto__ || Object.getPrototypeOf(ReviewList)).apply(this, arguments));
  }

  _createClass(ReviewList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getAllReviews();
    }
  }, {
    key: 'renderReview',
    value: function renderReview(reviewData) {
      var reviewDate = (0, _date_format.formatDate)(reviewData.createdAt);
      return _react2.default.createElement(
        'li',
        {
          key: reviewData.id,
          className: 'list-group-item' },
        _react2.default.createElement(
          _reactRouter.Link,
          { className: 'review_link', to: '/review/' + reviewData.id },
          reviewData.title
        ),
        _react2.default.createElement(
          'small',
          { className: 'pull-right' },
          reviewDate
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'ul',
        {
          className: 'list-group col-md-4 review_list' },
        _react2.default.createElement(
          'li',
          { className: 'list-group-item' },
          _react2.default.createElement(
            'h2',
            null,
            'Recent Reviews'
          )
        ),
        this.props.allReviews.map(this.renderReview)
      );
    }
  }]);

  return ReviewList;
}(_react.Component);

ReviewList.propTypes = {
  getAllReviews: _react.PropTypes.func,
  allReviews: _react.PropTypes.array
};


function mapStateToProps(_ref) {
  var reviews = _ref.reviews;

  return {
    allReviews: reviews.allReviews
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { getAllReviews: _review_actions.getAllReviews })(ReviewList);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _types.AUTH_USER:
      return _extends({}, state, { authenticated: true, user: action.payload, error: '' });
    case _types.UNAUTH_USER:
      return _extends({}, state, { authenticated: false, error: '' });
    case _types.AUTH_ERROR:
      return _extends({}, state, { error: action.payload });
  }

  return state;
};

var _types = __webpack_require__(3);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _types.SAVE_COMMENT:
      return _extends({}, state, { commentSaved: true, error: '' });
    case _types.RESET_COMMENT_STATE:
      return _extends({}, state, { commentSaved: false, error: '' });
    case _types.ERROR:
      return _extends({}, state, { commentSaved: false, error: action.payload });
  }

  return state;
};

var _types = __webpack_require__(3);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _types.GET_POSTS:
      return _extends({}, state, { allPosts: action.payload });
    case _types.GET_POST:
      return _extends({}, state, { post: action.payload });
  }

  return state;
};

var _types = __webpack_require__(3);

var INITIAL_STATE = {
  allPosts: [],
  post: null
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _types.GET_REVIEWS:
      return _extends({}, state, { allReviews: action.payload });
    case _types.GET_REVIEW:
      return _extends({}, state, { review: action.payload });
  }

  return state;
};

var _types = __webpack_require__(3);

var INITIAL_STATE = {
  allReviews: [],
  review: null
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(5),
    DB_HOST = _require.DB_HOST,
    DB_USER = _require.DB_USER,
    DB_PASS = _require.DB_PASS,
    DB_NAME = _require.DB_NAME;

module.exports = {
  client: 'mysql',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
  }
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var knex = __webpack_require__(6);
var moment = __webpack_require__(16);

module.exports = {

  //get all posts
  getAllPosts: function getAllPosts(req, res) {
    knex('Posts').select().then(function (data) {
      if (!data.length) {
        res.status(422).send({ error: 'No posts to get' });
      } else {
        data.forEach(function (item) {
          item.createdAt = moment(item.createdAt).toString();
        });
        res.send({ ok: data });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // get a post and it's corresponding comments and images as an object
  // comments added as an array
  // images added as an array
  // return the post object
  getPost: function getPost(req, res) {
    var post = {};
    var comments = [];
    var images = [];

    //get post
    knex('Posts').where('Posts.id', req.params.id).select('Posts.id as postId', 'Posts.title as postTitle', 'Posts.content as postContent', 'Posts.category as postCategory', 'Posts.keywords as postKeywords', 'Posts.createdAt as postDate').then(function (data) {
      if (!data.length) {
        res.status(422).send({ error: 'Post does not exist' });
        return;
      } else {
        data.map(function (item) {
          post.postId = item.postId;
          post.postTitle = item.postTitle;
          post.postContent = item.postContent;
          post.postCategory = item.postCategory;
          post.keywords = item.postKeywords;
          post.createdAt = moment(item.postDate).toString();
        });

        // get comments
        knex('Comments').where('Comments.post_id', req.params.id).join('Users', 'Comments.user_id', '=', 'Users.id').select('Comments.id as commentId', 'Comments.title as commentTitle', 'Comments.content as commentContent', 'Comments.createdAt as commentCreatedAt', 'Users.username as username').orderBy('createdAt', 'asc').then(function (data) {
          data.forEach(function (item) {
            item.commentCreatedAt = moment(item.commentCreatedAt).toString();
            comments.push(item);
          });
          post.comments = comments;

          // get images
          knex('Images').where('post_id', req.params.id).select().then(function (data) {
            data.forEach(function (item) {
              images.push(item);
            });
            post.images = images;
            res.send({ ok: post });
          }).catch(function (err) {
            res.status(422).send({ error: err });
          });
        }).catch(function (err) {
          res.status(422).send({ error: err });
        });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // save a post
  savePost: function savePost(req, res) {
    if (!req.body.title || !req.body.content) {
      res.status(422).send({ error: 'All posts require a title and some content' });
      return;
    }

    knex('Posts').insert({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      keywords: req.body.keywords,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }).then(function (data) {
      if (!data[0] > 0) {
        res.status(422).send({ error: 'Post was not saved' });
        return;
      } else {
        knex('Images').insert({
          post_id: data[0],
          file: req.body.imgFile
        }).then(function (data) {
          if (!data[0] > 0) {
            res.status(422).send({ error: 'Images could not be saved.' });
            return;
          } else {
            res.send({ ok: 'Post was saved' });
          }
        }).catch(function (err) {
          res.status(422).send({ error: err });
          return;
        });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
      return;
    });
  },


  //update a post
  updatePost: function updatePost(req, res) {

    knex('Posts').where('id', req.params.id).update({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      keywords: req.body.keywords
    }).then(function (data) {
      if (!data == 1) {
        res.status(422).send({ error: 'Posts does not exist.' });
      } else {
        res.send({ ok: 'Post updated' });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
      return;
    });
  },


  // delete a post, it's comments and images
  deletePost: function deletePost(req, res) {
    // first delete comments
    knex('Comments').where('post_id', req.params.id).del();
    // then delete images
    knex('Images').where('post_id', req.params.id).del();

    // then delete post
    knex('Posts').where('id', req.params.id).del().then(function (data) {
      if (!data == 1) {
        res.status(422).send({ error: 'Post does not exist.' });
        return;
      } else {
        res.send({ ok: 'Post deleted.' });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // save comments
  savePostComment: function savePostComment(req, res) {
    if (!req.body.content) {
      res.status(422).send({ error: 'You must have some content in your comment.' });
      return;
    }

    if (!req.body.id || !req.body.user) {
      res.send({ error: 'Missing data' });
    }

    //get user_id
    knex('Users').where('username', req.body.user).select('id').then(function (data) {
      // save comment
      knex('Comments').insert({
        post_id: req.body.id,
        user_id: data[0].id,
        title: req.body.title,
        content: req.body.content,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
      }).then(function (data) {
        if (!data[0] > 0) {
          res.status(422).send({ error: 'Comment was not saved.' });
        } else {
          res.send({ ok: 'Comment saved.' });
        }
      }).catch(function (err) {
        res.status(422).send({ error: err });
      });
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // delete a comment
  deletePostComment: function deletePostComment(req, res) {
    knex('Comments').where('id', req.params.id).del().then(function (data) {
      if (!data == 1) {
        res.status(422).send({ error: 'Comment does not exist.' });
      } else {
        res.send({ ok: 'Comment deleted.' });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  }
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var knex = __webpack_require__(6);
var moment = __webpack_require__(16);

module.exports = {

  //get all reviews
  getAllReviews: function getAllReviews(req, res) {
    knex('Reviews').select().then(function (data) {
      if (!data.length) {
        res.status(422).send({ error: 'No reviews to get' });
      } else {
        data.forEach(function (item) {
          item.createdAt = moment(item.createdAt).toString();
        });
        res.send({ ok: data });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // get a review and it's corresponding comments and images as an object
  // comments added as an array
  // images added as an array
  // return the review object
  getReview: function getReview(req, res) {
    var review = {};
    var comments = [];
    var images = [];

    //get review
    knex('Reviews').where('Reviews.id', req.params.id).select('Reviews.id as reviewId', 'Reviews.title as reviewTitle', 'Reviews.content as reviewContent', 'Reviews.pros as reviewPros', 'Reviews.cons as reviewCons', 'Reviews.category as reviewCategory', 'Reviews.keywords as reviewKeywords', 'Reviews.specs as reviewSpecs', 'Reviews.createdAt as reviewDate').then(function (data) {
      if (!data.length) {
        res.status(422).send({ error: 'Review does not exist' });
        return;
      } else {
        data.map(function (item) {
          review.reviewId = item.reviewId;
          review.reviewTitle = item.reviewTitle;
          review.reviewContent = item.reviewContent;
          review.pros = item.reviewPros;
          review.cons = item.reviewCons;
          review.category = item.reviewCategory;
          review.keywords = item.reviewKeywords;
          review.specs = JSON.parse(item.reviewSpecs);
          review.createdAt = moment(item.reviewDate).toString();
        });

        // get comments
        knex('Comments').where('Comments.review_id', req.params.id).join('Users', 'Comments.user_id', '=', 'Users.id').select('Comments.id as commentId', 'Comments.title as commentTitle', 'Comments.content as commentContent', 'Comments.createdAt as commentCreatedAt', 'Users.username as username').orderBy('createdAt', 'asc').then(function (data) {
          data.forEach(function (item) {
            item.commentCreatedAt = moment(item.commentCreatedAt).toString();
            comments.push(item);
          });
          review.comments = comments;

          // get images
          knex('Images').where('review_id', req.params.id).select().then(function (data) {
            data.forEach(function (item) {
              images.push(item);
            });
            review.images = images;
            res.send({ ok: review });
          }).catch(function (err) {
            res.status(422).send({ error: err });
          });
        }).catch(function (err) {
          res.status(422).send({ error: err });
        });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // save a review
  saveReview: function saveReview(req, res) {
    if (!req.body.title || !req.body.content) {
      res.status(422).send({ error: 'All reviews require a title and some content' });
      return;
    }

    knex('Reviews').insert({
      title: req.body.title,
      content: req.body.content,
      pros: req.body.pros,
      cons: req.body.cons,
      category: req.body.category,
      keywords: req.body.keywords,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }).then(function (data) {
      if (!data[0] > 0) {
        res.status(422).send({ error: 'Review was not saved' });
        return;
      } else {
        knex('Images').insert({
          review_id: data[0],
          file: req.body.imgFile
        }).then(function (data) {
          if (!data[0] > 0) {
            res.status(422).send({ error: 'Images could not be saved.' });
            return;
          } else {
            res.send({ ok: 'Review was saved' });
          }
        }).catch(function (err) {
          res.status(422).send({ error: err });
          return;
        });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
      return;
    });
  },


  //update a review
  updateReview: function updateReview(req, res) {

    knex('Reviews').where('id', req.params.id).update({
      title: req.body.title,
      content: req.body.content,
      pros: req.body.pros,
      cons: req.body.cons,
      category: req.body.category,
      keywords: req.body.keywords
    }).then(function (data) {
      if (!data == 1) {
        res.status(422).send({ error: 'Review does not exist.' });
      } else {
        res.send({ ok: 'Review updated' });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
      return;
    });
  },


  // delete a review, it's comments and images
  deleteReview: function deleteReview(req, res) {
    // first delete comments
    knex('Comments').where('review_id', req.params.id).del();
    // then delete images
    knex('Images').where('review_id', req.params.id).del();

    // then delete review
    knex('Review').where('id', req.params.id).del().then(function (data) {
      if (!data == 1) {
        res.status(422).send({ error: 'Review does not exist.' });
        return;
      } else {
        res.send({ ok: 'Review deleted.' });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // save comments
  saveReviewComment: function saveReviewComment(req, res) {
    if (!req.body.content) {
      res.status(422).send({ error: 'You must have some content in your comment.' });
    }

    // for testing remove if block later
    if (!req.body.id || !req.body.user) {
      res.send({ error: 'Missing data' });
    }

    //get user
    knex('Users').where('username', req.body.user).select('id').then(function (data) {
      //save comment
      knex('Comments').insert({
        review_id: req.body.id,
        user_id: data[0].id,
        title: req.body.title,
        content: req.body.content,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
      }).then(function (data) {
        if (!data[0] > 0) {
          res.status(422).send({ error: 'Comment was not saved.' });
        } else {
          res.send({ ok: 'Comment saved.' });
        }
      }).catch(function (err) {
        res.status(422).send({ error: err });
      });
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // delete a comment
  deleteReviewComment: function deleteReviewComment(req, res) {
    knex('Comments').where('id', req.params.id).del().then(function (data) {
      if (!data == 1) {
        res.status(422).send({ error: 'Comment does not exist.' });
      } else {
        res.send({ ok: 'Comment deleted.' });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  }
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var knex = __webpack_require__(6);
var bcrypt = __webpack_require__(15);

var _require = __webpack_require__(5),
    JWT_SECRET = _require.JWT_SECRET,
    ROOT_URL = _require.ROOT_URL;

var JWT = __webpack_require__(51);
var sendMail = __webpack_require__(50);

function tokenForUser(userId) {
  var timestamp = new Date().getTime();
  return JWT.encode({ sub: userId, iat: timestamp }, JWT_SECRET);
}

module.exports = {

  // get all users
  getUsers: function getUsers(req, res) {
    knex('Users').select().then(function (data) {
      if (!data.length) {
        res.status(422).send({ error: 'No users no get.' });
        return;
      } else {
        res.send({ ok: data });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // get one user
  getUser: function getUser(req, res) {
    knex('Users').where('id', req.params.id).select().then(function (data) {
      if (!data.length) {
        res.status(422).send({ error: 'No such user.' });
        return;
      } else {
        res.send({ ok: data });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // sign up new user
  signupUser: function signupUser(req, res) {
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.status(422).send({ error: 'Please fill out all fields.' });
      return;
    }

    // hash password before saving
    bcrypt.hash(req.body.password, null, null, function (err, hash) {
      if (err) {
        return err;
      } else {
        req.body.password = hash;
        var email = req.body.email.toLowerCase();

        knex('Users').insert({
          email: email,
          password: req.body.password,
          username: req.body.username
        }).then(function (data) {
          if (!data[0] > 0) {
            res.status(422).send({ error: 'User was not saved.' });
            return;
          } else {
            res.send({ token: tokenForUser(data[0]), username: req.body.username });
          }
        }).catch(function () {
          res.status(422).send({ error: 'Email or Username already in use.' });
        });
      }
    });
  },


  // sign in user
  signinUser: function signinUser(req, res) {
    knex('Users').where('email', req.body.email).select('username').then(function (data) {
      res.send({ token: tokenForUser(req.user[0].id), username: data[0].username });
    });
  },


  // delete user
  deleteUser: function deleteUser(req, res) {
    //first delete any comments associated with the user
    knex('Comments').where('user_id', req.params.id).del();

    knex('Users').where('id', req.params.id).del().then(function (data) {
      if (!data == 1) {
        res.status(422).send({ error: 'User doesn\'t exist.' });
      } else {
        res.send({ ok: 'User deleted.' });
      }
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // send email for password reset
  passwordReset: function passwordReset(req, res) {
    if (!req.body.email) {
      res.status(422).send({ error: 'Please provide an email address.' });
    }

    var passResetToken = Math.random().toString(36);

    var mailData = {
      from: 'JessTech',
      to: req.body.email,
      subject: 'Password Reset',
      html: 'Follow this link to <a href=' + ROOT_URL + '/passreset/' + passResetToken + '/' + req.body.email + '>reset your password</a>.'
    };

    sendMail(mailData).then(function () {
      knex('Users').where('email', req.body.email).update({
        passResetToken: passResetToken
      }).then(function (data) {
        if (!data == 1) {
          res.status(422).send({ error: 'User with this email not found.' });
        } else {
          res.send({ ok: 'Email sent.' });
        }
      });
    }).catch(function (err) {
      res.status(422).send({ error: err });
    });
  },


  // recieve request for password reset
  // reset passResetToken to null
  passResetLink: function passResetLink(req, res) {
    knex('Users').where('email', req.params.user).select().then(function (data) {
      if (!data.length) {
        res.status(422).send({ error: 'User not found.' });
      } else if (req.params.token !== data.passResetToken) {
        res.status(422).send({ error: 'Link expired.' });
      } else {
        res.send({ ok: 'Redirect.' });
        knex('Users').where('email', req.params.user).update('passResetToken', null);
      }
    });
  }
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var passport = __webpack_require__(8);

var _require = __webpack_require__(5),
    JWT_SECRET = _require.JWT_SECRET;

var JWTStrategy = __webpack_require__(17).Strategy;
var ExtractJWT = __webpack_require__(17).ExtractJwt;
var LocalStrategy = __webpack_require__(54);
var knex = __webpack_require__(6);
var bcrypt = __webpack_require__(15);

// create local strategy for signing in
var LocalLogin = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
  knex('Users').where('email', email).select().then(function (data) {
    if (!data.length) {
      return done(null, false); // no such user
    } else {
      bcrypt.compare(password, data[0].password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        } // no password match

        return done(null, data);
      });
    }
  }).catch(function (err) {
    return done(err);
  });
});

// create JWT strategy for navigation
var JWTOpts = {
  jwtFromRequest: ExtractJWT.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
};

var JWTLogin = new JWTStrategy(JWTOpts, function (payload, done) {
  knex('Users').where('id', payload.sub).select().then(function (data) {
    if (!data.length) {
      return done(null, false);
    } else {
      return done(null, data);
    }
  }).catch(function (err) {
    return done(err);
  });
});

passport.use(JWTLogin);
passport.use(LocalLogin);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nodemailer = __webpack_require__(53);

var _require = __webpack_require__(5),
    MAIL_PASS = _require.MAIL_PASS,
    MAIL_USER = _require.MAIL_USER;

module.exports = function sendMail(mailData) {

  var smtpConfig = {
    service: 'gmail',
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS
    }
  };

  var trans = nodemailer.createTransport(smtpConfig);

  return new Promise(function (resolve, reject) {
    trans.sendMail(mailData, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("jwt-simple");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("knex");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(27);

var _reactRouter = __webpack_require__(2);

var _reduxThunk = __webpack_require__(28);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRedux = __webpack_require__(1);

var _redux = __webpack_require__(10);

var _routes = __webpack_require__(21);

var _routes2 = _interopRequireDefault(_routes);

var _reducers = __webpack_require__(18);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = __webpack_require__(26);
var morgan = __webpack_require__(25);
var express = __webpack_require__(24);
var port = process.env.PORT || 3000;
var bodyParser = __webpack_require__(23);
var postRoutes = __webpack_require__(19);
var userRoutes = __webpack_require__(22);
var reviewRoutes = __webpack_require__(20);


var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);
var store = createStoreWithMiddleware(_reducers2.default);

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('short'));

app.get('*', function (req, res) {
  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
    var appHTML = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(_reactRouter.RouterContext, props)
    ));
    res.send(appHTML);
  });
});

// postRoutes(app);
// userRoutes(app);
// reviewRoutes(app);


app.listen(port, function () {
  console.log('Listening on ' + port);
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ })
/******/ ]);