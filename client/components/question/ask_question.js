import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const renderField = ({ input, label, type, textarea, meta: { touched, error } }) => {

  const textareaType = <textarea {...input} type={type} className='form-control' />
  const inputType = <input {...input} type={type} className='form-control' />
  const selectType = <select {...input} type={type} className='form-control'>
                      <option value='monitors'>Monitors</option>
                      <option value='keyboards'>Keyboards</option>
                      <option value='cpus'>Cpu's</option>
                     </select>

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

  }

  render() {
    // build the form here, forget rendering it separately
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='question_form'>

      </form>
    )
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='question_form'>
        <Field name='title' type='text' component={renderField} label='Title:' />
        <Field name='content' type='textarea' component={renderField} label='Question:' textarea={true}/>
        <Field name='category' type='select' component={renderField} label='Category: (choose one)' />
        {this.renderAlert()}
        <button className='btn btn-default' type='button' onClick={this.context.router.goBack}>cancel</button>
        <button className='btn btn-default pull-right' type='submit' disabled={submitting}>post question</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.content) {
    errors.content = 'Please enter your question'
  }
}

AskQuestion = reduxForm({
  form: 'ask question',
  validate
})(AskQuestion);

export default connect(mapStateToProps, { saveQuestion })(AskQuestion);