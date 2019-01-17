import { expect } from 'chai';
import store from '@/store/index';
import {
  SHOW_REQUEST_ERROR,
  HIDE_REQUEST_ERROR,
} from '@/store/constants/mutation-types';

describe('mutations', () => {
  describe('error module', () => {
    it('should show request error', () => {
      const payload = {
        errorText: 'Hi, I am the new error',
      };
      store.commit(`ErrorModule/${[SHOW_REQUEST_ERROR]}`, payload);
      expect(store.state.ErrorModule.hasErroredRequest).to.equal(true) &&
        expect(store.state.ErrorModule.errorText).to.equal(payload.errorText);
    });
    it('should hide request error', () => {
      store.commit(`ErrorModule/${[HIDE_REQUEST_ERROR]}`);
      expect(store.state.ErrorModule.hasErroredRequest).to.equal(false);
    });
  });
});
