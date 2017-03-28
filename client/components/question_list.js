import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAllQuestions } from '../actions/question_actions';
import { Link } from 'react-router';
import { formatDate } from '../utils/date_format';

class QuestionList extends Component {
  static propTypes = {
    allQuestions: PropTypes.array,
    getAllQuestions: PropTypes.func
  }

  componentWillMount() {
    this.props.getAllQuestions()
  }

  renderQuestions(questionData) {
    const content = questionData.content.substring(0, 250);
    const questionDate = formatDate(questionData.createdAt);

    return (
      <div
        key={questionData.id}
        className='question_item'>
        <Link className='question_link' to={`question/${questionData.id}`}><h2>{questionData.title}</h2></Link>
        <small>{questionDate}</small>
        <p className='question_content'>{content}...</p>
      </div>
    );
  }

  render() {
    return (
      <div className='col-md-8 question_list'>
        {this.props.allQuestions.map(this.renderQuestions)}
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    allQuestions: questions.allQuestions
  };
}

export default connect(mapStateToProps, { getAllQuestions })(QuestionList);