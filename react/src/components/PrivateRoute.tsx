import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { RootState } from 'store/types'

type Props = RouteProps & { authenticated: boolean }

const PrivateRoute = (props: Props) =>
  props.authenticated ? <Route {...props} /> : <Redirect to="/login" />

const mapStateToProps = (state: RootState): Pick<Props, 'authenticated'> => {
  const { authenticated } = state
  return { authenticated }
}

export default connect(mapStateToProps)(PrivateRoute)
