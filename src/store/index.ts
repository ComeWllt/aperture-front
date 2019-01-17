import Vue from 'vue';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';

import ErrorModule from '@/store/modules/ErrorModule';
import LoginModule from '@/store/modules/LoginModule';
import DataModule from '@/store/modules/DataModule';

Vue.use(Vuex);

interface IStore {
  ErrorModule: ErrorModule;
  LoginModule: LoginModule;
  DataModule: DataModule;
}

const store = new Vuex.Store<IStore>({
  mutations: {},
  actions: {},
  modules: {
    ErrorModule,
    LoginModule,
    DataModule,
  },
});

export default store;

// Vuex modules and store must be linked for actions to work properly.
getModule(ErrorModule, store);
getModule(LoginModule, store);
getModule(DataModule, store);
