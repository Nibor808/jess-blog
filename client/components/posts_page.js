import React, { Component } from 'react';
import PostList from './post/posts_list';
import ReviewSidebar from './review/review_sidebar';
import QuestionSideBar from './question/question_sidebar';

export default class PostsPage extends Component {
  render() {
    return (
      <div>
        <PostList />
        <ReviewSidebar />
        <QuestionSideBar />
      </div>
    );
  }
}