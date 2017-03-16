import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signinUser } from '../../actions/user_actions';

class Signin extends Component {

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
          <button type='button' className='btn btn-default' onClick={this.context.router.goBack}>back</button>
          <button type='submit' className='btn btn-default pull-right'>sign in</button>
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