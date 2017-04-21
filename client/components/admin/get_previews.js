import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAllArticles } from '../../actions/article_actions';
import { renderArticleListItem } from '../article/render_article_list_item';

class GetPreviews extends Component {

  static propTypes = {
    getAllArticles: PropTypes.func,
    allPreviews: PropTypes.array,
    errorMessage: PropTypes.string,
    didSave: PropTypes.bool,
    didDelete: PropTypes.bool
  }

  componentWillMount() {
    // where isPreview = true(1)
    this.props.getAllArticles(1)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave || nextProps.didDelete) {
      this.props.getAllArticles(1)
    }
  }

  render() {
    if (!this.props.allPreviews) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    return (
      <ul className='list-group'>
        <li className='list-group-item'><h3 className='list_group_title'>Preview Articles</h3></li>
        {this.props.allPreviews.map(preview_article => renderArticleListItem(preview_article, true))}
      </ul>
    );
  }
}

function mapStateToProps({ admin, article }) {
  return {
    allPreviews: admin.allPreviews,
    didSave: article.articleSaved,
    didDelete: article.articleDeleted,
    errorMessage: admin.error
  };
}

export default connect(mapStateToProps, { getAllArticles })(GetPreviews);
