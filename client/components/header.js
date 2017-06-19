import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signoutUser } from '../actions/user_actions';
import { ADMIN_USER } from '../config/config.json';

class Header extends Component {

  static propTypes = {
    authenticated: PropTypes.bool,
    user: PropTypes.string,
    signoutUser: PropTypes.func
  }


  renderNavRight() {
    const user = this.props.user ? this.props.user : localStorage.getItem('user');
    const btnStyle = {
      margin: -10
    }

    if (this.props.authenticated && user === `${ADMIN_USER}`) {
      return (
        <div className='signout_div'>
          <small>signed in as: { user }</small>
          <Link className='signout_btn' onClick={this.props.signoutUser}><small>sign out</small></Link>
          <Link to='/admin'><small>admin</small></Link>
        </div>
      );
    }else if (this.props.authenticated) {
      return (
        <div className='signout_div'>
          signed in as: { user }
          <Link className='signout_btn' onClick={this.props.signoutUser}><small>sign out</small></Link>
        </div>
      );
    }else {
      return (
        <div className='signout_div' style={ btnStyle }>
          <Link to='/signup'><button className='btn btn-default nav_signup'>Join The Conversation</button></Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='row header_box'>
        <div className='logo_box'>
          <h2 className='logo'>JessTech</h2>
        </div>
        <div className='nav_box'>
          <div className='row'>
            <i className='fa fa-linkedin-square fa-2x pull-right' aria-hidden='true'></i>
            <i className='fa fa-youtube-square fa-2x pull-right' aria-hidden='true'></i>
            <i className='fa fa-twitter-square fa-2x pull-right' aria-hidden='true'></i>
          </div>
          <nav className='navbar navbar-default'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#main_nav' aria-expanded='false'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
            </div>
            <div className='collapse navbar-collapse' id='main_nav'>
              <ul className='nav navbar-nav'>
                <li>
                  <Link to='/' data-toggle="collapse" data-target=".navbar-collapse.in">
                  <i className='fa fa-clipboard fa-2x' aria-hidden='true'></i>
                    <span>Posts</span>
                  </Link>
                </li>
                <li>
                  <Link to='/reviews' data-toggle="collapse" data-target=".navbar-collapse.in">
                  <i className='fa fa-thumb-tack fa-2x' aria-hidden='true'></i>
                    <span>Reviews</span>
                  </Link>
                </li>
                <li>
                  <Link to='/questions' data-toggle="collapse" data-target=".navbar-collapse.in">
                  <i className='fa fa-question fa-2x' aria-hidden='true'></i>
                    <span>Q&A</span>
                  </Link>
                </li>
                <li>
                  <Link to='/about' data-toggle="collapse" data-target=".navbar-collapse.in">
                  <i className='fa fa-female fa-2x' aria-hidden='true'></i>
                    <span>About Me</span>
                  </Link>
                </li>
                <li>
                  <Link to='/search' data-toggle="collapse" data-target=".navbar-collapse.in">
                  <i className='fa fa-search fa-2x' aria-hidden='true'></i>
                    <span>Search</span>
                  </Link>
                </li>
              </ul>
              <div className='nav navbar-nav navbar-right'>
                {this.renderNavRight()}
              </div>
            </div>
          </nav>
        </div>
      </div>
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
