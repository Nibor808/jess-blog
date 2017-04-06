import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <div className='col-md-12 footer'>
        <div className='col-md-4'>
          <Link to='/'>posts</Link>
          <Link to='/reviews'>reviews</Link>
          <Link to='/questions'>questions</Link>
          <Link to='/'>about</Link>
        </div>
      </div>
    )
  }
}