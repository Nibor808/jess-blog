import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, CLEAR_ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
  case AUTH_USER:
    return { ...state, authenticated: true, user: action.payload, error: '' };
  case UNAUTH_USER:
    return { ...state, authenticated: false, user: '', error: '' };
  case AUTH_ERROR:
    return { ...state, error: action.payload };
  case CLEAR_ERROR:
    return { ...state, error: '' }
  default:
    return state;
  }
}
