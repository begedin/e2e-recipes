import Todos from '~/src/views/Todos.vue';
import Register from '~/src/views/Register.vue';
import Login from '~/src/views/Login.vue';
import { createRouter, createWebHistory } from 'vue-router';

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

const routes = [RegisterRoute, LoginRoute, TodosRoute];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
