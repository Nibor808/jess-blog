import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllQuestions } from '../../actions/question_actions';
import { formatDate } from '../../utils/date_format';

class QuestionSidebar extends Component {

  static propTypes = {
    getAllQuestions: PropTypes.func,
    allQuestions: PropTypes.array
  }

  componentWillMount() {
    this.props.getAllQuestions();
  }

  renderQuestionList(questionData) {
    const questionDate = formatDate(questionData.createdAt);
    if (questionData.title.length > 20) {
      questionData.title = questionData.title.substring(0, 20) + '...';
    }
    return (
      <li
      key={questionData.id}
      className='list-group-item'>
        <Link className='question_link' to={`/question/${questionData.id}`}>{questionData.title}</Link>
        <small className='pull-right'>{questionDate}</small>
      </li>
    );
  }

  render() {
    return (
      <ul
      className='list-group col-md-4 question_sidebar'>
        <li className='list-group-item'><h2>Recent Questions</h2></li>
        {this.props.allQuestions.map(this.renderQuestionList)}
      </ul>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    allQuestions: questions.allQuestions
  };
}

export default connect(mapStateToProps, { getAllQuestions })(QuestionSidebar);