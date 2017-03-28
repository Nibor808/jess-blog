import React, { Component } from 'react';
import QuestionList from './question_list';
import PostSidebar from './post_sidebar';
import ReviewSidebar from './review_sidebar';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class QuestionsPage extends Component {

  renderSignin() {
    if (!this.props.authenticated) {
      return (
        <div>
          <Link to='/signin_question_page' className='pull-right login'>
            <button className='btn btn-default'>sign in to ask a question</button>
          </Link>
        </div>
      );
    }else {
      return (
        <div>
          <Link to='/askquestion' className='pull-right login'>
            <button className='btn btn-default'>ask a question</button>
          </Link>
        </div>
      );
    }
  }

  renderSignup() {
    if (!this.props.authenticated) {
      return (
        <div className='signup_prompt text-center'>
          <h3>Not already part of the converstation?</h3>
          <Link to='/signup_question_page'>
            <button type='button' className='btn btn-primary'>sign up</button>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className='col-md-8 page_header'>
          <div className='page_header_content'>
            <div className='row'>
              <div className='col-md-8 page_header_title'><h2>Q&A</h2></div>
              <div className='col-md-4 page_header_title'>{this.renderSignin()}</div>
            </div>
            <div className='row'>
              <p>Have a question you would like answered?</p>
              <p>Sign in and I will try to get to it as soon as possible.</p>
            </div>
          </div>
        </div>
        <div className='col-md-4 auth_children'>
          {this.props.children}
          {this.renderSignup()}
        </div>
        <QuestionList />
        <PostSidebar />
        <ReviewSidebar />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated
  }
}

export default connect(mapStateToProps)(QuestionsPage);