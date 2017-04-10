import React, { Component, PropTypes } from 'react';
import { Parallax } from 'react-parallax';
import Header from './header';
import Footer from './footer';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div className='container'>
          <Header/>
          {this.props.children}
          <Footer />
        </div>
    )
  }
}
