import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import { Provider } from 'react-redux'
import Login from './views/Login'
import Register from './views/Register'
import Todos from './views/Todos'
import './App.css'
import configureStore from './store/configureStore'

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/todos">ToDos</NavLink>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Todos />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}
