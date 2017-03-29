import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { saveComment } from '../../actions/comment_actions';

const renderField = ({ input, label, type, textarea, meta: { touched, error } }) => {
  const textareaType = <textarea {...input} type={type} className='form-control' />
  const inputType = <input {...input} type={type} className='form-control' />

  return (
    <div className='form-group'>
      <label>{label}</label>
      <div>
        {textarea ? textareaType: inputType}
        {touched && error ? <span className='text-danger'>{error}</span>: ''}
      </div>
    </div>
  );
}

class AddComment extends Component {

  static propTypes = {
    input: PropTypes.element,
    label: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object,
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
    if (this.props.post_id === undefined && this.props.question_id === undefined) {
      // it's a review
      const idtype = 'review_id';
      const typeid = this.props.review_id
      this.props.saveComment({ idtype, typeid, user, title, content });
    }else if (this.props.review_id === undefined && this.props.question_id === undefined) {
      // it's a post
      const idtype = 'post_id';
      const typeid = this.props.post_id
      this.props.saveComment({ idtype, typeid, user, title, content });
    }else {
      // it's a question
      const idtype = 'question_id';
      const typeid = this.props.question_id;
      this.props.saveComment({ idtype, typeid, user, title, content });
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
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='comment_form'>
        <Field name='title' type='text' component={renderField} label='Title: (optional)' />
        <Field name='content' type='textarea' component={renderField} label='Comment:' textarea={true}/>
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
      errorMessage: questions.error
    }
  }
}

AddComment = reduxForm({
  form: 'add comment',
  validate
})(AddComment);

export default connect(mapStateToProps, { saveComment })(AddComment);