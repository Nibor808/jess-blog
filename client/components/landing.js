import React, { Component } from 'react';
import PostList from './posts_list';

export default class Landing extends Component {

  render() {
    return (
      <div className='col-md-3 col-md-offset-9'>
        <PostList/>
      </div>
    );
  }
};