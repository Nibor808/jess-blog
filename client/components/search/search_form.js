import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { connect } from 'react-redux';
import { search, resetSearch } from '../../actions/search_actions';
import { keywords } from '../../config/keywords';
import { renderArticleItem } from '../article//render_article_item';
import { CLEAR_ERROR } from '../../actions/types';

class SearchForm extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger col-md-12'>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  renderResults() {
    if (this.props.searchResult) {
      return (
        <div className='article_list'>
          {this.props.searchResult.map(result => renderArticleItem(result))}
        </div>
      )
    }
  }

  clearResults() {
    this.props.reset('search_article');
    this.props.resetSearch();
    this.props.dispatch({ type: CLEAR_ERROR });
  }

  renderSearchBtn(submitting) {
    if (!this.props.searchResult.length > 0) {
      return <button className='btn btn-default pull-right' type='submit' disabled={submitting}>search</button>;
    }
  }

  handleFormSubmit({ keywords }) {
    const keywordArray = keywords.split(',');
    this.props.search({ keywordArray });
  }

  render() {
    const { handleSubmit, submitting, reset } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='search_form'>
          <div className='form-group'>
            <h4>Keywords:</h4>
            <p>Enter keywords separated by a comma. (price,compare,monitor)</p>
            <p>Or a product name. (Phillips LCD-243V5)</p>
          </div>
          <div className='form-group'>
            <Field type='text' component='input' name='keywords' />
          </div>
          <button className='btn btn-default' type='button' onClick={() => this.clearResults()}>clear search</button>
          {this.renderSearchBtn(submitting)}
        </form>
        {this.renderAlert()}
        {this.renderResults()}
      </div>
    )
  }
}

SearchForm = reduxForm({
  form: 'search_form'
})(SearchForm);

function mapStateToProps({ search }) {
  return {
    searchResult: search.searchResult,
    errorMessage: search.error
  }
}

export default connect(mapStateToProps, { search, resetSearch })(SearchForm);
