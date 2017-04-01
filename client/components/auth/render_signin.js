import React from 'react';
import { Link } from 'react-router';

export function renderSignin(authenticated, children, type) {
  if (!authenticated) {
    return (
      <div className='col-md-6'>
        <Link to='/signin_post' className='pull-right login'>
          <button className='btn btn-default'>sign in to comment</button>
        </Link>
      </div>
    );
  }else {
    if (children === null) {
      return (
        <div className='col-md-6'>
          <Link to={`/addcomment_${type}`} className='pull-right login'>
            <button className='btn btn-default'>add a comment</button>
          </Link>
        </div>
      );
    }else {
      return <div className='col-md-6'></div>
    }
  }
}