import { get, post } from '../api'
import {
  AddTodoAction,
  RequestRegisterAction,
  ReceiveRegisterAction,
  Todo,
  RemoveTodoAction,
  RequestTodosAction,
  ReceiveTodosAction,
  AppThunk,
  RequestLoginAction,
  ReceiveLoginAction,
  User,
  LogoutAction
} from './types'
import {
  REQUEST_REGISTER,
  RECEIVE_REGISTER,
  ADD_TODO,
  REMOVE_TODO,
  REQUEST_TODOS,
  RECEIVE_TODOS,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  LOGOUT
} from './actionTypes'

export const requestLogin = (): RequestLoginAction => ({ type: REQUEST_LOGIN })
export const receiveLogin = (token: string): ReceiveLoginAction => ({
  type: RECEIVE_LOGIN,
  token
})

export const login: AppThunk<void, User> = (login: User) => async dispatch => {
  dispatch(requestLogin)
  const { data: token } = await post<string>('login', { login })
  dispatch(receiveLogin(token))
}

export const logout = (): LogoutAction => ({ type: LOGOUT })

export const requestRegister = (): RequestRegisterAction => ({
  type: REQUEST_REGISTER
})
export const receiveRegister = (user: User): ReceiveRegisterAction => ({
  type: RECEIVE_REGISTER,
  user
})

export const register: AppThunk<void, User> = (
  user: User
) => async dispatch => {
  dispatch(requestRegister)
  const { data } = await post<User>('users', { user })
  dispatch(receiveRegister(data))
}

export const addTodo = (todo: Todo): AddTodoAction => ({
  type: ADD_TODO,
  todo
})

export const removeTodo = (todo: Todo): RemoveTodoAction => ({
  type: REMOVE_TODO
})

export const requestTodos = (): RequestTodosAction => ({ type: REQUEST_TODOS })

export const receiveTodos = (data: Todo[]): ReceiveTodosAction => ({
  type: RECEIVE_TODOS,
  todos: data
})

export const fetchTodos: AppThunk = () => async dispatch => {
  dispatch(requestTodos())
  const { data: todos } = await get('todos')
  dispatch(receiveTodos(todos))
}

export const createTodo: AppThunk<void, string> = () => async (
  dispatch,
  getState,
  title
) => {
  const { data: todo } = await post('todos', { title })
  dispatch(addTodo(todo))
}
