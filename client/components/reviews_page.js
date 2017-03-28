import React, { Component } from 'react';
import ReviewList from './review_list';
import PostSidebar from './post_sidebar';

export default class ReviewsPage extends Component {

  render() {
    return (
      <div>
        <ReviewList />
        <PostSidebar />
      </div>
    );
  }
}