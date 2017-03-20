import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAllReviews } from '../actions/review_actions';
import { Link } from 'react-router';
import { formatDate } from '../../utils/date_format';

class ReviewList extends Component {

  static propTypes = {
    getAllReviews: PropTypes.func,
    allReviews: PropTypes.array
  }

  componentWillMount() {
    this.props.getAllReviews();
  }

  renderReview(reviewData) {
    const reviewDate = formatDate(reviewData.createdAt);
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
      className='list-group col-md-4 review_list'>
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

export default connect(mapStateToProps, { getAllReviews })(ReviewList);