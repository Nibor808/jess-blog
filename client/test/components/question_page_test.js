import React from 'react';
import QuestionsPage from '../../components/question/questions_page';
import QuestionList from '../../components/question/question_list';
import PostSideBar from '../../components/post/post_sidebar';
import ReviewSidebar from '../../components/review/review_sidebar';
import { expect } from 'chai';
import { renderComponent } from '../test_helper';

describe('Questions Page', () => {

  it('renders all components', () => {
    const wrapper = renderComponent(QuestionsPage);

    expect(wrapper.find(QuestionList)).to.exist;
    expect(wrapper.find(PostSideBar)).to.exist;
    expect(wrapper.find(ReviewSidebar)).to.exist;
  });
});