import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllQuestions } from '../../actions/question_actions';
import { formatDate } from '../../utils/date_format';

class QuestionList extends Component {
  static propTypes = {
    allQuestions: PropTypes.array,
    getAllQuestions: PropTypes.func
  }

  componentWillMount() {
    this.props.getAllQuestions()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.getAllQuestions()
    }
  }

  renderQuestions(questionData) {
    const questionDate = formatDate(questionData.createdAt);
    let content;
    if (questionData.content.length > 250) {
      content = questionData.content.substring(0, 250) + '...';
    }else {
      content = questionData.content;
    }

    return (
      <div
        key={questionData.id}
        className='question_item'>
        <Link className='question_link' to={`question/${questionData.id}`}><h2 className='list-title'>{questionData.title}</h2></Link>
        <small>{questionDate}</small>
        <p className='question_content'>{content}</p>
      </div>
    );
  }

  render() {
    return (
      <div className='question_list'>
        {this.props.allQuestions.map(this.renderQuestions)}
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    allQuestions: questions.allQuestions,
    didSave: questions.questionSaved
  };
}

export default connect(mapStateToProps, { getAllQuestions })(QuestionList);