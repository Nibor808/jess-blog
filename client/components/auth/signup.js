import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/user_actions';

// const FIELDS = {
//   email: {
//     label: 'Email:',
//     type: 'email',
//     errorTxt: 'Please enter an email'
//   },
//   username: {
//     label: 'Username:',
//     type: 'text',
//     errorTxt: 'Please enter a username'
//   },
//   password: {
//     label: 'Password:',
//     type: 'password',
//     errorTxt: 'Please enter an password'
//   },
//   passwordConfirm: {
//     label: 'Confirm Password:',
//     type: 'password',
//     errorTxt: 'Please confirm your password'
//   }
// };

class Signup extends Component {

  static propTypes = {
    signupUser: PropTypes.func,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
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
  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <div className='form-group'>
        <label>{label}</label>
        <div>
          <input {...input} type={type} className='form-control' />
          {touched && error ? <span>{error}</span>: ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='signup_form col-md-3'>
        <Field name='email' type='email' component={this.renderField.bind(this)} label='Email:' />
        <Field name='username' type='text' component={this.renderField.bind(this)} label='Username:' />
        <Field name='password' type='password' component={this.renderField.bind(this)} label='Password:' />
        <Field name='passwordConfirm' type='password' component={this.renderField.bind(this)} label='Confirm Password:' />
        {this.renderAlert()}
        <button className='btn btn-primary' type='submit' disabled={submitting}>sign up</button>
      </form>
    );
  }

  // renderFields({ input, label, type, meta: { touched, error } }) {
  //   return (
  //     <div key={fieldConfig.label} className={`form-group ${field.touched && field.invalid ? 'has-danger': ''}`}>
  //       <label>{fieldConfig.label}</label>
  //       <Field name={field} type={fieldConfig.type} component='input' className='form-control' />
  //       <small className='error'>{field.touched ? field.error : ''}</small>
  //     </div>
  //   );
  // }

//   render() {
//     const { handleSubmit } = this.props;

//     return (
//      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='signup_form col-md-3'>
//       {map(FIELDS, this.renderFields.bind(this))}
//       {this.renderAlert()}
//       <button className='btn btn-primary' type='submit'>sign up</button>
//      </form>
//     );
//   }
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
  form: 'signup',
  validate
})(Signup);

export default connect(mapStateToProps, { signupUser })(Signup);