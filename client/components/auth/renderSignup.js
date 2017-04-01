import React from 'react';
import { Link } from 'react-router';

export function renderSignup(authenticated, type) {
  if (!authenticated) {
    return (
      <div className='signup_prompt text-center'>
        <h2>Not already part of the converstation?</h2>
        <Link to={`/signup_${type}`}>
          <button type='button' className='btn btn-primary'>sign up</button>
        </Link>
      </div>
    );
  }
}