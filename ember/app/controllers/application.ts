import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Session from 'todo/services/session';

export default class Application extends Controller.extend({}) {
  @service session!: Session;

  @action
  logout() {
    this.session.logout();
    if (!this.session.authenticated) {
      this.transitionToRoute('login');
    }
  }
}
