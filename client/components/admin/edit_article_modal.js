import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/article_actions';
import { updateArticle } from '../../actions/article_actions';
import { customStyles } from '../../utils/modal_style';
import { keywords } from '../../config/keywords';
import { CLEAR_ERROR } from '../../actions/types';

class EditArticleModal extends Component {

  static propTypes = {
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    toggleModal: PropTypes.func,
    updateArticle: PropTypes.func,
    handleSubmit: PropTypes.func,
    article: PropTypes.object,
    keywords: PropTypes.array,
    articleSaved: PropTypes.bool,
    modalOpen: PropTypes.bool,
    initialize: PropTypes.func,
    dispatch: PropTypes.func,
  };

  static contextTypes = {
    router: PropTypes.object
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger col-md-12'>
          {this.props.errorMessage}
        </div>
      );
    }

    if (this.props.successMessage) {
      return (
        <div className='alert alert-success col-md-12'>
          {this.props.successMessage}
        </div>
      );
    }
  }

  componentWillMount() {
    this.props.toggleModal(false);

    // create object to pass to keywords to trigger checked property
    const keyArray = this.props.article.keywords.split(',');
    const keywordObj = {};

    keyArray.map(word => keywordObj[word] = true);

    const initData = {
      title: this.props.article.title,
      content: this.props.article.content,
      cover_img: this.props.article.cover_img,
      type: this.props.article.type,
      category: this.props.article.category,
      keywords: keywordObj,
      pros: this.props.article.pros,
      cons: this.props.article.cons,
      specs: JSON.stringify(this.props.article.specs)
    };

    this.props.initialize(initData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.articleSaved) {
      this.context.router.goBack()
    }
  }

  componentWillUnmount() {
    this.props.dispatch({ type: CLEAR_ERROR });
  }

  closeModal() {
    this.props.toggleModal(true);
    this.context.router.goBack();
  }

  handleFormSubmit({ type, title, content, category, keywords, cover_img, specs, pros, cons }) {
    const keywordArray = [];
    for (let key in keywords) {
      if (keywords.hasOwnProperty(key) && keywords[key] === true) {
        keywordArray.push(key);
      }
    }

    type = parseInt(type);
    const id = this.props.article.id;
    this.props.updateArticle({ id, type, title, content, category, keywordArray, cover_img, specs, pros, cons })
  }

  render() {
    if (!this.props.article) {
      return <div><i className='fa fa-spinner' aria-hidden='true' /></div>;
    }

    const { handleSubmit } = this.props;

    return (
      <Modal
        isOpen={this.props.modalOpen}
        contentLabel='EditArticle'
        className='col-xs-10 col-md-8 col-lg-6 modal_box'
        shouldCloseOnOverlayClick={false}
        style={customStyles}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='edit_article_form'>
          <h3>Edit Article</h3>
          <div className='form-group col-sm-6'>
            <label htmlFor='type'>Type:</label>
            <Field name='type' component='select' type='text' className='form-control' id='typeSelect'>
              <option />
              <option value='1'>post</option>
              <option value='2'>review</option>
            </Field>
          </div>
          <div className='form-group col-sm-6'>
            <label htmlFor='title'>Title:</label>
            <Field name='title' component='input' type='text' className='form-control' />
          </div>
          <div className='form-group col-sm-12'>
            <label htmlFor='content'>Content:</label>
            <Field name='content' component='textarea' type='textarea' className='form-control' />
          </div>
          <div className='form-group col-sm-6'>
            <label htmlFor='cover_img'>Cover Image:</label>
            <Field name='cover_img' component='input' type='text' className='form-control' />
          </div>
          <div className='form-group col-sm-6'>
            <label htmlFor='category'>Category:</label>
            <Field name='category' component='select' className='form-control'>
              <option />
              <option value='monitors'>monitors</option>
              <option value='keyboards'>keyboards</option>
              <option value='mouse'>mouse</option>
              <option value='cpus'>CPUs</option>
              <option value='laptops'>laptops</option>
              <option value='printers'>printers</option>
              <option value='OS'>OS</option>
              <option value='tablets'>tablets</option>
              <option value='accessories'>accessories</option>
              <option value='gaming'>gaming</option>
            </Field>
          </div>
          <div className='col-sm-12 form-group'>
            <label>Keywords:</label>
          </div>
          <ul className='form-group col-sm-12 keywords_list'>
            {keywords.map((name, index) => {
              return (
                <li key={index}>
                  <label htmlFor={`keywords[${name}]`} className='checkbox_label'>{name}</label>
                  <Field name={`keywords[${name}]`} component='input' type='checkbox' />
                </li>
              )
            })}
          </ul>
          <h4 className='text-center'>For Reviews Only</h4>
          <div className='form-group col-sm-6'>
            <label htmlFor='pros'>Pros: (csv)</label>
            <Field name='pros' component='input' type='text' className='form-control' />
          </div>
          <div className='form-group col-sm-6'>
            <label htmlFor='cons'>Cons: (csv)</label>
            <Field name='cons' component='input' type='text' className='form-control' />
          </div>
          <div className='form-group col-sm-12'>
            <label htmlFor='specs'>Specs:</label>
            <Field name='specs' component='textarea' type='textarea' className='form-control' />
          </div>
          <button className='btn btn-default' type='button' onClick={() => this.closeModal()}>cancel</button>
          <button className='btn btn-default pull-right' type='submit'>save</button>
        </form>
        {this.renderAlert()}
      </Modal>
    )
  }
}

function mapStateToProps({ article }) {
  return {
    article: article.article,
    modalOpen: article.modalOpen,
    articleSaved: article.articleSaved,
    errorMessage: article.error,
    successMessage: article.success
  }
}

EditArticleModal = reduxForm({
  form: 'edit_article'
})(EditArticleModal);

export default connect(mapStateToProps, { updateArticle, toggleModal })(EditArticleModal);
