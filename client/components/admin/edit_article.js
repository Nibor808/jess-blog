import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { editArticle } from '../../actions/article_actions';

class EditArticle extends Component {

  handleFormSubmit({ id }) {
    editArticle(id);
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='edit_form'>
        <h3>Edit Article</h3>
        <div className='form-group'>
          <label htmlFor='id'>Article Id:</label>
          <Field type='text' component='input' name='id' />
        </div>
        <button type='submit' className='btn btn-default' disabled={submitting}>edit</button>
      </form>
    )
  }
}

EditArticle = reduxForm({
  form: 'edit_form'
})(EditArticle);

function mapStateToProps({ article }) {
  return {
    didSave: article.articleSaved,
    successMessage: article.success,
    errorMessage: article.error
  }
}

export default connect(mapStateToProps, { editArticle })(EditArticle);