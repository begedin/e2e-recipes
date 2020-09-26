import Controller from '@ember/controller';
import { action } from '@ember/object';
import Model from '@ember-data/model';

export default class Todos extends Controller.extend({}) {
  @action
  remove(todo: Model) {
    console.log('action', todo);
    todo.destroyRecord();
    todo.unloadRecord();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    todos: Todos;
  }
}
