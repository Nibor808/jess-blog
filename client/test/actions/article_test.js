import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import nock from 'nock';
import { getArticle } from '../../actions/article_actions';
import { GET_ARTICLE } from '../../actions/types';
import { expect } from 'chai';

const middlewares = [ reduxThunk ];
const mockStore = configureMockStore(middlewares);

describe('article', () => {

  it('gets an article', () => {
    const store = mockStore({});

    return store.dispatch(getArticle(1))
      .then(() => {
        expect(store.getActions()).to.be.a('array');
        expect(store.getActions()[0].type).to.equal(GET_ARTICLE);
        expect(store.getActions()[0].payload.id).to.equal(1);
      });
  });

})