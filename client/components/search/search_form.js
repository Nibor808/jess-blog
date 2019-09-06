import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field, reset } from 'redux-form';
import { connect } from 'react-redux';
import { search, resetSearch } from '../../actions/search_actions';
import { renderArticleItem } from '../article/render_article_item';
import { CLEAR_ERROR } from '../../actions/types';

class SearchForm extends Component {

  static propTypes = {
    errorMessage: PropTypes.string,
    searchResult: PropTypes.array,
    resetSearch: PropTypes.func,
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    search: PropTypes.func
  };

  componentWillMount() {
    this.props.resetSearch();
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
    reset('search_article');
    this.props.resetSearch();
    this.props.dispatch({ type: CLEAR_ERROR });
  }

  renderSearchBtn(submitting) {
    if (!this.props.searchResult.length > 0) {
      return <button className='btn btn-default pull-right' type='submit' disabled={submitting}>search</button>;
    }
  }

  handleFormSubmit({ keywords }) {
    if (keywords) {
      const keywordArray = keywords.split(' ');
      this.props.search({ keywordArray });
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className='search_form'>
          <div className='form-group'>
            <p>Enter keywords or a product name.</p>
          </div>
          <div className='form-group'>
            <Field type='text' component='input' name='keywords' disabled={this.props.searchResult.length > 0} />
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

function mapStateToProps({ search }) {
  return {
    searchResult: search.searchResult,
    errorMessage: search.error
  }
}

export default reduxForm({
  form: 'search_form'
})(connect(mapStateToProps, { search, resetSearch })(SearchForm));
