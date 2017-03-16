import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { saveComment } from '../actions/comment_actions';

class AddComment extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  handleFormSubmit({ title, content }) {
    const user = localStorage.getItem('user');

    if (this.props.post_id === undefined) {
      const id = this.props.review_id;
      const isReview = true;
      const isPost = false;
      this.props.saveComment({ id, isReview, isPost, user, title, content });
    }else {
      const id = this.props.post_id;
      const isPost = true;
      const isReview = false;
      this.props.saveComment({ id, isReview, isPost, user, title, content });
    }
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          {this.props.errorMessage}
        </div>
      );
    }
    if (this.props.didSave) {
      this.context.router.goBack();
    }
  }

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <div className='form-group'>
        <label>{label}</label>
        <div>
          <input {...input} type={type} className='form-control' />
          {touched && error ? <span>{error}</span>: ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='col-md-6 comment_form'>
        <Field name='title' type='text' component={this.renderField.bind(this)} label='Title:(optional)' />
        <Field name='content' type='textarea' component={this.renderField.bind(this)} label='Comment:' />
        {this.renderAlert()}
        <button className='btn btn-default' type='button' onClick={this.context.router.goBack}>cancel</button>
        <button className='btn btn-default pull-right' type='submit' disabled={submitting}>add comment</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.content) {
    errors.content = 'Please enter a comment'
  }
}

function mapStateToProps({ posts, reviews, comments }) {
  if (posts.post) {
    return {
      post_id: posts.post.postId,
      didSave: comments.commentSaved,
      errorMessage: comments.error
    }
  }
  if(reviews.review) {
    return {
      review_id: reviews.review.reviewId,
      didSave: comments.commentSaved,
      errorMessage: comments.error
    }
  }

}

AddComment = reduxForm({
  form: 'addComment',
  validate
})(AddComment);

export default connect(mapStateToProps, { saveComment })(AddComment);