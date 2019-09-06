import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getArticles } from '../../actions/article_actions';
import { renderArticleItem } from '../article/render_article_item';

class PostList extends Component {

  static propTypes = {
    getArticles: PropTypes.func,
    allPosts: PropTypes.array
  };

  componentWillMount() {
    this.props.getArticles(1);
  }

  render() {
    if (!this.props.allPosts) {
      return <div><i className="fa fa-spinner" aria-hidden="true" /></div>;
    }

    return (
      <div className="article_list">
        {this.props.allPosts.map(post => renderArticleItem(post))}
      </div>
    );
  }
}

function mapStateToProps({ article }) {
  return {
    allPosts: article.allPosts
  }
}

export default connect(mapStateToProps, { getArticles })(PostList);
