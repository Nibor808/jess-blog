// for server side routing if I can get it to work :)
// import React from 'react';
// import { Route, IndexRoute } from 'react-router';
// import App from '../client/components/app';
// import Landing from '../client/components/landing';
// import Post from '../client/components/post';
// import Review from '../client/components/review';
// import Signup from '../client/components/auth/signup';
// import Signin from '../client/components/auth/signin';
// import AddComment from '../client/components/addComment';
// import requireAuth from '../client/components/auth/requireAuth';

// module.exports = (
//   <Route path='/' component={App}>
//     <IndexRoute component={Landing} />
//     <Route path='/post/:id' component={Post}>
//       <Route path='/signin_post' component={Signin} />
//       <Route path='/signup_post' component={Signup} />
//       <Route path='/addcomment_post' component={requireAuth(AddComment)} />
//     </Route>
//     <Route path='/review/:id' component={Review}>
//       <Route path='/signin_review' component={Signin} />
//       <Route path='/signup_review' component={Signup} />
//       <Route path='/addcomment_review' component={requireAuth(AddComment)} />
//     </Route>
//   </Route>
// )