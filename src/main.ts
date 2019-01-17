import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './plugins/vuetify';
import './plugins/vue-axios';
import './plugins/vue2-google-maps';
import './plugins/vue-cloudinary';
import './plugins/vue-masonry';
import './plugins/vue-infinite-scroll';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
