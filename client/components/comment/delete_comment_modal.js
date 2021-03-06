import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/article_actions';
import { deleteComment } from '../../actions/comment_actions';
import { customStyles } from '../../utils/modal_style';

class DeleteModal extends Component {

  static propTypes = {
    toggleModal: PropTypes.func,
    didDelete: PropTypes.bool,
    params: PropTypes.object,
    deleteComment: PropTypes.func,
    errorMessage: PropTypes.string,
    modalOpen: PropTypes.bool
  };

  componentWillMount() {
    this.props.toggleModal(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didDelete) {
      this.props.history.goBack()
    }
  }

  closeModal() {
    this.props.toggleModal(true);
    this.props.history.goBack()
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        contentLabel='Delete'
        className='col-md-4 delete_modal modal_box'
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
        <label>Are you sure you want to delete this comment?</label>
        <button className='btn btn-default' type='submit' onClick={() => this.props.deleteComment(this.props.params.id)}>yes</button>
        <button className='btn btn-default' type='button' onClick={() => this.closeModal()}>cancel</button>
      </Modal>
    )
  }
}

function mapStateToProps({ article, comment }) {
  return {
    modalOpen: article.modalOpen,
    didDelete: comment.commentDeleted,
    errorMessage: comment.error
  }
}

export default connect(mapStateToProps, { deleteComment, toggleModal })(DeleteModal);
