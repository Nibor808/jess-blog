import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { signinUser } from '../../actions/user_actions';

class Signin extends Component {

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          {this.props.errorMessage}
        </div>
      );
    }
    if (this.props.authenticated) {
      return (
        <div className='alert alert-success'>
          <p>You are signed in. Click "back" to add a comment.</p>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className='col-md-3 signin_form'>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <Field name='email' component='input' type='email' className='form-control'/>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <Field name='password' component='input' type='password' className='form-control' />
          </div>
          {this.renderAlert()}
          <button type='submit' className='btn btn-default'>sign in</button>
          <button type='button' className='btn btn-default pull-right' onClick={browserHistory.goBack}>back</button>
        </form>
      </div>
    );
  };
}

function mapStateToProps({ auth }) {
  return {
    errorMessage: auth.error,
    authenticated: auth.authenticated
  };
}

Signin = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps, { signinUser })(Signin);