import React from 'react';
import { formatDate } from '../../utils/date_format';

export function renderComments(commentData) {
  const commentDate = formatDate(commentData.commentCreatedAt);

  return (
    <li
    key={commentData.commentId}
    className='comment_item'>
      <h4>{commentData.commentTitle}</h4>
      <p>{commentData.commentContent}</p>
      <small>posted: {commentDate} by: {commentData.username}</small>
      <hr />
    </li>
  );
}