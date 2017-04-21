import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-modal';
import { toggleModal } from '../../actions/article_actions';
import { saveComment } from '../../actions/comment_actions';
import { customStyles } from '../../utils/modal_style';
import { CLEAR_ERROR } from '../../actions/types';

class CommentModal extends Component {

  static propTypes = {
    toggleModal: PropTypes.func,
    commentSaved: PropTypes.bool,
    params: PropTypes.object,
    article_id: PropTypes.number,
    saveComment: PropTypes.func,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    modalOpen: PropTypes.bool,
    dispatch: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.toggleModal(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commentSaved) {
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
    this.props.dispatch({ type: CLEAR_ERROR });
    this.props.toggleModal(true);
    this.context.router.goBack();
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <Modal
        isOpen={this.props.modalOpen}
        contentLabel='Comment'
        className='col-md-4 modal_box'
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='comment_form'>
          <div className='form-group'>
            <label htmlFor='title'>Title:</label>
            <Field name='title' component='input' type='text' className='form-control' placeholder='Optional'/>
          </div>
          <div className='form-group'>
            <label htmlFor='content'>Comment:</label>
            <Field name='content' component='textarea' type='textarea' className='form-control' />
          </div>
          {this.renderAlert()}
          <button className='btn btn-default' type='button' onClick={() => this.closeModal()}>cancel</button>
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
    commentSaved: comment.commentSaved,
    errorMessage: comment.error
  }
}

CommentModal = reduxForm({
  form: 'add comment'
})(CommentModal);

export default connect(mapStateToProps, { toggleModal, saveComment })(CommentModal);
