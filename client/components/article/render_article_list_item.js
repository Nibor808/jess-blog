import React from 'react';
import { Link } from 'react-router';
import { formatDate } from '../../utils/date_format';

export function renderArticleListItem(article, isAdmin) {
  const date = formatDate(article.createdAt).substring(0, 15);

  if (article.title.length > 19) {
    article.title = article.title.substring(0, 19) + '...';
  }

  if (article.cover_img && !isAdmin) {
    return (
      <li
      key={article.id}
      className='list-group-item'>
        <div className='col-md-7'>
          <img src={`../../images/${article.cover_img}`} height='40px' width='40px'/>
          <Link className='article_link' to={`/article/${article.id}`}>{article.title}</Link>
        </div>
        <div className='col-md-5'>
          <small className='pull-right'>{date}</small>
        </div>
      </li>
    );
  }else if (isAdmin) {
    return (
      <li
      key={article.id}
      className='list-group-item'>
        <div className='col-md-5'>
          <Link className='article_link' to={`/article/${article.id}`}>{article.title}</Link>
        </div>
        <div className='col-md-7'>
          <small>{date}</small>
          <Link className='pull-right' to={`/deletearticle/${article.id}`}>delete</Link>
        </div>
      </li>
    );
  }else {
    return (
      <li
      key={article.id}
      className='list-group-item'>
        <Link className='article_link' to={`/article/${article.id}`}>{article.title}</Link>
        <small className='pull-right'>{date}</small>
      </li>
    );
  }
}
