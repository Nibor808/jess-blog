import React, { Component } from 'react';

export default class Header extends Component {

  render() {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#main-nav' aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
          </div>

          <div className='collapse navbar-collapse' id='main-nav'>
            <ul className='nav navbar-nav'>
              <li><a href='/'>Home</a></li>
              <li><a href='!#'>Reviews</a></li>
              <li><a href='!#'>Q&A</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}