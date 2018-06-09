import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/date_format';
import { getArticle, publishArticle } from '../../actions/article_actions';
import { getComments, getCommentReplies } from '../../actions/comment_actions';
import { renderComments } from '../comment/comments_list';
import { renderSigninButton } from '../auth/render_signin_button';
import { renderSignupPrompt } from '../auth/render_signup_prompt';

class Article extends Component {

  static propTypes = {
    getArticle: PropTypes.func,
    getComments: PropTypes.func,
    getCommentReplies: PropTypes.func,
    articleSaved: PropTypes.bool,
    commentSaved: PropTypes.bool,
    commentDeleted: PropTypes.bool,
    commentArray: PropTypes.array,
    repliesArray: PropTypes.array,
    children: PropTypes.object,
    params: PropTypes.object,
    id: PropTypes.number,
    article: PropTypes.object,
    authenticated: PropTypes.bool,
    user: PropTypes.string,
    publishArticle: PropTypes.func,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    form: PropTypes.object
  }

  componentWillMount() {
    this.props.getArticle(this.props.match.params.id);
    this.props.getComments('article_id', this.props.match.params.id);
    this.props.getCommentReplies('parent_comment_id', null);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commentSaved || nextProps.commentDeleted) {
      this.props.getComments('article_id', this.props.article.id);
      this.props.getCommentReplies('parent_comment_id', null);
    }
    if (nextProps.articleSaved) {
      this.props.getArticle(this.props.match.params.id);
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
        <div className='row'>
          <div className='col-sm-12'>
            <h3>Specs</h3>
          </div>
          <div className='col-sm-12'>
            <ul className='specs_list'>
              {specsList.map((spec, index) => <li key={index}>{spec}</li>)}
            </ul>
          </div>
        </div>
      )
    }
  }

  renderProsCons() {
    if (this.props.article.pros || this.props.article.cons) {
      return (
        <div className='row proscons'>
          <div className='col-sm-6'>
            <h3>Pros</h3>
            <p>{this.props.article.pros}</p>
          </div>
          <div className='col-sm-6'>
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
        <div className='row'>
          <div className='col-sm-12'>
            <h2>Answer:</h2>
          </div>
          <div className='col-sm-12'>
            <p>{this.props.article.answer}</p>
          </div>
        </div>
      )
    }
  }

  renderImage() {
    if (this.props.article.cover_img) {
      return (
        <div className='row'>
          <img src={`../../images/${this.props.article.cover_img}`} height='400px' width='400px' className='img-responsive' />
        </div>
      )
    }
  }

  hasComments() {
    if (!this.props.commentArray.length > 0 || this.props.article.preview === true) {
      return <p className='col-sm-6'>Be the first to comment.</p>
    } else {
      return (
        <ul className='comments_list'>
          {renderComments(this.props.commentArray, this.props.repliesArray)}
        </ul>
      )
    }
  }

  isPreview() {
    const user = this.props.user ? this.props.user : localStorage.getItem('user');

    if (this.props.article.preview === 1 && user === 'Admin') {
      return (
        <div className='publish_div pull-right'>
          <button type='button' className='btn btn-default pull-right' onClick={() => this.props.publishArticle(this.props.article.id)}>
            publish article
          </button>
          <Link to={`/editarticle/${this.props.article.id}`} className='btn btn-default edit_link'>edit article</Link>
        </div>
      )
    } else if (user === 'Admin' && this.props.article.type !== 3) {
      return (
        <div className='publish_div pull-right'>
          <Link to={`/editarticle/${this.props.article.id}`} className='btn btn-default edit_link'>edit article</Link>
        </div>
      )
    }
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger col-md-12'>
          {this.props.errorMessage}
        </div>
      );
    }
    if (this.props.successMessage) {
      return (
        <div className='alert alert-success col-md-12'>
          {this.props.successMessage}
        </div>
      );
    }
  }

  render() {
    if (!this.props.article || !this.props.commentArray) {
      return <div><i className='fa fa-spinner' aria-hidden='true'></i></div>;
    }

    const date = formatDate(this.props.article.createdAt);

    return (
      <div>
        <div
          className='article col-sm-12'>
          <div className='row'>
            <div className='col-sm-12'>
              <h1>{this.props.article.title}</h1>
            </div>
          </div>
          <div className='row date'>
            <div className='col-sm-12'>
              <small>posted: {date}</small>
            </div>
          </div>
          {this.renderImage()}
          {this.renderProsCons()}
          <div className='row'>
            <div className='col-sm-12'>
              <p dangerouslySetInnerHTML={{ __html: this.props.article.content }}></p>
            </div>
          </div>
          {this.renderSpecs(this.props.article.specs)}
          {this.renderAnswer()}
        </div>
        <div className='col-sm-12 color_bar_div'>
          <hr className='color_bar' />
        </div>
        {this.isPreview()}
        {this.renderAlert()}
        <div className='comments_section col-sm-7'>
          <div className='row'>
            <div className='col-xs-6'><h2>Comments:</h2></div>
            {renderSigninButton(this.props.authenticated)}
          </div>
          {this.hasComments()}
        </div>
        <div className='col-sm-4 col-sm-offset-1 auth_children'>
          {renderSignupPrompt(this.props.authenticated, this.props.form)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ article, auth, comment, form }) {
  return {
    user: auth.user,
    article: article.article,
    articleSaved: article.articleSaved,
    successMessage: article.success,
    errorMessage: article.error,
    authenticated: auth.authenticated,
    commentSaved: comment.commentSaved,
    commentArray: comment.commentArray,
    repliesArray: comment.repliesArray,
    commentDeleted: comment.commentDeleted,
    form
  };
}

export default connect(mapStateToProps, { getArticle, getComments, getCommentReplies, publishArticle })(Article);
