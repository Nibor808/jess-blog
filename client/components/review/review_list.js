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
        className='review_item row'>
        <div className='list_img col-md-4'>
          <img src={`../../images/${reviewData.cover_img}`} height='220px' width='220px'/>
        </div>
        <div className='col-md-8 list_info'>
          <Link className='review_link' to={`review/${reviewData.id}`}><h2 className='list-title'>{reviewData.title}</h2></Link>
          <small>{reviewDate}</small>
          <p className='review_content'>{content}...</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='review_list'>
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