import React from 'react';
import { Link } from 'react-router';
import { formatDate } from '../../utils/date_format';

export function renderComments(commentData) {
  const commentDate = formatDate(commentData.commentCreatedAt);
  const user = localStorage.getItem('user');
  let type;
  if (commentData.commentPostId !== null) {
    type = 'post'
  }else if (commentData.commentReviewId !== null) {
    type = 'review'
  }else {
    type = 'question'
  }
  let editDiv;
  if (user) {
    editDiv = <small><Link to={`/replytocomment/${commentData.commentId}`}>reply</Link></small>
  }
  if (user && user === commentData.username) {
    editDiv = <small><Link to={`/editcomment_${type}/${commentData.commentId}`}>edit</Link> <Link to={`/replytocomment/${commentData.commentId}`}>reply</Link></small>
  }

  return (
    <li
    key={commentData.commentId}
    className='comment_item'>
      <h4>{commentData.commentTitle}</h4>
      <p>{commentData.commentContent}</p>
      <small>posted: {commentDate} by: {commentData.username}</small>
      <p className='pull-right'>{editDiv}</p>
      <hr />
    </li>
  );
}