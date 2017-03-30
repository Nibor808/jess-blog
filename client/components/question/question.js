import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getQuestion } from '../../actions/question_actions';
import { getComments } from '../../actions/comment_actions';
import { renderComments } from '../comment/comments_list';
import { formatDate } from '../../utils/date_format';

class Question extends Component {

  static propTypes = {
    question: PropTypes.object,
    authenticated: PropTypes.bool,
    commentArray: PropTypes.array,
    didSave: PropTypes.bool,
    getQuestion: PropTypes.func
  }

  componentWillMount() {
    this.props.getQuestion(this.props.params.id);
    this.props.getComments('question_id', this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.getComments('question_id', this.props.question.id);
    }
  }

  renderSignin() {
    if (!this.props.authenticated) {
      return (
        <div className='col-md-6'>
          <Link to='/signin_question' className='pull-right login'>
            <button className='btn btn-default'>sign in to comment</button>
          </Link>
        </div>
      );
    }else {
      return (
        <div className='col-md-6'>
          <Link to='/addcomment_question' className='pull-right login'>
            <button className='btn btn-default'>add a comment</button>
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
          <Link to='/signup_question'>
            <button type='button' className='btn btn-primary'>sign up</button>
          </Link>
        </div>
      );
    }
  }

  renderAnswer() {
    if (this.props.question.answer) {
      return (
        <div>
          <h3>Answer:</h3>
          <p>{this.props.question.answer}</p>
        </div>
      )
    }
    return <div></div>
  }

  hasComments() {
    if (!this.props.commentArray) {
      return <p className='col-md-6'>Be the first to comment.</p>
    }else {
      return (
        <ul className='comments_list'>
          {this.props.commentArray.map(comment => renderComments(comment))}
        </ul>
      )
    }
  }

  render() {
    if (!this.props.question) {
      return <div>Loading...</div>
    }

    const questionDate = formatDate(this.props.question.createdAt);

    return (
      <div>
        <div
        key={this.props.question.id}
        className='question_item'>
          <h1>{this.props.question.title}</h1>
          <small>posted: {questionDate}</small>
          <p>{this.props.question.content}</p>
          {this.renderAnswer()}
        </div>
        <div className='comments_section col-md-6'>
          <div className='row'>
            <div className='col-md-6'><h3>Comments:</h3></div>
            {this.renderSignin()}
          </div>
            {this.hasComments()}
        </div>
        <div className='col-md-5 col-md-offset-1 auth_children'>
          {this.props.children}
          {this.renderSignup()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, auth, comments }) {
  return {
    question: questions.question,
    authenticated: auth.authenticated,
    commentArray: comments.commentArray,
    didSave: comments.commentSaved
  }
}

export default connect(mapStateToProps, { getQuestion, getComments })(Question);