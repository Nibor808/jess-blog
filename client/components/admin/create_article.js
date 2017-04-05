import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, initialize, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { saveArticle } from '../../actions/article_actions';
import { store } from '../../index.js';

const renderSpecs = ({ fields }) => {
  return (
    <ul>
      <li><button type='button' className='btn btn-default' onClick={() => fields.push({})}>Add Spec</button></li>
        {fields.map((spec, index) =>
          <li key={index}>
            <button type='button' className='btn btn-default pull-right' onClick={() => fields.remove(index)}>Remove</button>
            <label htmlFor={`${spec}.key`}>Spec #{index + 1}</label>
            <div className='row'>
              <div className='col-md-4'>
                <label>Name</label>
                <Field name={`${spec}.key`} type='text' component='input' />
              </div>
              <div className='col-md-4 pull-right'>
                <label>Value</label>
                <Field name={`${spec}.value`} type='text' component='input' />
              </div>
            </div>
          </li>
        )}
    </ul>
  )
}

class CreateArticle extends Component {

  static propTypes = {
    fields: PropTypes.object,
    errorMessage: PropTypes.string,
    saveArticle: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    reset: PropTypes.func,
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger col-md-12'>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  handleFormSubmit({ type, title, content, category, keywords, cover_img, specs, pros, cons }) {
    const keywordArray = [];
    for (let key in keywords) {
      if (keywords.hasOwnProperty(key)) {
        keywordArray.push(key);
      }
    }
    type = parseInt(type)
    this.props.saveArticle({ type, title, content, category, keywordArray, cover_img, specs, pros, cons });
  }

  render() {
    const { handleSubmit, submitting, reset } = this.props;
    const keywords = ['price', 'comparison', 'quality', 'best'];

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='create_article_form'>
        <h3>Create Article</h3>
        <div className='form-group col-md-6'>
          <label htmlFor='type'>Type:</label>
          <Field name='type' component='select' type='text' className='form-control'>
            <option></option>
            <option value='1'>post</option>
            <option value='2'>review</option>
          </Field>
        </div>
         <div className='form-group col-md-6'>
          <label htmlFor='title'>Title:</label>
          <Field name='title' component='input' type='text' className='form-control'/>
        </div>
        <div className='form-group col-md-12'>
          <label htmlFor='content'>Content:</label>
          <Field name='content' component='textarea' type='textarea' className='form-control'/>
        </div>
        <div className='form-group col-md-6'>
          <label htmlFor='cover_img'>Cover Image:</label>
          <Field name='cover_img' component='input' type='text' className='form-control'/>
        </div>
         <div className='form-group col-md-6'>
          <label htmlFor='images'>Additional Images: (csv)</label>
          <Field name='images' component='input' type='text' className='form-control'/>
        </div>
        <div className='form-group col-md-6'>
          <label htmlFor='category'>Category:</label>
          <Field name='category' component='select' className='form-control'>
            <option></option>
            <option>monitor</option>
            <option>keyboard</option>
            <option>mouse</option>
            <option>cpu</option>
            <option>laptop</option>
            <option>printer</option>
            <option>OS</option>
            <option>tablet</option>
            <option>accessories</option>
            <option>gaming</option>
          </Field>
        </div>
        <div className='form-group col-md-6'>
          <label>Keywords:</label>
          {keywords.map((name, index) => {
            return (
              <div key={index}>
                <label htmlFor={`keywords[${name}]`} className='checkbox_label'>{name}</label>
                <Field name={`keywords[${name}]`} component='input' type='checkbox' />
              </div>
            )
          })}
        </div>
        <h4 className='text-center'>For Reviews Only</h4>
        <div className='form-group col-md-6'>
          <label htmlFor='pros'>Pros:(csv)</label>
          <Field name='pros' component='input' type='text' className='form-control'/>
        </div>
        <div className='form-group col-md-6'>
          <label htmlFor='cons'>Cons:(csv)</label>
          <Field name='cons' component='input' type='text' className='form-control'/>
        </div>
        <div className='form-group col-md-12'>
          <label htmlFor='specs'>Specs:</label>
          <FieldArray name='specs' component={renderSpecs} />
        </div>
        {this.renderAlert()}
        <button className='btn btn-default' type='button' onClick={() => store.dispatch(reset('create_article'))}>clear values</button>
        <button className='btn btn-default pull-right' type='submit' disabled={submitting}>submit</button>
      </form>
    )
  }
}

function mapStateToProps({ article }) {
  return {
    didSave: article.articleSaved,
    errorMessage: article.error
  }
}

CreateArticle = reduxForm({
  form: 'create_article'
})(CreateArticle);

export default connect(mapStateToProps, { saveArticle })(CreateArticle);
