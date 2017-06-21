import React from 'react';
import { Link } from 'react-router-dom';

export function renderSignupPrompt(authenticated, form) {
  if (!authenticated || authenticated === undefined && Object.keys(form).length == 0) {
    return (
      <div className='signup_prompt text-center'>
        <h2>Not already part of the converstation?</h2>
        <Link to='/signup'>
          <button type='button' className='btn btn-default'>sign up</button>
        </Link>
      </div>
    );
  }
}
