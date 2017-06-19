import React, { Component, PropTypes } from 'react';
import SearchForm from './search_form';
import ReviewSidebar from '../review/review_sidebar';
import QuestionSideBar from '../question/question_sidebar';
import PostSidebar from '../post/post_sidebar';

export default class SearchPage extends Component {

  render() {
    return (
      <div className='row'>
        <div className='col-sm-8  page_list'>
          <div className='page_header_content'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='page_header_title'><h1>Search</h1></div>
              </div>
            </div>
          </div>
          <hr className='color_bar' />
          <SearchForm />
        </div>
        <div className='col-sm-4 side_bar'>
          <PostSidebar />
          <ReviewSidebar />
          <QuestionSideBar />
        </div>
      </div>
    );
  }
}
