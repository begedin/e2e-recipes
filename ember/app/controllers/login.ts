import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Session from 'todo/services/session';

export default class Login extends Controller.extend({}) {
  @service session!: Session;

  @action
  async login(name: string, password: string) {
    await this.session.authenticate(name, password);
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
