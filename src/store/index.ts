import Vue from 'vue';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';

import ErrorModule from '@/store/modules/ErrorModule';
import LoginModule from '@/store/modules/LoginModule';

Vue.use(Vuex);

const store = new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    ErrorModule,
    LoginModule,
  },
});

export default store;

// Vuex modules and store must be linked for actions to work properly.
getModule(ErrorModule, store);
getModule(LoginModule, store);
