import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTodos } from 'store/actions'
import { AppDispatch, Todo, RootState } from 'store/types'
import AddTodo from 'components/AddTodo'
import TodoItem from 'components/TodoItem'

type TodoProps = { dispatch: AppDispatch; todos: Todo[] }

class Todos extends Component<TodoProps> {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTodos())
  }

  render() {
    const { todos } = this.props
    return (
      <div className="todos">
        {todos.map(t => (
          <TodoItem todo={t} key={t.id} />
        ))}

        <AddTodo />
      </div>
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
