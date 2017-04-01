import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getQuestion } from '../../actions/question_actions';
import { getComments, getCommentReplies } from '../../actions/comment_actions';
import { renderComments } from '../comment/comments_list';
import { formatDate } from '../../utils/date_format';
import { renderSignin } from '../auth/render_signin';
import { renderSignup } from '../auth/renderSignup';

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
    this.props.getComments('question_id', this.props.params.id);
    this.props.getCommentReplies('parent_comment_id');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.getComments('question_id', this.props.question.id);
      this.props.getCommentReplies('parent_comment_id');
    }
  }

  renderAnswer() {
    if (this.props.question.answer) {
      return (
        <div>
          <h2>Answer:</h2>
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
           {renderComments(this.props.commentArray, this.props.repliesArray)}
        </ul>
      )
    }
  }

  render() {
    if (!this.props.question) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>
    }

    const questionDate = formatDate(this.props.question.createdAt);
    return (
      <div>
        <div
        key={this.props.question.id}
        className='question'>
          <h1>{this.props.question.title}</h1>
          <small className='date'>posted: {questionDate}</small>
          <p>{this.props.question.content}</p>
          {this.renderAnswer()}
        </div>
        <div className='comments_section col-md-6'>
          <div className='row'>
            <div className='col-md-6'><h2>Comments:</h2></div>
            {renderSignin(this.props.authenticated, this.props.children, 'question')}
          </div>
            {this.hasComments()}
        </div>
        <div className='col-md-5 col-md-offset-1 auth_children'>
          {this.props.children}
          {renderSignup(this.props.authenticated, 'question')}
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
    repliesArray: comments.repliesArray,
    didSave: comments.commentSaved
  }
}

export default connect(mapStateToProps, { getQuestion, getComments, getCommentReplies })(Question);