import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/user_actions';

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div className='form-group'>
      <label>{label}</label>
      <div>
        <input {...input} type={type} className='form-control' />
        {touched && error ? <span className='text-danger'>{error}</span>: ''}
      </div>
    </div>
  );
}

class Signup extends Component {

  static propTypes = {
    input: PropTypes.element,
    label: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object,
    submitting: PropTypes.bool
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    signupUser: PropTypes.func,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func
  }

  handleFormSubmit(values) {
    this.props.signupUser(values);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='signup_form'>
        <Field name='email' type='email' component={renderField} label='Email:' />
        <Field name='username' type='text' component={renderField} label='Username: (for display only)' />
        <Field name='password' type='password' component={renderField} label='Password:' />
        <Field name='passwordConfirm' type='password' component={renderField} label='Confirm Password:' />
        {this.renderAlert()}
        <button type='button' className='btn btn-default' onClick={this.context.router.goBack}>cancel</button>
        <button className='btn btn-default pull-right' type='submit' disabled={submitting}>sign up</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required'
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required'
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match'
  }

  return errors;
}

function mapStateToProps({ auth }) {
  return {
    errorMessage: auth.error
  }
}

Signup = reduxForm({
  form: 'sign up',
  validate
})(Signup);

export default connect(mapStateToProps, { signupUser })(Signup);