import App from './components/app';
import PostsPage from './components/post/posts_page';
import ReviewsPage from './components/review/reviews_page';
import QuestionsPage from './components/question/questions_page';
import SearchPage from './components/search/search_page';
import About from './components/about/about_page';
import AdminPage from './components/admin/admin_page';
import EditArticleModal from './components/admin/edit_article_modal';
import DeleteArticleModal from './components/admin/delete_article_modal';
import Article from './components/article/article';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import CommentModal from './components/comment/comment_modal';
import EditModal from './components/comment/edit_modal';
import DeleteCommentModal from './components/comment/delete_comment_modal';
import AskQuestion from './components/question/ask_question';
import requireAuth from './components/auth/requireAuth';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: PostsPage
      },
      {
        path: '/article/:id',
        component: Article,
      },
      {
        path: '/addcomment',
        component: requireAuth(CommentModal)
      },
      {
        path: '/replytocomment/:id',
        component: CommentModal
      },
      {
        path: '/editcomment/:id',
        component: EditModal
      },
      {
        path: '/deletecomment/:id',
        component: DeleteCommentModal
      },
      {
        path: '/editarticle/:id',
        component: EditArticleModal
      },
      {
        path: '/deletearticle/:id',
        component: DeleteArticleModal
      },
      {
        path: '/reviews',
        component: ReviewsPage
      },
      {
        path: '/questions',
        component: QuestionsPage
      },
      {
        path: '/askquestion',
        component: requireAuth(AskQuestion)
      },
      {
        path: '/admin',
        component: requireAuth(AdminPage)
      },
      {
        path: '/search',
        component: SearchPage
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/signin',
        component: Signin
      },
      {
        path: '/signup',
        component: Signup
      }
    ]
  }
];
