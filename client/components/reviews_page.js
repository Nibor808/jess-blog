import React, { Component } from 'react';
import ReviewList from './review/review_list';
import PostSidebar from './post/post_sidebar';
import QuestionSideBar from './question/question_sidebar';

export default class ReviewsPage extends Component {

  render() {
    return (
      <div className='col-md-12 page'>
        <div className='col-md-8 page_list'>
          <div className='page_header_content'>
            <div className='row'>
              <div className='col-md-8 page_header_title'><h2>Reviews</h2></div>
            </div>
            <div className='row'>
              <p>Yay reviews are awsome and you should read them all?</p>
            </div>
          </div>
          <hr className='color_bar' />
          <ReviewList />
        </div>
        <div className='col-md-4 side_bar'>
          <PostSidebar />
          <QuestionSideBar />
        </div>
      </div>
    );
  }
}