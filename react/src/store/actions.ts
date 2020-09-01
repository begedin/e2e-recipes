import { get, post, remove } from '../api'
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
  LogoutAction,
  SetErrorAction,
  ClearErrorAction
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
  LOGOUT,
  SET_ERROR,
  CLEAR_ERROR,
} from './actionTypes'

export const setError = (error: string): SetErrorAction => ({
  type: SET_ERROR,
  error
})

export const clearError = (): ClearErrorAction => ({ type: CLEAR_ERROR })

export const requestLogin = (): RequestLoginAction => ({ type: REQUEST_LOGIN })
export const receiveLogin = (token: string): ReceiveLoginAction => ({
  type: RECEIVE_LOGIN,
  token
})

export const login: AppThunk<void, User> = (login: User) => async dispatch => {
  dispatch(clearError)
  dispatch(requestLogin)
  try {
    const { data: token } = await post<string>('login', { login })
    dispatch(receiveLogin(token))
  } catch (e) {
    dispatch(setError('Invalid credentials'))
  }
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
  dispatch(clearError)
  dispatch(requestRegister)
  try {
    const { data } = await post<User>('users', { user })
    dispatch(receiveRegister(data))

  } catch (e) {
    dispatch(setError('Invalid credentials'))
  }
}

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

export const addTodo = (todo: Todo): AddTodoAction => ({
  type: ADD_TODO,
  todo
})

export const createTodo: AppThunk<void, string> = (
  title: string
) => async dispatch => {
  const { data: todo } = await post('todos', { todo: { title } })
  dispatch(addTodo(todo))
}

export const removeTodo = (todo: Todo): RemoveTodoAction => ({
  type: REMOVE_TODO,
  todo
})

export const deleteTodo: AppThunk<void, Todo> = (
  todo: Todo
) => async dispatch => {
  await remove(`todos/${todo.id}`)
  dispatch(removeTodo(todo))
}
