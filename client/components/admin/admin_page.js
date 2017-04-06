import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateArticle from './create_article';
import Users from './get_users';
import Articles from './get_articles';
import Previews from './get_previews';
import DeleteArticle from './delete_article';
import EditArticle from './edit_article';

export default class AdminPage extends Component {
  render() {
    return (
      <div className='admin_page'>
        <div className='col-md-8 admin_main'>
          <CreateArticle />
          <div className='col-md-3'>
            <DeleteArticle />
          </div>
          <div className='col-md-3'>
            <EditArticle />
          </div>
        </div>
        <div className='col-md-4 side_bar'>
          <Users />
          <Previews />
          <Articles />
       </div>
      </div>
    )
  }
}