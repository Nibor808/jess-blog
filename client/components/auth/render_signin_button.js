import React from 'react';
import { Link } from 'react-router';

export function renderSigninButton(authenticated) {
  if (!authenticated) {
    return (
      <div className='col-md-6'>
        <Link to='/signin' className='pull-right login'>
          <button className='btn btn-default'>sign in to comment</button>
        </Link>
      </div>
    );
  }else {
    return (
      <div className='col-md-6'>
        <Link to='/addcomment' className='pull-right login'>
          <button className='btn btn-default'>add a comment</button>
        </Link>
      </div>
    );
  }
}
