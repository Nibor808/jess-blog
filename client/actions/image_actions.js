import axios from 'axios';
import { GET_IMAGES, GET_ALL_IMAGES, ERROR } from './types';
import { ROOT_URL } from '../config/config.json';

export function getImages(idtype, typeid) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/image/${idtype}/${typeid}`)
    .then(response => {
      dispatch({
        type: GET_IMAGES,
        payload: response.data.ok
      })
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err
      })
    })
  }
}

export function getAllImages(idtype) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/images/${idtype}`)
    .then(response => {
      dispatch({
        type: GET_ALL_IMAGES,
        payload: response.data.ok
      })
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err
      })
    })
  }
}