import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import { ROOT_URL } from '../../config/config.json';
import { signupUser } from '../../actions/user_actions';
import { AUTH_USER } from '../../actions/types';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('signupUser', () => {

  let email;
  let password;
  let username;

  beforeEach(() => {
    email = 'test@test.com';
    password = '123';
    username = 'tester';
    nock.disableNetConnect()
  });

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  });

  it('returns the correct type', () => {
    nock(`${ROOT_URL}`)
      .post('/signup')
      .reply(200);

    const store = mockStore({});

    return store.dispatch(signupUser({email, password, username}))
      .then(() => {
        expect(store.getActions()[0].type).to.equal(AUTH_USER)
      });
  });
});