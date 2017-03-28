import React, { Component } from 'react';
import PostList from './posts_list';
import ReviewSidebar from './review_sidebar';

export default class PostsPage extends Component {
  render() {
    return (
      <div>
        <PostList />
        <ReviewSidebar />
      </div>
    );
  }
}