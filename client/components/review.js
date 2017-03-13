import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../utils/date_format';
import { getReview } from '../actions/review_actions';
import { renderComments } from './comments';
import { renderSpecs } from './specs';

class Review extends Component {
  static propTypes = {
    getReview: PropTypes.func,
    params: PropTypes.object,
    id: PropTypes.number,
    review: PropTypes.object
  }

  componentWillMount() {
    this.props.getReview(this.props.params.id);
  }

  render() {
    if (!this.props.review) {
      return <div>Loading...</div>
    }
    const reviewDate = formatDate(this.props.review.createdAt);
    return (
      <div>
        <div
        key={this.props.review.reviewId}
        className='review_item'>
          <h1>{this.props.review.reviewTitle}</h1>
          <small>posted: {reviewDate}</small>
          <div className='row'>
            <div className='col-md-6'>
              <h3>Pros</h3>
              <p>{this.props.review.pros}</p>
            </div>
            <div className='col-md-6'>
              <h3>Cons</h3>
              <p>{this.props.review.cons}</p>
            </div>
          </div>
          <p>{this.props.review.reviewContent}</p>
          <div>{renderSpecs(this.props.review.specs)}</div>
        </div>
        <ul className='col-md-6 comments_list'>
          {this.props.review.comments.map(comment => renderComments(comment))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ reviews }) {
  console.log(reviews.review)
  return {
    review: reviews.review
  };
}

export default connect(mapStateToProps, { getReview })(Review);