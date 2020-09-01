import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createTodo } from 'store/actions'
import { AppDispatch } from 'store/types'

type AddTodoProps = {
  dispatch: AppDispatch
}

type AddTodoState = {
  title: string
}

const submit = async (vm: AddTodo, event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const { dispatch } = vm.props
  const { title } = vm.state
  await dispatch(createTodo(title))
  vm.setState({ title: '' })
}

class AddTodo extends Component<AddTodoProps, AddTodoState> {
  constructor(props: AddTodoProps) {
    super(props)
    this.state = { title: '' }
  }

  render() {
    return (
      <form onSubmit={e => submit(this, e)}>
        <label>
          <input
            type="text"
            onChange={e => this.setState({ title: e.currentTarget.value })}
            placeholder="New todo"
            value={this.state.title}
          />
        </label>

        <button type="submit">Create ToDo</button>
      </form>
    )
  }
}

export default connect()(AddTodo)
