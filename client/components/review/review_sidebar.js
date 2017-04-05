import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getArticles }  from '../../actions/article_actions';
import { formatDate } from '../../utils/date_format';
import { renderArticleListItem } from '../article/render_article_list_item';

class ReviewSidebar extends Component {

  static propTypes = {
    getArticles: PropTypes.func,
    allReviews: PropTypes.array
  }

  componentWillMount() {
    this.props.getArticles(2);
  }

  render() {
    if (!this.props.allReviews) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    return (
      <ul
      className='list-group'>
        <li className='list-group-item'><h3 className='list_group_title'>Recent Reviews</h3></li>
        {this.props.allReviews.map(review => renderArticleListItem(review))}
      </ul>
    );
  }
}

function mapStateToProps({ article }) {
  return {
    allReviews: article.allReviews
  };
}

export default connect(mapStateToProps, { getArticles })(ReviewSidebar);