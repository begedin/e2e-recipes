import {
  ADD_TODO,
  REQUEST_TODOS,
  RECEIVE_TODOS,
  REMOVE_TODO,
  REQUEST_REGISTER,
  RECEIVE_REGISTER,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  LOGOUT
} from './actionTypes'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

export type User = {
  name: string
  password: string
}

export type Todo = { id: number; title: string }

export type RootState = {
  authenticated: boolean
  isFetching: boolean
  todos: Todo[]
  user?: User
}
export type RequestLoginAction = Action<typeof REQUEST_LOGIN>
export type ReceiveLoginAction = Action<typeof RECEIVE_LOGIN> & {
  token: string
}

export type LogoutAction = Action<typeof LOGOUT>

export type RequestRegisterAction = Action<typeof REQUEST_REGISTER>
export type ReceiveRegisterAction = Action<typeof RECEIVE_REGISTER> & {
  user: User
}

export type AddTodoAction = Action<typeof ADD_TODO> & { todo: Todo }
export type RemoveTodoAction = Action<typeof REMOVE_TODO>
export type RequestTodosAction = Action<typeof REQUEST_TODOS>
export type ReceiveTodosAction = Action<typeof RECEIVE_TODOS> & {
  todos: Todo[]
}

export type AppAction =
  | RequestLoginAction
  | ReceiveLoginAction
  | LogoutAction
  | RequestRegisterAction
  | ReceiveRegisterAction
  | AddTodoAction
  | RemoveTodoAction
  | RequestTodosAction
  | ReceiveTodosAction

export type AppThunk<ReturnType = void, Params = void> = (
  params: Params
) => ThunkAction<ReturnType, RootState, void, AppAction>

export type AppDispatch = ThunkDispatch<RootState, never, AppAction>
