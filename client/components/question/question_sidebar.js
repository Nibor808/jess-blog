import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getArticles } from '../../actions/article_actions';
import { renderArticleListItem } from '../article/render_article_list_item';

class QuestionSidebar extends Component {

  static propTypes = {
    getAllQuestions: PropTypes.func,
    allQuestions: PropTypes.array,
    getArticles: PropTypes.func,
    renderArticleListItem: PropTypes.func
  }

  componentWillMount() {
    this.props.getArticles(3);
  }

  render() {
    if (!this.props.allQuestions) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    return (
      <ul
        className='list-group'>
        <li className='list-group-item'><h3 className='list_group_title'>Recent Questions</h3></li>
        {this.props.allQuestions.map(question => renderArticleListItem(question))}
      </ul>
    );
  }
}

function mapStateToProps({ article }) {
  return {
    allQuestions: article.allQuestions
  };
}

export default connect(mapStateToProps, { getArticles })(QuestionSidebar);
