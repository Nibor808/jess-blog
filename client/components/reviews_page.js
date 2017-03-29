import React, { Component } from 'react';
import ReviewList from './review/review_list';
import PostSidebar from './post/post_sidebar';
import QuestionSideBar from './question/question_sidebar';

export default class ReviewsPage extends Component {

  render() {
    return (
      <div>
        <ReviewList />
        <PostSidebar />
        <QuestionSideBar />
      </div>
    );
  }
}