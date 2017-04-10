import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { deleteArticle } from '../../actions/article_actions';

class DeleteArticle extends Component {

  handleFormSubmit({ id }) {
    this.props.deleteArticle(id);
    this.props.reset('delete_form');
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='delete_form'>
          <h3>Delete Article</h3>
          <div className='form-group'>
            <label htmlFor='id'>Article Id:</label>
            <Field type='text' component='input' name='id' />
          </div>
          <button type='submit' className='btn btn-default' disabled={submitting}>delete</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ article }) {
  return {
    didDelete: article.articleDeleted,
    successMessage: article.success,
    errorMessage: article.error
  }
}

DeleteArticle = reduxForm({
  form: 'delete_form'
})(DeleteArticle);

export default connect(mapStateToProps, { deleteArticle })(DeleteArticle);
