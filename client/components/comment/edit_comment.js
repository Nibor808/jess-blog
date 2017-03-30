import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { saveComment, getAComment, updateComment } from '../../actions/comment_actions';

class EditComment extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.getAComment(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.context.router.goBack();
    }

    if (nextProps.comment !== this.props.comment) {
      const initData = {
        'title': nextProps.comment.title,
        'content': nextProps.comment.content
      };
      this.props.initialize(initData);
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

  handleFormSubmit({ title, content }) {
    const id = this.props.comment.id;
    this.props.updateComment({ id, title, content });
  }

  render() {
    if (!this.props.comment) {
      return <div>Loading...</div>
    }

    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='edit_comment_form'>
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <Field name='title' type='text' component='input' className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Comment:</label>
          <Field name='content' type='textarea' component='textarea' className='form-control' />
        </div>
        {this.renderAlert()}
        <button className='btn btn-default' type='button' onClick={this.context.router.goBack}>cancel</button>
        <button className='btn btn-default pull-right' type='submit' disabled={submitting}>update comment</button>
      </form>
    )
  }
}

function mapStatetoProps({ comments }) {
  return {
    comment: comments.singleComment,
    didSave: comments.commentSaved,
    errorMessage: comments.error
  }
}

EditComment = reduxForm({
  form: 'editcomment',
})(EditComment);

export default connect(mapStatetoProps, { saveComment, getAComment, updateComment })(EditComment);