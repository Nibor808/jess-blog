import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getArticles } from '../actions/article_actions';
import { renderArticleItem } from '../components/article/render_article_item';
import { React_Bootstrap_Carousel } from 'react-bootstrap-carousel';

class Carousel extends Component {

  componentWillMount() {
    this.props.getArticles(1);
  }

  render() {
    return (
      <React_Bootstrap_Carousel
        animation={true}
        className='carousel'
        indicators={false}
        slideshowSpeed={8000}
        leftImage='../images/arrow-left.png'
        rightImage='../images/arrow-right.png'>
       {this.props.allPosts.map(post => this.props.renderArticleItem(post))}
      </React_Bootstrap_Carousel>
    );
  }
}

function mapStateToProps(state) {
  return {
    allPosts: state.article.allPosts
  };
}

export default connect(mapStateToProps, { getArticles, renderArticleItem })(Carousel);
