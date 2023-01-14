import Vue from 'vue';
import Vuex, { ActionTree, MutationTree } from 'vuex';
import { get, post, remove } from '@/api';
import { User, Todo } from './types';

Vue.use(Vuex);

export type State = {
  authenticated: boolean
  error: string | null
  todos: Todo[]
  user: User | null
}

const rootState: State = {
  authenticated: !!localStorage.getItem('token'),
  error: null,
  todos: [],
  user: null,
};

const actions: ActionTree<State, State> = {
  async register({ commit, dispatch }, { name, password }) {
    commit('SET_ERROR', null);

    try {
      const { data } = await post<User>('users', { user: { name, password } });
      await dispatch('login', { name, password });
      commit('SET_USER', data);
    } catch (e) {
      commit('SET_ERROR', 'Invalid credentials');
    }
  },

  async login({ commit }, { name, password }) {
    commit('SET_ERROR', null);
    const login = { name, password };

    try {
      const { data: token } = await post<string>('login', { login });
      localStorage.setItem('token', token);
      commit('SET_AUTHENTICATED', true);
    } catch (e) {
      commit('SET_ERROR', 'Invalid credentials');
    }
  },

  async logout({ commit }) {
    localStorage.removeItem('token');
    commit('SET_AUTHENTICATED', false);
  },

  async fetchTodos({ commit }) {
    const { data: todos } = await get<Todo[]>('todos');
    commit('SET_TODOS', todos);
  },

  async createTodo({ commit }, title: string) {
    const { data: todo } = await post<Todo>('todos', { todo: { title } });
    commit('PUSH_TODO', todo);
  },

  async deleteTodo({ commit }, todo: Todo) {
    await remove(`todos/${todo.id}`);
    commit('REMOVE_TODO', todo);
  },
};

const mutations: MutationTree<State> = {
  SET_USER(state, user: User) {
    state.user = user;
  },

  SET_AUTHENTICATED(state, authenticated: boolean) {
    state.authenticated = authenticated;
  },

  SET_TODOS(state, todos: Todo[]) {
    state.todos = todos;
  },

  PUSH_TODO(state, todo: Todo) {
    state.todos.push(todo);
  },

  REMOVE_TODO(state, todo: Todo) {
    const index = state.todos.indexOf(todo);
    if (index > -1) { state.todos.splice(index, 1); }
  },

  SET_ERROR(state, error: State['error']) {
    state.error = error;
  },
};

export default new Vuex.Store({
  state: rootState,
  actions,
  mutations,
});
