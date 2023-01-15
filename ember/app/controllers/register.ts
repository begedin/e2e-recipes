import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Session from 'todo/services/session';
import type Store from '@ember-data/store'

export default class Register extends Controller.extend({}) {
  @service session!: Session;
  @service store!: Store;

  error: string | null = null;

  @action
  async register() {
    const { name, password } = this
    try {
      await this.store.createRecord('user', { name, password }).save();
      const login = await this.store.createRecord('login', { name, password }).save();
      await this.session.authenticate(login.token);
    } catch (e: any) {
      if (e.code === 'UnauthorizedError') {
        this.set('error', 'Incorrect username or password');
      }
      return;
    }
    this.transitionToRoute('todos');
  }
}
