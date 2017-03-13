import React, { Component } from 'react';
import PostList from './posts_list';
import ReviewList from './review_list';

export default class Landing extends Component {

  render() {
    return (
      <div className='landing_main'>
        <PostList />
        <ReviewList />
      </div>
    );
  }
}