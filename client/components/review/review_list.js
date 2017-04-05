import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getArticles } from '../../actions/article_actions';
import { renderArticle } from '../article/render_article';

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
      <div className='review_list'>
        {this.props.allReviews.map(review => renderArticle(review))}
      </div>
    );
  }
}

function mapStateToProps({ article }) {
  return {
    allReviews: article.allReviews
  };
}

export default connect(mapStateToProps, { getArticles })(ReviewList);