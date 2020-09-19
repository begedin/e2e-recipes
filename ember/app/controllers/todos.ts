import Controller from '@ember/controller';

export default class Todos extends Controller.extend({}) {}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    todos: Todos;
  }
}
