import { post, get, remove } from './api';
export type Todo = {
  id: number;
  title: string;
  // eslint-disable-next-line camelcase
  user_id: number;
};

export type User = {
  id: number;
  name: string;
};

type State = {
  authenticated: boolean;
  todos: Todo[];
  error: string | null;
};

export const state: State = {
  authenticated: !!localStorage.getItem('token'),
  error: null,
  todos: [],
};

export const logout = () => {
  localStorage.removeItem('token');
  state.authenticated = false;
};

export const login = async (name: string, password: string) => {
  state.error = null;
  try {
    const { data: token } = await post<string>('login', {
      login: { name, password },
    });
    localStorage.setItem('token', token);
    state.authenticated = true;
  } catch (e) {
    state.error = 'Invalid credentials';
  }
};

export const register = async (name: string, password: string) => {
  state.error = null;
  try {
    const response = await post<User>('users', { user: { name, password } });
    if ('data' in response) {
      return login(name, password);
    }
  } catch (e) {
    state.error = 'Invalid credentials';
  }
};

export const fetchTodos = async () => {
  const { data: todos } = await get<Todo[]>('todos');
  state.todos = todos;
};

export const createTodo = async (title: string) => {
  const { data: todo } = await post<Todo>('todos', { todo: { title } });
  state.todos.push(todo);
};

export const deleteTodo = async (todo: Todo) => {
  const response = await remove(`todos/${todo.id}`);
  if (!response.data) {
    return;
  }

  const index = state.todos.indexOf(todo);
  if (index === -1) {
    return;
  }
  state.todos.splice(index, 1);
};
