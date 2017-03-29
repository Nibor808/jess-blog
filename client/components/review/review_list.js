import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllReviews } from '../../actions/review_actions';
import { formatDate } from '../../utils/date_format';

class ReviewList extends Component {
  static propTypes = {
    allReviews: PropTypes.array,
    getAllReviews: PropTypes.func
  }

  componentWillMount() {
    this.props.getAllReviews();
  }

  renderReviews(reviewData) {
    const content = reviewData.content.substring(0, 250);
    const reviewDate = formatDate(reviewData.createdAt);
    return (
      <div
        key={reviewData.id}
        className='review_item'>
        <Link className='review_link' to={`review/${reviewData.id}`}><h2>{reviewData.title}</h2></Link>
        <small>{reviewDate}</small>
        <p className='review_content'>{content}...</p>
      </div>
    )
  }

  render() {
    return (
      <div className='col-md-8 review_list'>
        {this.props.allReviews.map(this.renderReviews)}
      </div>
    );
  }
}

function mapStateToProps({ reviews }) {
  return {
    allReviews: reviews.allReviews
  };
}

export default connect(mapStateToProps, { getAllReviews })(ReviewList);