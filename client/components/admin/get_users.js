import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/user_actions';

class Users extends Component {

  componentWillMount() {
    this.props.getUsers()
  }

  renderUsers(user) {
    return (
      <li key={user.id}
      className='list-group-item'>
        <div>email: {user.email}</div>
        <div>username: {user.username}</div>
      </li>
    )
  }

  render() {
    if (!this.props.users) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    return (
      <ul className='list-group'>
        <li className='list-group-item'><h3 className='list_group_title'>Users</h3></li>
        {this.props.users.map(user => this.renderUsers(user))}
      </ul>
    )
  }
}

function mapStateToProps({ admin }) {
  return {
    users: admin.users
  }
}

export default connect(mapStateToProps, { getUsers })(Users);