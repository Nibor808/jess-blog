import React from 'react';
import PostPage from '../../components/post/posts_page';
import PostList from '../../components/post/posts_list';
import ReviewSidebar from '../../components/review/review_sidebar';
import QuestionSideBar from '../../components/question/question_sidebar';
import Carousel from '../../components/carousel';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('Post Page', () => {
  it('renders all components', () => {
    const wrapper = shallow(<PostPage />);
    expect(wrapper.find(PostList)).to.exist;
    expect(wrapper.find(ReviewSidebar)).to.exist;
    expect(wrapper.find(QuestionSideBar)).to.exist;
    expect(wrapper.find(Carousel)).to.exist;
  });
});