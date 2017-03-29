import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { saveQuestion } from '../../actions/question_actions';

class AskQuestion extends Component {

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

  handleFormSubmit({ title, content, category, keywords }) {
    const keywordArray = [];
    for (let key in keywords) {
      if (keywords.hasOwnProperty(key)) {
        keywordArray.push(key);
      }
    }
    this.props.saveQuestion({ title, content, category, keywordArray });
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const keywords = ['price', 'comparison', 'quality', 'best'];

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='question_form'>
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <Field name='title' component='input' type='text' className='form-control' />
        </div>
        <div className='form-group'>
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
        <div className='form-group'>
          <label>Keywords: (optional)</label>
          {keywords.map((name, index) => {
            return (
              <div key={index}>
                <label htmlFor={`keywords[${name}]`} className='checkbox_label'>{name}</label>
                <Field name={`keywords[${name}]`} component='input' type='checkbox' />
              </div>
            )
          })}
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Question:</label>
          <Field name='content' component='textarea' type='textarea' className='form-control' />
        </div>
        {this.renderAlert()}
        <button className='btn btn-default' type='button' onClick={this.context.router.goBack}>cancel</button>
        <button className='btn btn-default pull-right' type='submit' disabled={submitting}>submit question</button>
      </form>
    )
  }
}

function mapStateToProps({ questions }) {
  return {
    didSave: questions.questionSaved,
    errorMessage: questions.error
  }
}

AskQuestion = reduxForm({
  form: 'question'
})(AskQuestion);

export default connect(mapStateToProps, { saveQuestion })(AskQuestion);