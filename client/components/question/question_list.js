import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getArticles } from '../../actions/article_actions';
import { renderArticleItem } from '../article/render_article_item';

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
      <div className='article_list'>
        {this.props.allQuestions.map(question => renderArticleItem(question))}
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
