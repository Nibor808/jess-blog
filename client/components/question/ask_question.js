import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { saveArticle, toggleModal } from '../../actions/article_actions';
import Modal from 'react-modal';
import { customStyles } from '../../utils/modal_style';
import { keywords } from '../../config/keywords';
import { CLEAR_ERROR } from '../../actions/types';

class AskQuestion extends Component {

  static propTypes = {
    toggleModal: PropTypes.func,
    didSave: PropTypes.bool,
    params: PropTypes.object,
    saveArticle: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    errorMessage: PropTypes.string,
    modalOpen: PropTypes.bool,
    dispatch: PropTypes.func
  };

  componentWillMount() {
    this.props.toggleModal(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.history.goBack();
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
    this.props.dispatch({ type: CLEAR_ERROR });
    this.props.toggleModal(true);
    this.props.history.goBack();
  }

  handleFormSubmit({ title, content, category, keywords }) {
    const keywordArray = [];
    const type = 3;
    for (let key in keywords) {
      if (keywords.hasOwnProperty(key)) {
        keywordArray.push(key);
      }
    }
    this.props.saveArticle({ type, title, content, category, keywordArray });
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <Modal
        isOpen={this.props.modalOpen}
        contentLabel='Comment'
        className='col-md-4'
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='question_form'>
          <div className='form-group'>
            <label htmlFor='title'>Title:</label>
            <Field name='title' component='input' type='text' className='form-control' />
          </div>
          <div className='form-group'>
            <label htmlFor='category'>Category:</label>
            <Field name='category' component='select' className='form-control'>
              <option />
              <option>monitor</option>
              <option>keyboard</option>
              <option>mouse</option>
              <option>cpu</option>
              <option>laptop</option>
              <option>printer</option>
              <option>OS</option>
              <option>tablet</option>
              <option>accessories</option>
              <option>gaming</option>
            </Field>
          </div>
          <div className='form-group'>
            <label>Keywords:</label>
          </div>
          <ul className='form-group keywords_list col-md-12'>
            {keywords.map((name, index) => {
              return (
                <li key={index}>
                  <label htmlFor={`keywords[${name}]`} className='checkbox_label'>{name}</label>
                  <Field name={`keywords[${name}]`} component='input' type='checkbox' />
                </li>
              )
            })}
          </ul>
          <div className='form-group'>
            <label htmlFor='content'>Question:</label>
            <Field name='content' component='textarea' type='textarea' className='form-control' />
          </div>
          {this.renderAlert()}
          <button className='btn btn-default' type='button' onClick={() => this.closeModal()}>cancel</button>
          <button className='btn btn-default pull-right' type='submit' disabled={submitting}>submit question</button>
        </form>
      </Modal>
    )
  }
}

// ask question is the same as adding an article
function mapStateToProps({ article }) {
  return {
    didSave: article.articleSaved,
    errorMessage: article.error,
    modalOpen: article.modalOpen
  }
}

export default reduxForm({
  form: 'question_form'
})(connect(mapStateToProps, { saveArticle, toggleModal })(AskQuestion));
