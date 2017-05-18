import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/article_actions';
import { deleteArticle } from '../../actions/article_actions';
import { customStyles } from '../../utils/modal_style';

class DeleteModal extends Component {

  static propTypes = {
    toggleModal: PropTypes.func,
    didDelete: PropTypes.bool,
    deleteArticle: PropTypes.func,
    modalOpen: PropTypes.bool,
    params: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.toggleModal(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didDelete) {
      this.context.router.goBack()
    }
  }

  closeModal() {
    this.props.toggleModal(true);
    this.context.router.goBack()
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        contentLabel='Delete'
        className='col-md-4 delete_modal modal_box'
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
        <label>Are you sure you want to delete this article?</label>
        <button className='btn btn-default' type='submit' onClick={() => this.props.deleteArticle(this.props.params.id)}>yes</button>
        <button className='btn btn-default' type='button' onClick={() => this.closeModal()}>cancel</button>
    </Modal>
    )
  }
}

function mapStateToProps({ article }) {
  return {
    modalOpen: article.modalOpen,
    didDelete: article.articleDeleted
  }
}

export default connect(mapStateToProps, { deleteArticle, toggleModal })(DeleteModal);
