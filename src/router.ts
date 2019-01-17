import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';

import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import PatchNotesView from '@/views/PatchNotesView.vue';
import LoginView from '@/views/LoginView.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/patch-notes',
      name: 'patch-notes',
      component: PatchNotesView,
      meta: { requiresAuth: true },
    },
    {
      path: '*',
      component: NotFoundView,
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.LoginModule.isLoggedIn) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
