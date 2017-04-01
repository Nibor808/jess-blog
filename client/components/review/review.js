import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { formatDate } from '../../utils/date_format';
import { getReview } from '../../actions/review_actions';
import { getComments, getCommentReplies } from '../../actions/comment_actions';
import { getImages } from '../../actions/image_actions';
import { renderComments } from '../comment/comments_list';
import { renderSignin } from '../auth/render_signin';
import { renderSignup } from '../auth/renderSignup';

class Review extends Component {
  static propTypes = {
    getReview: PropTypes.func,
    params: PropTypes.object,
    id: PropTypes.number,
    review: PropTypes.object,
    authenticated: PropTypes.bool
  }

  componentWillMount() {
    this.props.getReview(this.props.params.id);
    this.props.getComments('review_id', this.props.params.id);
    this.props.getCommentReplies('parent_comment_id');
    this.props.getImages('review_id', this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.getComments('review_id', this.props.review.id);
      this.props.getCommentReplies('parent_comment_id');
    }
  }

  renderSpecs(specs) {
    const specsList = [];

    for (let item in specs) {
      if (specs.hasOwnProperty(item)) {
        const formattedItem = item.replace(new RegExp('_', 'g'), ' ');
        specsList.push(`${formattedItem}: ${specs[item]}`);
      }
    }
    return specsList.map((spec, index) => <li key={index}>{spec}</li>);
  }

  hasComments() {
    if (!this.props.commentArray) {
      return <p className='col-md-6'>Be the first to comment.</p>
    }else {
      return (
        <ul className='comments_list'>
          {renderComments(this.props.commentArray, this.props.repliesArray)}
        </ul>
      )
    }
  }

  render() {
    if (!this.props.review || !this.props.commentArray || !this.props.imageArray) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    const reviewDate = formatDate(this.props.review.createdAt);

    return (
      <div>
        <div
        key={this.props.review.id}
        className='review col-md-12'>
          <div className='row'>
            <h1>{this.props.review.title}</h1>
          </div>
          <div className='row date'>
            <small>posted: {reviewDate}</small>
          </div>
          <div className='row'>
            <img src={`../../images/${this.props.imageArray[0].file}`} height='400px' width='400px' />
          </div>
          <div className='row proscons'>
            <div className='col-md-6'>
              <h3>Pros</h3>
              <p>{this.props.review.pros}</p>
            </div>
            <div className='col-md-6'>
              <h3>Cons</h3>
              <p>{this.props.review.cons}</p>
            </div>
          </div>
          <p>{this.props.review.content}</p>
          <h3>Specs</h3>
          <ul className='col-md-12 specs_list'>
            {this.renderSpecs(this.props.review.specs)}
          </ul>
        </div>
        <div className='comments_section col-md-6'>
          <div className='row'>
            <div className='col-md-6'><h2>Comments:</h2></div>
            {renderSignin(this.props.authenticated, this.props.children, 'review')}
          </div>
          {this.hasComments()}
        </div>
        <div className='col-md-5 col-md-offset-1 auth_children'>
          {this.props.children}
          {renderSignup(this.props.authenticated, 'review')}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ reviews, auth, comments, images }) {
  return {
    review: reviews.review,
    authenticated: auth.authenticated,
    didSave: comments.commentSaved,
    commentArray: comments.commentArray,
    repliesArray: comments.repliesArray,
    imageArray: images.imageArray
  };
}

export default connect(mapStateToProps, { getReview, getComments, getImages, getCommentReplies })(Review);