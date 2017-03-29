import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllReviews } from '../../actions/review_actions';
import { formatDate } from '../../utils/date_format';

class ReviewSidebar extends Component {

  static propTypes = {
    getAllReviews: PropTypes.func,
    allReviews: PropTypes.array
  }

  componentWillMount() {
    this.props.getAllReviews();
  }

  renderReview(reviewData) {
    const reviewDate = formatDate(reviewData.createdAt);
    if (reviewData.title.length > 20) {
      reviewData.title = reviewData.title.substring(0, 20) + '...';
    }
    return (
      <li
      key={reviewData.id}
      className='list-group-item'>
        <Link className='review_link' to={`/review/${reviewData.id}`}>{reviewData.title}</Link>
        <small className='pull-right'>{reviewDate}</small>
      </li>
    );
  }

  render() {
    return (
      <ul
      className='list-group col-md-4 review_sidebar'>
        <li className='list-group-item'><h2>Recent Reviews</h2></li>
        {this.props.allReviews.map(this.renderReview)}
      </ul>
    );
  }
}

function mapStateToProps({ reviews }) {
  return {
    allReviews: reviews.allReviews
  };
}

export default connect(mapStateToProps, { getAllReviews })(ReviewSidebar);