import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/date_format';

export function renderComments(commentArray, repliesArray) {
  const listElement = [];
  let replyList = [];

  commentArray.map(comment => {
    const commentDate = formatDate(comment.createdAt);
    const user = localStorage.getItem('user');

    let editDiv;

    if (user && user === comment.username || user === 'Admin') {
      editDiv = <small>
        <Link to={`/deletecomment/${comment.id}`} className='edit_link'>delete</Link>
        <Link to={`/editcomment/${comment.id}`} className='edit_link'>edit</Link>
        <Link to={`/replytocomment/${comment.id}`}>reply</Link>
      </small>
    } else if (user) {
      editDiv = <small>
        <Link to={`/replytocomment/${comment.id}`}>reply</Link>
      </small>
    }

    // map over replies and attach each to it's parent comment
    if (repliesArray) {
      repliesArray.map(reply => {
        const replyDate = formatDate(reply.createdAt);
        const user = localStorage.getItem('user');

        let editDiv;

        if (user && user === reply.username || user === 'Admin') {
          editDiv = <small>
            <Link to={`/deletecomment/${reply.id}`} className='edit_link'>delete</Link>
            <Link to={`/editcomment/${reply.id}`} className='edit_link'>edit</Link>
          </small>
        }

        if (reply.parent_comment_id === comment.id) {
          replyList.push(<li
            key={Math.random()}>
            <h4>{reply.title}</h4>
            <p className='comment_content'>{reply.content}</p>
            <small>posted: {replyDate} by: {reply.username}</small>
            <div className='pull-right'>{editDiv}</div>
            <hr />
          </li>
          )
        }
      });
    }

    // build comment
    listElement.push(
      <li
        key={comment.id}
        className='comment_item'>
        <h4>{comment.title}</h4>
        <p className='comment_content'>{comment.content}</p>
        <small>posted: {commentDate} by: {comment.username}</small>
        <p className='pull-right'>{editDiv}</p>
        <hr />
        <ul className='reply_list'>
          {replyList}
        </ul>
      </li>
    );

    replyList = [];
  });

  return listElement;
}
