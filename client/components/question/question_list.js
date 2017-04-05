import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getArticles } from '../../actions/article_actions';
import { renderArticle } from '../article/render_article';

class QuestionList extends Component {
  static propTypes = {
    allQuestions: PropTypes.array,
    getArticles: PropTypes.func,
    didSave: PropTypes.bool
  }

  componentWillMount() {
    this.props.getArticles(3)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.getArticles(3)
    }
  }

  render() {
    if (!this.props.allQuestions) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    return (
      <div className='question_list'>
        {this.props.allQuestions.map(question => renderArticle(question))}
      </div>
    );
  }
}

function mapStateToProps({ article }) {
  return {
    allQuestions: article.allQuestions,
    didSave: article.articleSaved
  };
}

export default connect(mapStateToProps, { getArticles })(QuestionList);