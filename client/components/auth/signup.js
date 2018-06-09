import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/user_actions';
import { CLEAR_ERROR } from '../../actions/types';
import Modal from 'react-modal';
import { toggleModal } from '../../actions/article_actions';
import { customStyles } from '../../utils/modal_style';

class Signup extends Component {

  static propTypes = {
    input: PropTypes.element,
    label: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object,
    submitting: PropTypes.bool,
    dispatch: PropTypes.func
  }

  static propTypes = {
    signupUser: PropTypes.func,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func
  }

  componentWillMount() {
    this.props.toggleModal(false);
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

  closeModal() {
    this.props.dispatch({ type: CLEAR_ERROR });
    this.props.toggleModal(true);
    this.props.history.goBack();
  }

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <div className='form-group'>
        <label>{label}</label>
        <div>
          <input {...input} type={type} className='form-control' />
          {touched && error ? <span className='text-danger'><strong>{error}</strong></span> : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Modal
        isOpen={this.props.modalOpen}
        contentLabel='Signup'
        className='col-xs-10 col-sm-6 col-md-4 modal_box'
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='signup_form'>
          <Field name='email' type='email' component={this.renderField} label='Email:' />
          <Field name='username' type='text' component={this.renderField} label='Username: (for display only)' />
          <Field name='password' type='password' component={this.renderField} label='Password:' />
          <Field name='passwordConfirm' type='password' component={this.renderField} label='Confirm Password:' />
          {this.renderAlert()}
          <button type='button' className='btn btn-default' onClick={() => this.closeModal()}>cancel</button>
          <button className='btn btn-default pull-right' type='submit' disabled={submitting}>sign up</button>
        </form>
      </Modal>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
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

function mapStateToProps({ auth, article }) {
  return {
    modalOpen: article.modalOpen,
    errorMessage: auth.error
  }
}

export default reduxForm({
  form: 'sign up',
  validate
})(connect(mapStateToProps, { signupUser, toggleModal })(Signup));


