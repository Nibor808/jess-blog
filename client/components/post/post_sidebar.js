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
    const postDate = formatDate(postData.createdAt).substring(0, 15);
    if (postData.title.length > 25) {
      postData.title = postData.title.substring(0, 25) + '...';
    }
    return (
      <li
      key={postData.id}
      className='list-group-item'>
        <img src={`../../images/${postData.cover_img}`} height='40px' width='40px'/>
        <Link className='post_link' to={`/post/${postData.id}`}>{postData.title}</Link>
        <small className='pull-right'>{postDate}</small>
      </li>
    );
  }

  render() {
    return (
      <ul
      className='list-group'>
        <li className='list-group-item'><h3 className='list_group_title'>Recent Posts</h3></li>
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