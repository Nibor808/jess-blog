import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { getPost } from '../actions/post_actions';
import { formatDate } from '../../utils/date_format';
import { renderComments } from './comments';

class Post extends Component {

  static propTypes = {
    getPost: PropTypes.func,
    post: PropTypes.object,
    params: PropTypes.object,
    id: PropTypes.number
  }

  componentWillMount() {
    this.props.getPost(this.props.params.id);
  }

  renderSignin() {
    if (!this.props.authenticated) {
      return (
        <div className='col-md-6'>
          <Link to='/signin' className='pull-right comment_login'>
            <button className='btn btn-default'>sign in to comment</button>
          </Link>
        </div>
      );
    }else {
      return (
        <div className='col-md-6'>
          <Link to='/addcomment' className='pull-right comment_login'>
            <button className='btn btn-default'>add a comment</button>
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
      </div>
    );
  }
}

function mapStateToProps({ posts, auth }) {
  return {
    post: posts.post,
    authenticated: auth.authenticated
  };
}

export default connect(mapStateToProps, { getPost })(Post);