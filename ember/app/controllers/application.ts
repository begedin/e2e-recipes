import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Session from 'todo/services/session';
import { readOnly } from '@ember/object/computed';

export default class Application extends Controller.extend({}) {
  @service session!: Session;
  authenticated = readOnly('session.authenticated');

  @action
  logout() {
    this.session.logout();
    if (!this.session.authenticated) {
      this.transitionToRoute('login');
    }
  }
}

declare module '@ember/controller' {
  interface Registry {
    application: Application;
  }
}
