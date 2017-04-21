import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAllArticles } from '../../actions/article_actions';
import { renderArticleListItem } from '../article/render_article_list_item';

class GetArticles extends Component {

  static propTypes = {
    getAllArticles: PropTypes.func,
    allArticles: PropTypes.array,
    errorMessage: PropTypes.string,
    didSave: PropTypes.bool,
    didDelete: PropTypes.bool
  }

  componentWillMount() {
    // where isPreview = false(0)
    this.props.getAllArticles(0)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave || nextProps.didDelete) {
      this.props.getAllArticles(0)
    }
  }

  render() {
    if (!this.props.allArticles) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    return (
      <ul className='list-group'>
        <li className='list-group-item'><h3 className='list_group_title'>Articles</h3></li>
        {this.props.allArticles.map(article => renderArticleListItem(article, true))}
      </ul>
    );
  }
}

function mapStateToProps({ admin, article }) {
  return {
    allArticles: admin.allArticles,
    didSave: article.articleSaved,
    didDelete: article.articleDeleted,
    errorMessage: admin.error
  };
}

export default connect(mapStateToProps, { getAllArticles })(GetArticles);
