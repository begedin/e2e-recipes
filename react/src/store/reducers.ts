import { RootState, AppAction } from './types'
import {
  RECEIVE_LOGIN,
  REQUEST_TODOS,
  RECEIVE_TODOS,
  ADD_TODO,
  RECEIVE_REGISTER,
  LOGOUT,
  REMOVE_TODO
} from './actionTypes'

const initialState = (): RootState => ({
  authenticated: false,
  isFetching: false,
  todos: []
})

const rootReducer = (state: RootState = initialState(), action: AppAction) => {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, { todos: [...state.todos, action.todo] })
    case REMOVE_TODO:
      const newTodos = state.todos.filter(t => t.id !== action.todo.id)
      return Object.assign({}, state, { todos: newTodos })
    case REQUEST_TODOS:
      return Object.assign({}, state, { isFetching: true })
    case RECEIVE_TODOS:
      return Object.assign({}, state, {
        isFetching: false,
        todos: action.todos
      })
    case RECEIVE_LOGIN:
      window.localStorage.setItem('token', action.token)
      return Object.assign({}, state, { authenticated: true })
    case RECEIVE_REGISTER:
      return Object.assign({}, state, { user: action.user })
    case LOGOUT:
      window.localStorage.removeItem('token')
      return Object.assign({}, state, { authenticated: false })
    default:
      return state
  }
}

export default rootReducer
