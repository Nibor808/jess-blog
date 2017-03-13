import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
        <ul className='col-md-6 comments_list'>
          {this.props.post.comments.map(comment => renderComments(comment))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    post: posts.post
  };
}

export default connect(mapStateToProps, { getPost })(Post);