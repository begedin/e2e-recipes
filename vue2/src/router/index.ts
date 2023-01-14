import Vue from 'vue';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
import Todos from '@/views/Todos.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';

// class-component-hooks.js

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

Vue.use(VueRouter);

const RegisterRoute = {
  path: '/register',
  name: 'Register',
  component: Register,
};

const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: Login,
};

const TodosRoute = {
  path: '/',
  name: 'todos',
  component: Todos,
};

const routes = [
  RegisterRoute,
  LoginRoute,
  TodosRoute,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
