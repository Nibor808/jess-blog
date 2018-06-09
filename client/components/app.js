import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from './header';
import Footer from './footer';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div className='container'>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
