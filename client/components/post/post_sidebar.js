import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllPosts } from '../../actions/post_actions';
import { formatDate } from '../../utils/date_format';

class PostSidebar extends Component {

  static propTypes = {
    getAllPosts: PropTypes.func,
    allPosts: PropTypes.array
  }

  componentWillMount() {
    this.props.getAllPosts();
  }

  renderPostList(postData) {
    const postDate = formatDate(postData.createdAt);
    if (postData.title.length > 20) {
      postData.title = postData.title.substring(0, 20) + '...';
    }
    return (
      <li
      key={postData.id}
      className='list-group-item'>
        <Link className='post_link' to={`/post/${postData.id}`}>{postData.title}</Link>
        <small className='pull-right'>{postDate}</small>
      </li>
    );
  }

  render() {
    return (
      <ul
      className='list-group col-md-4 post_sidebar'>
        <li className='list-group-item'><h2>Recent Posts</h2></li>
        {this.props.allPosts.map(this.renderPostList)}
      </ul>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    allPosts: posts.allPosts
  };
}

export default connect(mapStateToProps, { getAllPosts })(PostSidebar);