import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
  render() {
    return (
      <div className='col-xs-12 footer'>
        <hr className='color_bar' />
        <div className='col-md-4'>
          <Link to='/'>posts</Link>
          <Link to='/reviews'>reviews</Link>
          <Link to='/questions'>questions</Link>
          <Link to='/about'>about</Link>
        </div>
      </div>
    )
  }
}
