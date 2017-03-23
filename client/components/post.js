import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { getPost } from '../actions/post_actions';
import { formatDate } from '../utils/date_format';
import { renderComments } from './comments';

class Post extends Component {

  static propTypes = {
    getPost: PropTypes.func,
    post: PropTypes.object,
    params: PropTypes.object,
    id: PropTypes.number,
    authenticated: PropTypes.bool
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.getPost(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave !== this.props.didSave) {
      this.props.getPost(this.props.post.postId);
    }
  }

  renderSignin() {
    if (!this.props.authenticated) {
      return (
        <div className='col-md-6'>
          <Link to='/signin_post' className='pull-right comment_login'>
            <button className='btn btn-default'>sign in to comment</button>
          </Link>
        </div>
      );
    }else {
      return (
        <div className='col-md-6'>
          <Link to='/addcomment_post' className='pull-right comment_login'>
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
    if (!this.props.post) {
      return <div>Loading...</div>
    }

    const postDate = formatDate(this.props.post.createdAt);

    return (
      <div>
        <div
        key={this.props.post.postId}
        className='post_item'>
          <h1>{this.props.post.postTitle}</h1>
          <small>posted: {postDate}</small>
          <p>{this.props.post.postContent}</p>
        </div>
        <div className='comments_section col-md-6'>
          <div className='row'>
            <div className='col-md-6'><h3>Comments:</h3></div>
            {this.renderSignin()}
          </div>
          <ul className='comments_list'>
            {this.props.post.comments.map(comment => renderComments(comment))}
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

function mapStateToProps({ posts, auth, comments }) {
  return {
    post: posts.post,
    authenticated: auth.authenticated,
    didSave: comments.commentSaved
  };
}

export default connect(mapStateToProps, { getPost })(Post);