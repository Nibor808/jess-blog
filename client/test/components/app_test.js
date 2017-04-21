import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from '../../components/app';
import Header from '../../components/header';
import Footer from '../../components/footer';

describe('App', () => {
  it('renders <Header /> and <Footer />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header)).to.exist;
    expect(wrapper.find(Footer)).to.exist;
  });
});