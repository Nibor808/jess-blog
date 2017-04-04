import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form';
import Modal from 'react-modal';
import { toggleModal } from '../../actions/article_actions';
import { saveComment, getAComment, updateComment } from '../../actions/comment_actions';
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

class EditComment extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.toggleModal(false);
    this.props.getAComment(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.context.router.goBack();
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
    store.dispatch({ type: RESET_COMMENT_STATE });
    this.props.toggleModal(true);
    this.context.router.goBack()
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

function mapStatetoProps({ article, comment }) {
  return {
    modalOpen: article.modalOpen,
    comment: comment.singleComment,
    didSave: comment.commentSaved,
    errorMessage: comment.error
  }
}

EditComment = reduxForm({
  form: 'editcomment',
})(EditComment);

export default connect(mapStatetoProps, { saveComment, getAComment, updateComment, toggleModal })(EditComment);