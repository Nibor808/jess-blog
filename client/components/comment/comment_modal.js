import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
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
  };

  componentWillMount() {
    this.props.toggleModal(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commentSaved) {
      this.props.history.goBack()
    }
  }

  handleFormSubmit({ title, content }) {
    const user = localStorage.getItem('user');
    let type;
    let id;
    if (!this.props.match.params.id) {
      type = 'article_id';
      id = this.props.article_id;
    } else {
      type = 'parent_comment_id';
      id = this.props.match.params.id;
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
    this.props.history.goBack();
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <Modal
        isOpen={this.props.modalOpen}
        contentLabel='Comment'
        className='col-xs-10 col-sm-6 col-md-4 modal_box'
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='comment_form'>
          <div className='form-group'>
            <label htmlFor='title'>Title:</label>
            <Field name='title' component='input' type='text' className='form-control' placeholder='Optional' />
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

export default reduxForm({
  form: 'add comment'
})(connect(mapStateToProps, { toggleModal, saveComment })(CommentModal));
