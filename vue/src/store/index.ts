import Vue from 'vue';
import Vuex, { ActionTree, MutationTree } from 'vuex';
import { post } from '@/api';

Vue.use(Vuex);

type User = {
  email: string
  name: string
}

export type State = {
  authenticated: boolean
  user: User | null
}

const rootState: State = {
  authenticated: !!localStorage.getItem('token'),
  user: null,
};

const actions: ActionTree<State, State> = {
  async register({ commit, dispatch }, { name, password }) {
    const { data } = await post<User>('users', { user: { name, password } });
    await dispatch('login', { name, password });
    commit('SET_USER', data);
  },

  async login({ commit }, { name, password }) {
    const { data: token } = await post<string>('login', { login: { name, password } });
    localStorage.setItem('token', token);
    commit('SET_AUTHENTICATED', true);
  },
};

const mutations: MutationTree<State> = {
  SET_USER(state, user: User) {
    state.user = user;
  },

  SET_AUTHENTICATED(state, authenticated: boolean) {
    state.authenticated = authenticated;
  },
};

export default new Vuex.Store({
  state: rootState,
  actions,
  mutations,
});
