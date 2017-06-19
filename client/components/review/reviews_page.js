import React, { Component } from 'react';
import ReviewList from './review_list';
import PostSidebar from '../post/post_sidebar';
import QuestionSideBar from '../question/question_sidebar';

export default class ReviewsPage extends Component {

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-sm-8 page_list'>
            <div className='page_header_content'>
              <div className='row'>
                <div className='page_header_title'><h1>Reviews</h1></div>
              </div>
              <div className='row'>
                <p>Yay reviews are awsome and you should read them all?</p>
              </div>
            </div>
            <hr className='color_bar' />
            <ReviewList />
          </div>
          <div className='col-sm-4 side_bar'>
            <PostSidebar />
            <QuestionSideBar />
          </div>
        </div>
      </div>
    );
  }
}
