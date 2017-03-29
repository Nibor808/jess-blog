import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getPost } from '../../actions/post_actions';
import  { getComments } from '../../actions/comment_actions';
import { getImages } from '../../actions/image_actions';
import { formatDate } from '../../utils/date_format';
import { renderComments } from '../comment/comments_list';

class Post extends Component {

  static propTypes = {
    getPost: PropTypes.func,
    post: PropTypes.object,
    params: PropTypes.object,
    id: PropTypes.number,
    authenticated: PropTypes.bool
  }

  componentWillMount() {
    this.props.getPost(this.props.params.id);
    this.props.getComments('post_id', this.props.params.id);
    this.props.getImages('post_id', this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.getComments('post_id', this.props.post.id);
    }
  }

  renderSignin() {
    if (!this.props.authenticated) {
      return (
        <div className='col-md-6'>
          <Link to='/signin_post' className='pull-right login'>
            <button className='btn btn-default'>sign in to comment</button>
          </Link>
        </div>
      );
    }else {
      return (
        <div className='col-md-6'>
          <Link to='/addcomment_post' className='pull-right login'>
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
          <Link to='/signup_post'>
            <button type='button' className='btn btn-primary'>sign up</button>
          </Link>
        </div>
      );
    }
  }

  render() {
    if (!this.props.post || !this.props.commentArray || !this.props.imageArray) {
      return <div>Loading...</div>
    }

    const postDate = formatDate(this.props.post.createdAt);
    const src = `http://localhost:8080/images/${this.props.imageArray[0].file}`;

    return (
      <div>
        <div
        key={this.props.post.id}
        className='post_item'>
          <h1>{this.props.post.title}</h1>
          <small>posted: {postDate}</small>
          <p>{this.props.post.content}</p>
          <img src={src} height='400px' width='400px' />
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

function mapStateToProps({ posts, auth, comments, images }) {
  return {
    post: posts.post,
    authenticated: auth.authenticated,
    didSave: comments.commentSaved,
    commentArray: comments.commentArray,
    imageArray: images.imageArray
  };
}

export default connect(mapStateToProps, { getPost, getComments, getImages })(Post);