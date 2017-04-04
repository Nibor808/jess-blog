import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-modal';
import { toggleModal } from '../../actions/article_actions';
import { saveComment } from '../../actions/comment_actions';
import { store } from '../../index';
import { RESET_COMMENT_STATE } from '../../actions/types';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none'
  },
  overlay: {
    backgroundColor: 'rgba(100,100,100,0.75)'
  }
};

class CommentModal extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.toggleModal(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.context.router.goBack()
    }
  }

  handleFormSubmit({ title, content }) {
    const user = localStorage.getItem('user');
    let type;
    let id;
    if (!this.props.params.id) {
      type = 'article_id';
      id = this.props.article_id;
    }else {
      type = 'parent_comment_id';
      id = this.props.params.id;
    }
    this.props.saveComment({ type, id, user, title, content });
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

  closeModal() {
    store.dispatch({ type: RESET_COMMENT_STATE });
    this.props.toggleModal(true);
    this.context.router.goBack()
  }

  render() {

    const { handleSubmit, submitting } = this.props;

    return (
      <Modal
        isOpen={this.props.modalOpen}
        contentLabel='Comment' className='col-md-4'
        style={customStyles}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='comment_form'>
          <div className='form-group'>
            <label htmlFor='title'>Title:</label>
            <Field name='title' component='input' type='text' className='form-control' />
          </div>
          <div className='form-group'>
            <label htmlFor='content'>Comment:</label>
            <Field name='content' component='textarea' type='textarea' className='form-control' />
          </div>
          {this.renderAlert()}
          <button className='btn btn-default' type='button' onClick={this.closeModal.bind(this)}>cancel</button>
          <button className='btn btn-default pull-right' type='submit' disabled={submitting}>submit</button>
        </form>
      </Modal>
    );
  }
}

function mapStateToProps({ article, comment }) {
  return {
    modalOpen: article.modalOpen,
    article_id: article.article.id,
    didSave: comment.commentSaved,
    errorMessage: comment.error
  }
}

CommentModal = reduxForm({
  form: 'add comment'
})(CommentModal);

export default connect(mapStateToProps, { toggleModal, saveComment })(CommentModal);