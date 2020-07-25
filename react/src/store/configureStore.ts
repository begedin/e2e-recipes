import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

export default function configureStore() {
  return createStore(
    rootReducer,
    {
      authenticated: !!window.localStorage.getItem('token'),
      isFetching: false,
      todos: []
    },
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
}
