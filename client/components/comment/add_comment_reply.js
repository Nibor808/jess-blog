import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { saveComment } from '../../actions/comment_actions';

class AddCommentReply extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.context.router.goBack()
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
    const user = localStorage.getItem('user');
    const type = 'parent_comment_id';
    const id = this.props.params.id;
    this.props.saveComment({ type, id, user, title, content })
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='comment_form'>
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <Field name='title' component='input' type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Reply:</label>
          <Field name='content' component='textarea' type='textarea' className='form-control' />
        </div>
        {this.renderAlert()}
        <button className='btn btn-default' type='button' onClick={this.context.router.goBack}>cancel</button>
        <button className='btn btn-default pull-right' type='submit' disabled={submitting}>add reply</button>
      </form>
    );
  }
}

function mapStateToProps({ comment }) {
  return {
    didSave: comment.commentSaved
  }
}

AddCommentReply = reduxForm({
  form: 'commentreply'
})(AddCommentReply)

export default connect(mapStateToProps, { saveComment })(AddCommentReply);