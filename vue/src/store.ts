import { defineStore } from 'pinia';
import { ref } from 'vue';
import { get, post, remove } from './api';
import type { Todo, User } from './types';

export const useStore = defineStore('main', () => {
  const authenticated = ref<boolean>(!!localStorage.getItem('token'));
  const user = ref<User | null>(null);
  const todos = ref<Todo[]>([]);
  const error = ref<string | null>(null);

  const register = async (params: { name: string; password: string }) => {
    error.value = null;

    try {
      const { data } = await post<User>('users', { user: params });
      await login(params);
      authenticated.value = true;
      user.value = data;
    } catch (e) {
      error.value = 'Invalid credentials';
    }
  };

  const login = async (params: { name: string; password: string }) => {
    error.value = null;

    try {
      const { data: token } = await post<string>('login', { login: params });
      localStorage.setItem('token', token);
      authenticated.value = true;
    } catch (e) {
      error.value = 'Invalid credentials';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    authenticated.value = false;
  };

  const fetchTodos = async () => {
    const { data } = await get<Todo[]>('todos');
    todos.value = data;
  };

  const createTodo = async (title: string) => {
    const { data } = await post<Todo>('todos', { todo: { title } });
    todos.value.push(data);
  };

  const deleteTodo = async (todo: Todo) => {
    await remove(`todos/${todo.id}`);
    todos.value = todos.value.filter(t => t.id !== todo.id);
  };

  return {
    authenticated,
    todos,
    login,
    logout,
    register,
    fetchTodos,
    createTodo,
    deleteTodo,
    error,
  };
});
