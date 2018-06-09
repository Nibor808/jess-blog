import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-modal';
import { toggleModal } from '../../actions/article_actions';
import { getAComment, updateComment } from '../../actions/comment_actions';
import { customStyles } from '../../utils/modal_style';

class EditComment extends Component {

  static propTypes = {
    toggleModal: PropTypes.func,
    didSave: PropTypes.bool,
    params: PropTypes.object,
    getAComment: PropTypes.func,
    updateComment: PropTypes.func,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    modalOpen: PropTypes.bool,
    comment: PropTypes.object,
    initialize: PropTypes.func
  }

  componentWillMount() {
    this.props.toggleModal(false);
    this.props.getAComment(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.history.goBack();
    }

    if (nextProps.comment !== this.props.comment) {
      const initData = {
        'title': nextProps.comment.title,
        'content': nextProps.comment.content
      };
      this.props.initialize(initData);
    }
  }

  componentDidMount() {
    if (this.props.comment) {
      const initData = {
        'title': this.props.comment.title,
        'content': this.props.comment.content
      };
      this.props.initialize(initData);
    }
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
    this.props.toggleModal(true);
    this.props.history.goBack()
  }

  handleFormSubmit({ title, content }) {
    const id = this.props.comment.id;
    this.props.updateComment({ id, title, content });
  }

  render() {
    if (!this.props.comment) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

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
            <Field name='title' component='input' type='text' className='form-control' />
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

function mapStatetoProps({ article, comment }) {
  return {
    modalOpen: article.modalOpen,
    comment: comment.singleComment,
    didSave: comment.commentSaved,
    errorMessage: comment.error
  }
}

export default reduxForm({
  form: 'editcomment',
})(connect(mapStatetoProps, { getAComment, updateComment, toggleModal })(EditComment));
