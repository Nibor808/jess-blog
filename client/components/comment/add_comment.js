import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { saveComment } from '../../actions/comment_actions';

class AddComment extends Component {

  static propTypes = {
    post_id: PropTypes.number,
    saveComment: PropTypes.func,
    errorMessage: PropTypes.string,
    didSave: PropTypes.bool,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    review_id: PropTypes.number,
    question_id: PropTypes.number
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.context.router.goBack()
    }
  }

  handleFormSubmit({ title, content }) {
    const user = localStorage.getItem('user');
    let idtype;
    let typeid;
    if (this.props.route.path === '/addcomment_review') {
      // it's a review
      idtype = 'review_id';
      typeid = this.props.review_id
    }else if (this.props.route.path === '/addcomment_post') {
      // it's a post
      idtype = 'post_id';
      typeid = this.props.post_id
    }else if (this.props.route.path === '/addcomment_question'){
      // it's a question
      idtype = 'question_id';
      typeid = this.props.question_id;
    }
     this.props.saveComment({ idtype, typeid, user, title, content });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    console.log('this', this)
    console.log(this.props.route.path)
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='comment_form'>
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <Field name='title' component='input' type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Comment:</label>
          <Field name='content' component='textarea' type='textarea' className='form-control' />
        </div>
        {this.renderAlert()}
        <button className='btn btn-default' type='button' onClick={this.context.router.goBack}>cancel</button>
        <button className='btn btn-default pull-right' type='submit' disabled={submitting}>add comment</button>
      </form>
    );
  }
}

function mapStateToProps({ posts, reviews, questions, comments }) {
  if (posts.post) {
    return {
      post_id: posts.post.id,
      didSave: comments.commentSaved,
      errorMessage: comments.error
    }
  }
  if (reviews.review) {
    return {
      review_id: reviews.review.id,
      didSave: comments.commentSaved,
      errorMessage: comments.error
    }
  }
  if (questions.question) {
    return {
      question_id: questions.question.id,
      didSave: comments.commentSaved,
      errorMessage: comments.error
    }
  }
}

AddComment = reduxForm({
  form: 'add comment'
})(AddComment);

export default connect(mapStateToProps, { saveComment })(AddComment);