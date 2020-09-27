import Controller from '@ember/controller';
import { action } from '@ember/object';
import Model from '@ember-data/model';

export default class Todos extends Controller.extend({}) {
  @action
  remove(todo: Model) {
    todo.destroyRecord();
    todo.unloadRecord();
  }

  @action
  async create(title: string) {
    console.log('create', title);
    const todo = this.store.createRecord('todo', { title });
    try {
      await todo.save();
    } catch (e) {
      todo.destroyRecord();
    }
  }
}

declare module '@ember/controller' {
  interface Registry {
    todos: Todos;
  }
}
