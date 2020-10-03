import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Session from 'todo/services/session';

export default class Register extends Controller.extend({}) {
  @service session!: Session;

  @action
  async register(name: string, password: string) {
    await this.store.createRecord('user', { name, password }).save();
    const login = await this.store
      .createRecord('login', { name, password })
      .save();
    await this.session.authenticate(login.token);
    this.transitionToRoute('todos');
  }
}

declare module '@ember/controller' {
  interface Registry {
    register: Register;
  }
}
