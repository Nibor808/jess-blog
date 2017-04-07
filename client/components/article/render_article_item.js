import React from 'react'
import { Link } from 'react-router';
import { formatDate } from '../../utils/date_format';

export function renderArticleItem(article) {
  let content;
  if (article.content.length > 250) {
    content = article.content.substring(0, 250) + '...';
  }else {
    content = article.content;
  }

  const date = formatDate(article.createdAt);

  if (article.cover_img) {
    return (
      <div
      key={article.id}
      className='article_item row'>
        <div className='col-md-4'>
          <img src={`../../images/${article.cover_img}`} height='220px' width='220px'/>
        </div>
        <div className='col-md-8 article_info'>
          <Link to={`article/${article.id}`}><h2 className='list-title'>{article.title}</h2></Link>
          <small className='date'>{date}</small>
          <p className='article_content'>{content}...</p>
        </div>
      </div>
    );
  }else {
    return (
      <div
      key={article.id}
      className='article_item row'>
      <div className='col-md-12 list_info'>
        <Link to={`article/${article.id}`}><h2 className='list-title'>{article.title}</h2></Link>
        <small className='date'>{date}</small>
        <p className='article_content'>{content}</p>
      </div>
    </div>
    );
  }
}