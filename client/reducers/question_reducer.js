import { GET_ALL_QUESTIONS, GET_QUESTION, ERROR } from '../actions/types';

const INITIAL_STATE = {
  allQuestions: [],
  question: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_ALL_QUESTIONS:
      return { ...state, allQuestions: action.payload, error: '' }
    case GET_QUESTION:
      return { ...state, question: action.payload, error: '' }
    case ERROR:
      return { ...state, error: action.payload }
  }

  return state;
}