import type Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { set } from '@ember/object';

import Todo from 'todo/models/todo';

export default class Todos extends Controller.extend({}) {
  @service store!: Store;

  @action
  async remove(todo: Todo) {
    console.log(todo)
    await todo.destroyRecord();
  }

  title: string = '';

  @action
  async create(title: string) {
    const todo = await this.store.createRecord('todo', { title }).save();
    console.log(todo)
    set(this, 'title', '');
  }
}
