import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signoutUser } from '../actions/user_actions';

class Header extends Component {

  static propTypes = {
    authenticated: PropTypes.bool,
    user: PropTypes.string,
    signoutUser: PropTypes.func
  }

  renderNavRight() {
    const user = localStorage.getItem('user');
    if (this.props.authenticated) {
      return (
        <div className='signout_div'>
          signed in as: { user ? user: this.props.user }
          <button className='btn btn-default signout_btn' onClick={this.props.signoutUser}>sign out</button>
        </div>
      );
    }
  }

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
              <li><a href='/'>Posts</a></li>
              <li><a href='/reviews'>Reviews</a></li>
              <li><a href='/questions'>Q&A</a></li>
            </ul>
            <div className='nav navbar-nav navbar-right'>
              {this.renderNavRight()}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated,
    user: auth.user
  }
}

export default connect(mapStateToProps, { signoutUser })(Header);