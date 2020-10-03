import Controller from '@ember/controller';
import { action } from '@ember/object';
import { set } from '@ember/object';

import Todo from 'todo/models/todo';

export default class Todos extends Controller.extend({}) {
  @action
  async remove(todo: Todo) {
    await todo.destroyRecord();
  }

  title: string = '';

  @action
  async create(title: string) {
    const todo = await this.store.createRecord('todo', { title });
    await todo.save();
    set(this, 'title', '');
  }
}

declare module '@ember/controller' {
  interface Registry {
    todos: Todos;
  }
}
