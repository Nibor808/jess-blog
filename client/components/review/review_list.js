import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getArticles } from '../../actions/article_actions';
import { renderArticleItem } from '../article/render_article_item';

class ReviewList extends Component {
  static propTypes = {
    allReviews: PropTypes.array,
    getArticles: PropTypes.func
  }

  componentWillMount() {
    this.props.getArticles(2);
  }

  render() {
    if (!this.props.allReviews) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    return (
      <div className='article_list'>
        {this.props.allReviews.map(review => this.props.renderArticleItem(review))}
      </div>
    );
  }
}

function mapStateToProps({ article }) {
  return {
    allReviews: article.allReviews
  };
}

export default connect(mapStateToProps, { getArticles, renderArticleItem })(ReviewList);