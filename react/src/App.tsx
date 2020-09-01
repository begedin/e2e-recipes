import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Login from 'views/Login'
import Register from 'views/Register'
import Todos from 'views/Todos'

import 'App.scss'
import configureStore from 'store/configureStore'
import Error from 'components/Error'
import NavBar from 'components/NavBar'
import PrivateRoute from 'components/PrivateRoute'
import PublicRoute from 'components/PublicRoute'

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Error />
        <Switch>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PublicRoute path="/register">
            <Register />
          </PublicRoute>
          <PrivateRoute path="/">
            <Todos />
          </PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  )
}
