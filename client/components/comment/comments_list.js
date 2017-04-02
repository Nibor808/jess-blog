import React from 'react';
import { Link } from 'react-router';
import { formatDate } from '../../utils/date_format';

export function renderComments(commentArray, repliesArray) {
  const listElement = [];
  let replyList = [];

  commentArray.map(comment => {
    const commentDate = formatDate(comment.commentCreatedAt);
    const user = localStorage.getItem('user');
    let type;

    // set the type for the edit link
    if (comment.commentPostId !== null) {
      type = 'post'
    }else if (comment.commentReviewId !== null) {
      type = 'review'
    }else {
      type = 'question'
    }
    // signed in user can edit or reply to their comments and reply to others comments
    let editDiv;
    if (user) {
      editDiv = <small><Link to={`/replytocomment/${comment.commentId}`}>reply</Link></small>
    }
    if (user && user === comment.username) {
      editDiv = <small>
                  <Link to={`/editcomment_${type}/${comment.commentId}`} className='edit_link'>edit</Link>
                  <Link to={`/replytocomment_${type}/${comment.commentId}`}>reply</Link>
                </small>
    }

    // map over replies and attach each to it's parent comment
    if (repliesArray) {
      repliesArray.map(reply => {
        const replyDate = formatDate(reply.commentCreatedAt);
        const user = localStorage.getItem('user');
        let type;

        if (comment.commentPostId !== null) {
          type = 'post'
        }else if (comment.commentReviewId !== null) {
          type = 'review'
        }else {
          type = 'question'
        }
        let editDiv;

        if (user && user === reply.username) {
          editDiv = <small>
                      <Link to={`/editcomment_${type}/${reply.commentId}`} className='edit_link'>edit</Link>
                    </small>
        }

        if (reply.parentCommentId === comment.commentId) {
          replyList.push(<li
                        key={Math.random()}>
                          <h4>{reply.commentTitle}</h4>
                          <p>{reply.commentContent}</p>
                          <small>posted: {replyDate} by: {reply.username}</small>
                          <p className='pull-right'>{editDiv}</p>
                          <hr />
                        </li>
                        )
        }
      });
    }

    // build comment
    listElement.push(
                  <li
                  key={comment.commentId}
                  className='comment_item'>
                    <h4>{comment.commentTitle}</h4>
                    <p>{comment.commentContent}</p>
                    <small>posted: {commentDate} by: {comment.username}</small>
                    <p className='pull-right'>{editDiv}</p>
                    <hr />
                    <ul className='reply_list'>
                      {replyList}
                    </ul>
                  </li>
    )

    replyList = [];
  });

  return listElement;
}