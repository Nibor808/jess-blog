import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getArticles }  from '../../actions/article_actions';
// import { getAllReviews } from '../../actions/review_actions';
import { formatDate } from '../../utils/date_format';

class ReviewSidebar extends Component {

  static propTypes = {
    getAllReviews: PropTypes.func,
    allReviews: PropTypes.array
  }

  componentWillMount() {
    this.props.getArticles(2);
  }

  renderReview(reviewData) {
    const reviewDate = formatDate(reviewData.createdAt).substring(0, 15);
    if (reviewData.title.length > 25) {
      reviewData.title = reviewData.title.substring(0, 25) + '...';
    }
    return (
      <li
      key={reviewData.id}
      className='list-group-item'>
      <img src={`../../images/${reviewData.cover_img}`} height='40px' width='40px'/>
        <Link className='review_link' to={`/article/${reviewData.id}`}>{reviewData.title}</Link>
        <small className='pull-right'>{reviewDate}</small>
      </li>
    );
  }

  render() {
    if (!this.props.allReviews) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    return (
      <ul
      className='list-group'>
        <li className='list-group-item'><h3 className='list_group_title'>Recent Reviews</h3></li>
        {this.props.allReviews.map(this.renderReview)}
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