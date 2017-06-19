import React, { Component, PropTypes } from 'react';
import QuestionList from './question_list';
import PostSidebar from '../post/post_sidebar';
import ReviewSidebar from '../review/review_sidebar';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class QuestionsPage extends Component {

  static propTypes = {
    authenticated: PropTypes.bool,
    children: PropTypes.object,
    form: PropTypes.object
  }

  renderSignin() {
    if (!this.props.authenticated) {
      return (
        <div>
          <Link to='/signin_question' className='pull-right login'>
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
    if (!this.props.authenticated && Object.keys(this.props.form).length === 1) {
      return (
        <div className='signup_prompt text-center'>
          <h2>Not already part of the converstation?</h2>
          <Link to='/signup_question'>
            <button type='button' className='btn btn-default'>sign up</button>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-sm-8 page_list'>
            <div className='page_header_content'>
              <div className='row'>
                <div className='col-sm-8 page_header_title'><h1>Q&A</h1></div>
                <div className='col-sm-4 page_header_title'>{this.renderSignin()}</div>
              </div>
              <div className='row'>
                <p>Have a question you would like answered?</p>
                <p>Sign in and I will try to get to it as soon as possible.</p>
              </div>
            </div>
            <hr className='color_bar' />
            <QuestionList />
          </div>
          <div className='col-sm-4 side_bar'>
            <PostSidebar />
            <ReviewSidebar />
          </div>
          <div className='col-sm-4 auth_children'>
            {this.props.children}
            {this.renderSignup()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, form }) {
  return {
    authenticated: auth.authenticated,
    form
  }
}

export default connect(mapStateToProps)(QuestionsPage);
