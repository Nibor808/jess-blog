import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { formatDate } from '../../utils/date_format';
import { getArticle } from '../../actions/article_actions';
import { getComments, getCommentReplies } from '../../actions/comment_actions';
import { renderComments } from '../comment/comments_list';
import { renderSigninButton } from '../auth/render_signin_button';
import { renderSignupPrompt } from '../auth/render_signup_prompt';

class Article extends Component {

  static propTypes = {
    getArticle: PropTypes.func,
    params: PropTypes.object,
    id: PropTypes.number,
    article: PropTypes.object,
    authenticated: PropTypes.bool
  }

  componentWillMount() {
    this.props.getArticle(this.props.params.id);
    this.props.getComments('article_id', this.props.params.id);
    this.props.getCommentReplies('parent_comment_id', null);
    // this.props.getImages('review_id', this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didSave) {
      this.props.getComments('article_id', this.props.article.id);
      this.props.getCommentReplies('parent_comment_id', null);
    }
  }

  renderSpecs(specs) {
    const specsList = [];

    if (this.props.article.specs) {
      for (let item in specs) {
        if (specs.hasOwnProperty(item)) {
          const formattedItem = item.replace(new RegExp('_', 'g'), ' ');
          specsList.push(`${formattedItem}: ${specs[item]}`);
        }
      }
      return (
        <div>
          <h3>Specs</h3>
          <ul className='col-md-12 specs_list'>
            {specsList.map((spec, index) => <li key={index}>{spec}</li>)}
          </ul>
        </div>
      )
    }
  }

  renderProsCons() {
    if (this.props.article.pros || this.props.article.cons) {
      return (
        <div className='row proscons'>
          <div className='col-md-6'>
            <h3>Pros</h3>
            <p>{this.props.article.pros}</p>
          </div>
          <div className='col-md-6'>
            <h3>Cons</h3>
            <p>{this.props.article.cons}</p>
          </div>
        </div>
      )
    }
  }

  renderAnswer() {
    if (this.props.article.answer) {
      return (
        <div>
          <h2>Answer:</h2>
          <p>{this.props.article.answer}</p>
        </div>
      )
    }
    return <div></div>
  }

  renderImage() {
    if (this.props.article.cover_img) {
      return (
        <div className='row'>
          <img src={`../../images/${this.props.article.cover_img}`} height='400px' width='400px' />
        </div>
      )
    }
  }

  hasComments() {
    if (!this.props.commentArray) {
      return <p className='col-md-6'>Be the first to comment.</p>
    }else {
      return (
        <ul className='comments_list'>
          {renderComments(this.props.commentArray, this.props.repliesArray)}
        </ul>
      )
    }
  }

  render() {
    if (!this.props.article) {
      return <div><i className="fa fa-spinner" aria-hidden="true"></i></div>;
    }

    const date = formatDate(this.props.article.createdAt);

    return (
      <div>
        <div
        key={this.props.article.id}
        className='article col-md-12'>
          <div className='row'>
            <h1>{this.props.article.title}</h1>
          </div>
          <div className='row date'>
            <small>posted: {date}</small>
          </div>
          {this.renderImage()}
          {this.renderProsCons()}
          <p>{this.props.article.content}</p>
          {this.renderSpecs(this.props.article.specs)}
          {this.renderAnswer()}
        </div>
        <div className='comments_section col-md-6'>
          <div className='row'>
            <div className='col-md-6'><h2>Comments:</h2></div>
            {renderSigninButton(this.props.authenticated)}
          </div>
          {this.hasComments()}
        </div>
        <div className='col-md-5 col-md-offset-1 auth_children'>
          {this.props.children}
          {renderSignupPrompt(this.props.authenticated)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ article, auth, comment }) {
  return {
    article: article.article,
    authenticated: auth.authenticated,
    didSave: comment.commentSaved,
    commentArray: comment.commentArray,
    repliesArray: comment.repliesArray,
  };
}

export default connect(mapStateToProps, { getArticle, getComments, getCommentReplies })(Article);
