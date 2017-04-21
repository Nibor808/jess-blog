import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, initialize, FieldArray, reset } from 'redux-form';
import { connect } from 'react-redux';
import { saveArticle } from '../../actions/article_actions';
import { keywords } from '../../config/keywords';
import { CLEAR_ERROR } from '../../actions/types';

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
    successMessage: PropTypes.string,
    saveArticle: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    reset: PropTypes.func,
    dispatch: PropTypes.func,
    didSave: PropTypes.bool
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger col-md-12'>
          {this.props.errorMessage}
        </div>
      );
    }

    if (this.props.successMessage) {
      return (
        <div className='alert alert-success col-md-12'>
          {this.props.successMessage}
        </div>
      );
    }
  }

  componentWillUnmount() {
    this.props.dispatch({ type: CLEAR_ERROR });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.reset('create_article');
    }
  }

  handleFormSubmit({ type, title, content, category, keywords, additionalKeywords, cover_img, specs, pros, cons }) {
    const tempKeywords = [];
    let keywordArray;

    for (let key in keywords) {
      if (keywords.hasOwnProperty(key) && keywords[key] == true) {
        tempKeywords.push(key);
      }
    }

    if (additionalKeywords) {
      keywordArray = tempKeywords.concat(additionalKeywords.split(','));
    }else {
      keywordArray = tempKeywords;
    }

    type = parseInt(type);
    this.props.saveArticle({ type, title, content, category, keywordArray, cover_img, specs, pros, cons });
  }

  render() {
    const { handleSubmit, submitting, reset } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='create_article_form'>
          <h3>Create Article</h3>
          <div className='form-group col-md-6'>
            <label htmlFor='type'>Type:</label>
            <Field name='type' component='select' type='text' className='form-control' id='typeSelect'>
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
            <label htmlFor='category'>Category:</label>
            <Field name='category' component='select' className='form-control'>
              <option></option>
              <option value='monitors'>monitors</option>
              <option value='keyboards'>keyboards</option>
              <option value='mouse'>mouse</option>
              <option value='cpus'>CPUs</option>
              <option value='laptops'>laptops</option>
              <option value='printers'>printers</option>
              <option value='OS'>OS</option>
              <option value='tablets'>tablets</option>
              <option value='accessories'>accessories</option>
              <option value='gaming'>gaming</option>
            </Field>
          </div>
          <div className='col-md-12 form-group'>
            <label>Keywords:</label>
          </div>
          <ul className='form-group col-md-12 keywords_list'>
            {keywords.map((name, index) => {
              return (
                <li key={index}>
                  <label htmlFor={`keywords[${name}]`} className='checkbox_label'>{name}</label>
                  <Field name={`keywords[${name}]`} component='input' type='checkbox' />
                </li>
              )
            })}
            <label htmlFor='additionalKeywords'>Additional:</label>
            <li><Field type='text' component='input' name='additionalKeywords' /></li>
          </ul>
          <h4 className='text-center'>For Reviews Only</h4>
          <div className='form-group col-md-6'>
            <label htmlFor='pros'>Pros: (csv)</label>
            <Field name='pros' component='input' type='text' className='form-control'/>
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='cons'>Cons: (csv)</label>
            <Field name='cons' component='input' type='text' className='form-control'/>
          </div>
          <div className='form-group col-md-12'>
            <label htmlFor='specs'>Specs:</label>
            <FieldArray name='specs' component={renderSpecs} />
          </div>
          <button className='btn btn-default' type='button' onClick={() => reset('create_article')}>clear values</button>
          <button className='btn btn-default pull-right' type='submit' disabled={submitting}>save</button>
        </form>
        {this.renderAlert()}
      </div>
    )
  }
}

function mapStateToProps({ article }) {
  return {
    article: article.article,
    didSave: article.articleSaved,
    errorMessage: article.error,
    successMessage: article.success
  }
}

CreateArticle = reduxForm({
  form: 'create_article'
})(CreateArticle);

export default connect(mapStateToProps, { saveArticle })(CreateArticle);
