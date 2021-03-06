import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getArticles } from '../actions/article_actions';
import { renderArticleItem } from '../components/article/render_article_item';

class Carousel extends Component {

  /*
    The carousel will only trigger it's active state on the first rendering
    once Boostrap-React gets to v1.0 we will swap it in
  */

  static propTypes = {
    getArticles: PropTypes.func,
    allPosts: PropTypes.array
  };

  renderCarouselInner(post) {
    if (post.id === this.props.allPosts[0].id) {
      return (
        <div className='item active' key={post.id}>
          {renderArticleItem(post)}
        </div>
      )
    }
    return (
      <div className='item' key={post.id}>
        {renderArticleItem(post)}
      </div>
    )
  }

  render() {
    return (
      <div id='postCarousel' className='carousel slide' data-ride='carousel'>

        <ol className='carousel-indicators'>
          <li data-target='#postCarousel' data-slide-to='0' className='active' />
          <li data-target='#postCarousel' data-slide-to='1' />
          <li data-target='#postCarousel' data-slide-to='2' />
        </ol>

        <div className='carousel-inner'>
          {this.props.allPosts.map(post => this.renderCarouselInner(post))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ article }) {
  return {
    allPosts: article.allPosts
  };
}

export default connect(mapStateToProps, { getArticles })(Carousel);
