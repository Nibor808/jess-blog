import axios from 'axios';
import { GET_ALL_QUESTIONS, GET_QUESTION, SAVE_QUESTION, RESET_QUESTION_STATE, ERROR } from './types';
import { ROOT_URL } from '../config/config.json';

export function getAllQuestions() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/questions`)
    .then(response => {
      dispatch({
        type: GET_ALL_QUESTIONS,
        payload: response.data.ok
      })
    })
    .catch(error => {
      dispatch({
        type: ERROR,
        payload: error
      })
    });
  }
}

export function getQuestion(id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/question/${id}`)
    .then(response => {
      dispatch({
        type: GET_QUESTION,
        payload: response.data.ok
      })
    })
    .catch(error => {
      dispatch({
        type: ERROR,
        payload: error
      })
    });
  }
}

export function saveQuestion({ title, content, category, keywordArray }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/savequestion`, { title, content, category, keywordArray })
    .then(response => {
      dispatch({
        type: SAVE_QUESTION
      })
    })
    .then(() => {
      dispatch({
        type: RESET_QUESTION_STATE
      })
    })
    .catch(({ response }) => {
      dispatch({
        type: ERROR,
        payload: response.data.error
      })
    });
  }
}