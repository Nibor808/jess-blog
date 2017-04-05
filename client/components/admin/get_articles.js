import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllArticles } from '../../actions/article_actions';
import { renderArticleListItem } from '../article/render_article_list_item';

class GetArticles extends Component {

  static propTypes = {
    getAllArticles: PropTypes.func,
    allArticles: PropTypes.array,
    errorMessage: PropTypes.string
  }

  componentWillMount() {
    this.props.getAllArticles()
  }

  render() {
    if (!this.props.allArticles) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    return (
      <ul className='list-group'>
        <li className='list-group-item'><h3 className='list_group_title'>Articles</h3></li>
        {this.props.allArticles.map(article => renderArticleListItem(article))}
      </ul>
    );
  }
}

function mapStateToProps({ admin }) {
  return {
    allArticles: admin.allArticles,
    errorMessage: admin.error
  };
}

export default connect(mapStateToProps, { getAllArticles })(GetArticles);