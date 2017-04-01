import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getPost } from '../../actions/post_actions';
import  { getComments, getCommentReplies } from '../../actions/comment_actions';
import { getImages } from '../../actions/image_actions';
import { formatDate } from '../../utils/date_format';
import { renderComments } from '../comment/comments_list';
import { renderSignin } from '../auth/render_signin';
import { renderSignup } from '../auth/renderSignup';

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
    this.props.getCommentReplies('parent_comment_id');
    this.props.getImages('post_id', this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.getComments('post_id', this.props.post.id);
      this.props.getCommentReplies('parent_comment_id');
    }
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
    if (!this.props.post || !this.props.commentArray || !this.props.imageArray || !this.props.repliesArray) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>
    }

    const postDate = formatDate(this.props.post.createdAt);

    return (
      <div>
        <div
        key={this.props.post.id}
        className='post'>
          <h1>{this.props.post.title}</h1>
          <small className='date'>posted: {postDate}</small>
          <p>{this.props.post.content}</p>
          <img src={`../../images/${this.props.imageArray[0].file}`} height='400px' width='400px' />
        </div>
        <div className='comments_section col-md-6'>
          <div className='row'>
            <div className='col-md-6'><h2>Comments:</h2></div>
            {renderSignin(this.props.authenticated, this.props.children, 'post')}
          </div>
          {this.hasComments()}
        </div>
        <div className='col-md-5 col-md-offset-1 auth_children'>
          {this.props.children}
          {renderSignup(this.props.authenticated, 'post')}
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
    repliesArray: comments.repliesArray,
    imageArray: images.imageArray
  };
}

export default connect(mapStateToProps, { getPost, getComments, getImages, getCommentReplies })(Post);