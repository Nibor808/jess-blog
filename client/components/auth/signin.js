import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signinUser } from '../../actions/user_actions';
import { store } from '../../index';
import { UNAUTH_USER } from '../../actions/types';

class Signin extends Component {

  static propTypes = {
    signinUser: PropTypes.func,
    errorMessage: PropTypes.string,
    authenticated: PropTypes.bool,
    handleSubmit: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object
  }

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
      this.context.router.goBack();
    }
  }

  removeAuthError() {
    store.dispatch({ type: UNAUTH_USER })
    this.context.router.goBack()
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='signin_form'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <Field name='email' component='input' type='email' className='form-control'/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <Field name='password' component='input' type='password' className='form-control' />
        </div>
        {this.renderAlert()}
        <button type='button' className='btn btn-default' onClick={this.removeAuthError.bind(this)}>cancel</button>
        <button type='submit' className='btn btn-default pull-right'>sign in</button>
      </form>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    errorMessage: auth.error,
    authenticated: auth.authenticated
  };
}

Signin = reduxForm({
  form: 'sign in'
})(Signin);

export default connect(mapStateToProps, { signinUser })(Signin);