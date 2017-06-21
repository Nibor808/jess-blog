import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signinUser } from '../../actions/user_actions';
import { CLEAR_ERROR } from '../../actions/types';
import Modal from 'react-modal';
import { toggleModal } from '../../actions/article_actions';
import { customStyles } from '../../utils/modal_style';

class Signin extends Component {

  static propTypes = {
    signinUser: PropTypes.func,
    errorMessage: PropTypes.string,
    authenticated: PropTypes.bool,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    dispatch: PropTypes.func
  }

  componentWillMount() {
    this.props.toggleModal(false);
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      this.props.history.goBack();
    }
  }

  closeModal() {
    this.props.dispatch({ type: CLEAR_ERROR });
    this.props.toggleModal(true);
    this.props.history.goBack();
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <Modal
        isOpen={this.props.modalOpen}
        contentLabel='Signin'
        className='col-xs-10 col-sm-6 col-md-4 modal_box'
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
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
          <button type='button' className='btn btn-default' onClick={() => this.closeModal()}>cancel</button>
          <button type='submit' className='btn btn-default pull-right' disabled={submitting}>sign in</button>
        </form>
      </Modal>
    );
  }
}

function mapStateToProps({ auth, article }) {
  return {
    errorMessage: auth.error,
    authenticated: auth.authenticated,
    modalOpen: article.modalOpen
  };
}

export default reduxForm({
  form: 'sign in'
})(connect(mapStateToProps, { signinUser, toggleModal })(Signin));