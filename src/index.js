import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueRouter);

const root = document.createElement('div');
const Routers = [
  {
    path: '/index',
    meta: {
      title: '首页'
    },
    component: (resolve) => require(['../router/views/index.vue'], resolve)
  },
  {
    path: '/about',
    meta: {
      title: '关于'
    },
    component: (resolve) => require(['../router/views/about.vue'], resolve)
  },
  {
    path: '/login',
    meta: {
      title: '登录'
    },
    component: (resolve) => require(['../router/views/login.vue'], resolve)
  },
  // {
  //   path: '/user/:id',
  //   component: (resolve) => require(['../router/views/user.vue'], resolve)
  // },
  {
    path: '*',
    redirect: '../index'
  }
];

const RouterConfig = {
  mode: 'history',
  routes: Routers
}

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  // if(window.localStorage.getItem('token')) {
  //   next();
  // } else {
  //   next('/login');
  // }
  next();
});

router.afterEach((to, from, next) => {
  window.scroll(0, 0);
})

document.body.appendChild(root);

new Vue({
  router: router,
  render: h => h(App)
}).$mount(root);



