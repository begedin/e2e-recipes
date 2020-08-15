import React, { Component } from 'react'
import { connect } from 'react-redux'

import { deleteTodo } from 'store/actions'
import { AppDispatch, Todo } from 'store/types'

type TodoItemProps = {
  dispatch: AppDispatch
  todo: Todo
}

const handleClick = (
  e: React.MouseEvent<HTMLButtonElement>,
  dispatch: AppDispatch,
  todo: Todo
) => {
  e.preventDefault()
  dispatch(deleteTodo(todo))
}

class TodoItem extends Component<TodoItemProps> {
  render() {
    const { dispatch, todo } = this.props
    return (
      <div className="todo">
        <div>{todo.title}</div>
        <button onClick={e => handleClick(e, dispatch, todo)}>Delete</button>
      </div>
    )
  }
}

export default connect()(TodoItem)
