import { GET_IMAGES, GET_ALL_IMAGES, ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_IMAGES:
      return { ...state, imageArray: action.payload, error: '' }
    case GET_ALL_IMAGES:
      return { ...state, allImages: action.payload, error: '' }
    case ERROR:
      return { ...state, error: 'Could not get images' }
  }

  return state;
}