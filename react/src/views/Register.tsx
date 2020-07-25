import React, { Component } from 'react'
import { connect } from 'react-redux'

import { register } from '../store/actions'
import { AppDispatch } from '../store/types'

type RegisterProps = {
  dispatch: AppDispatch
}

type RegisterState = {
  name: string
  password: string
}

const submit = (vm: Register, event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const { dispatch } = vm.props
  const { name, password } = vm.state
  dispatch(register({ name, password }))
}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
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
        <button type="submit">Register</button>
      </form>
    )
  }
}

export default connect()(Register)
