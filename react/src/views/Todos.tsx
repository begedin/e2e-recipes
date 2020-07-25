import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTodos } from '../store/actions'
import { AppDispatch, Todo, RootState } from '../store/types'

type TodoProps = { dispatch: AppDispatch; todos: Todo[] }

class Todos extends Component<TodoProps> {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTodos())
  }

  render() {
    const { todos } = this.props
    return (
      <ul>
        {todos.map(t => (
          <li>{t.title}</li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state: RootState): Pick<TodoProps, 'todos'> => {
  const { todos } = state

  return {
    todos
  }
}

export default connect(mapStateToProps)(Todos)
