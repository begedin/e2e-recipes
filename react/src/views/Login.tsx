import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login } from '../store/actions'
import { AppDispatch, RootState } from '../store/types'

type LoginProps = {
  authenticated: boolean
  dispatch: AppDispatch
}

type LoginState = {
  name: string
  password: string
}

const submit = (vm: Login, event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const { dispatch } = vm.props
  const { name, password } = vm.state
  dispatch(login({ name, password }))
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)
    this.state = { name: '', password: '' }
  }

  render() {
    return (
      <form onSubmit={e => submit(this, e)}>
        <label>
          name
          <input
            type="text"
            onChange={e => this.setState({ name: e.currentTarget.value })}
          />
        </label>
        <label>
          password
          <input
            type="password"
            onChange={e => this.setState({ password: e.currentTarget.value })}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    )
  }
}

const mapStateToProps = (
  state: RootState
): Pick<LoginProps, 'authenticated'> => {
  const { authenticated } = state
  return { authenticated }
}

export default connect(mapStateToProps)(Login)
