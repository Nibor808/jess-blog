import React, { Component } from 'react';
import PostList from './posts_list';
import ReviewSidebar from '../review/review_sidebar';
import QuestionSideBar from '../question/question_sidebar';
import Carousel from '../carousel';

export default class PostPage extends Component {
  render() {
    return (
      <div>
        <div className='row'>
          <Carousel />
        </div>
        <div className='row'>
          <div className='col-sm-8 page_list'>
            <div className='page_header_content'>
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='page_header_title'><h1>Posts</h1></div>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12'>
                  <p>Yay posts are awesome and you should read them all?</p>
                </div>
              </div>
            </div>
            <hr className='color_bar' />
            <PostList />
          </div>
          <div className='col-sm-4 side_bar'>
            <ReviewSidebar />
            <QuestionSideBar />
          </div>
        </div>
      </div>
    );
  }
}
