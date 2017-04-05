import React, { Component } from 'react';
import CreateArticle from './create_article';
import Users from './get_users';

export default class AdminPage extends Component {
  render() {
    return (
      <div className='admin_page'>
        <div className='col-md-8 admin_main'>
          <CreateArticle />
        </div>
        <div className='col-md-4 side_bar'>
          <Users />
       </div>
      </div>
    )
  }
}