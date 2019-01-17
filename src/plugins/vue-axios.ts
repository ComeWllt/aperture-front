import Vue from 'vue';
import axios, { AxiosError } from 'axios';
import VueAxios from 'vue-axios';
import store from '@/store';
import {
  SHOW_REQUEST_ERROR,
  SIGN_OUT,
} from '@/store/constants/mutation-types';

Vue.use(VueAxios, axios);

Vue.axios.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (!error.response) {
      store.commit(`ErrorModule/${SHOW_REQUEST_ERROR}`, {
        errorText: 'Oops, there has been an error...',
      });
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 401:
        store.commit(`ErrorModule/${SHOW_REQUEST_ERROR}`, {
          errorText: 'Your credentials have expired...',
        });
        store.commit(`LoginModule/${SIGN_OUT}`);
        return Promise.reject(error);
      default:
        store.commit(`ErrorModule/${SHOW_REQUEST_ERROR}`, {
          errorText: 'Oops, there has been an error...',
        });
        return Promise.reject(error);
    }
  }
);
