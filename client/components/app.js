import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';

class App extends Component {
  render() {
    const { routes } = this.props.route;

    return (
      <div className='container'>
        <Header />
        {renderRoutes(routes)}
        <Footer />
      </div>
    )
  }
}

export default connect(null)(App);
