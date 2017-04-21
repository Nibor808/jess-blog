import React from 'react';
import ReviewsPage from '../../components/review/reviews_page';
import ReviewList from '../../components/review/review_list';
import PostSideBar from '../../components/post/post_sidebar';
import QuestionSideBar from '../../components/question/question_sidebar';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('Reviews Page', () => {
  it('renders all components', () => {
    const wrapper = shallow(<ReviewsPage />);
    expect(wrapper.find(ReviewList)).to.exist;
    expect(wrapper.find(PostSideBar)).to.exist;
    expect(wrapper.find(QuestionSideBar)).to.exist;
  });
});