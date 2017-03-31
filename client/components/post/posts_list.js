import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllPosts } from '../../actions/post_actions';
import { formatDate } from '../../utils/date_format';

class PostsList extends Component {
  static propTypes = {
    allPosts: PropTypes.array,
    getAllPosts: PropTypes.func
  }

  componentWillMount() {
    this.props.getAllPosts();
  }

  renderPosts(postData) {
    const content = postData.content.substring(0, 250);
    const postDate = formatDate(postData.createdAt);

    return (
      <div
        key={postData.id}
        className='post_item'>
          <Link className='posts_link' to={`post/${postData.id}`}><h2 className='list-title'>{postData.title}</h2></Link>
          <small>{postDate}</small>
          <p className='post_content'>{content}...</p>
        </div>
    )
  }

  render() {
    if (!this.props.allPosts) {
      return <div>Loading...</div>
    }

    return (
      <div className='post_list'>
        {this.props.allPosts.map(this.renderPosts)}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    allPosts: posts.allPosts
  };
}

export default connect(mapStateToProps, { getAllPosts })(PostsList);