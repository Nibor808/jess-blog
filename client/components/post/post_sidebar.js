import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getArticles } from '../../actions/article_actions';
import { renderArticleListItem } from '../article/render_article_list_item';

class PostSidebar extends Component {

  static propTypes = {
    getArticles: PropTypes.func,
    allPosts: PropTypes.array
  }

  componentWillMount() {
    this.props.getArticles(1);
  }

  render() {
    if (!this.props.allPosts) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    return (
      <ul
        className='list-group'>
        <li className='list-group-item'><h3 className='list_group_title'>Recent Posts</h3></li>
        {this.props.allPosts.map(post => renderArticleListItem(post))}
      </ul>
    );
  }
}

function mapStateToProps({ article }) {
  return {
    allPosts: article.allPosts
  };
}

export default connect(mapStateToProps, { getArticles })(PostSidebar);
