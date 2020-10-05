import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';
import Session from 'todo/services/session';

export default class Login extends Controller.extend({}) {
  @service session!: Session;

  error: string | null = null;

  @action
  async login(name: string, password: string) {
    let login: { token: string };
    set(this, 'error', null);
    try {
      login = await this.store.createRecord('login', { name, password }).save();
    } catch (e) {
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
  interface Registry {
    login: Login;
  }
}
