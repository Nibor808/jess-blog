import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from '../actions/index';

class PostsList extends Component {
    static propTypes = {
    all: PropTypes.array,
    getAllPosts: PropTypes.func
  }

  componentWillMount() {
    this.props.getAllPosts();
  }

  renderPosts(postData) {
    const title = postData.title;

    return (
      <li
      key={postData.id}
      className='list-group-item'>
      {title}
      </li>
    )
  }

  render() {
    return (
      <ul
      className='list-group'>
      <li className='list-group-item'><h2>Recent Posts</h2></li>
      {this.props.all.map(this.renderPosts)}
      </ul>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    all: posts.all
  };
}

export default connect(mapStateToProps, { getAllPosts })(PostsList);