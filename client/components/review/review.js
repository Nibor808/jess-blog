import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { formatDate } from '../../utils/date_format';
import { getReview } from '../../actions/review_actions';
import { getComments } from '../../actions/comment_actions';
import { getImages } from '../../actions/image_actions';
import { renderComments } from '../comment/comments_list';

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
    this.props.getImages('review_id', this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.getComments('review_id', this.props.review.id);
    }
  }

  renderSignin() {
    if (!this.props.authenticated) {
      return (
        <div className='col-md-6'>
          <Link to='/signin_review' className='pull-right login'>
            <button className='btn btn-default'>sign in to comment</button>
          </Link>
        </div>
      );
    }else {
      return (
        <div className='col-md-6'>
          <Link to='/addcomment_review' className='pull-right login'>
            <button className='btn btn-default'>add a comment</button>
          </Link>
        </div>
      );
    }
  }

  renderSignup() {
    if (!this.props.authenticated) {
      return (
        <div className='signup_prompt text-center'>
          <h3>Not already part of the converstation?</h3>
          <Link to='/signup_review'>
            <button type='button' className='btn btn-primary'>sign up</button>
          </Link>
        </div>
      );
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

  render() {
    if (!this.props.review || !this.props.commentArray || !this.props.imageArray) {
      return <div>Loading...</div>;
    }

    const reviewDate = formatDate(this.props.review.createdAt);
    const src = `http://localhost:8080/images/${this.props.imageArray[0].file}`;

    return (
      <div>
        <div
        key={this.props.review.id}
        className='review_item col-md-12'>
          <div className='row'>
            <h1>{this.props.review.title}</h1>
          </div>
          <div className='row date'>
            <small>posted: {reviewDate}</small>
          </div>
          <div className='row'>
            <img src={src} height='400px' width='400px' />
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
            <div className='col-md-6'><h3>Comments:</h3></div>
            {this.renderSignin()}
          </div>
          <ul className='comments_list'>
            {this.props.commentArray.map(comment => renderComments(comment))}
          </ul>
        </div>
        <div className='col-md-5 col-md-offset-1 auth_children'>
          {this.props.children}
          {this.renderSignup()}
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
    imageArray: images.imageArray
  };
}

export default connect(mapStateToProps, { getReview, getComments, getImages })(Review);