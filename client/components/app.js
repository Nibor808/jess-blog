import React, { Component, PropTypes } from 'react';
import Header from './header';
import Footer from './footer';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div className='container'>
        <h1 className='logo'>JessTech</h1>
        <Header/>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}