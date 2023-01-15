import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';
import Session from 'todo/services/session';
import type Store from '@ember-data/store';

export default class Login extends Controller.extend({}) {
  @service session!: Session;

  error: string | null = null;

  @service store!: Store;



  @action
  async login() {
    let login: { token: string };
    set(this, 'error', null);
    try {
      const { name, password } = this;
      login = await this.store.createRecord('login', { name, password }).save();
    } catch (e: any) {
      if (e.code === 'UnauthorizedError') {
        set(this, 'error', 'Incorrect username or password');
      }
      return;
    }
    await this.session.authenticate(login.token);
    if (this.session.authenticated) {
      this.transitionToRoute('todos');
    }
  }
}

declare module '@ember/controller' {
  export interface Registry {
    login: Login;
  }
}
