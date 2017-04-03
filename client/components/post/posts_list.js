import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import  { Link } from 'react-router';
import { getArticles } from '../../actions/article_actions';
import { renderArticle } from '../article/render_article';
import { formatDate } from '../../utils/date_format';

class PostList extends Component {

  componentWillMount() {
    this.props.getArticles(1);
  }

  render() {
    if (!this.props.allPosts) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    return (
      <div className='article_list'>
        {this.props.allPosts.map(post => renderArticle(post))}
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