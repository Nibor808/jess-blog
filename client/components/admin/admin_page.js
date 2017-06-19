import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateArticle from './create_article';
import Users from './get_users';
import Articles from './get_articles';
import Previews from './get_previews';

export default class AdminPage extends Component {
  render() {
    return (
      <div className='admin_page'>
        <div className='col-sm-8 admin_main'>
          <CreateArticle />
        </div>
        <div className='col-sm-4 side_bar'>
          <Users />
          <Previews />
          <Articles />
       </div>
      </div>
    )
  }
}
