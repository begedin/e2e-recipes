import type Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import Session from 'todo/services/session';

export default class Todos extends Route.extend({}) {
  @service store!: Store;

  @service session!: Session;

  beforeModel() {
    if (!this.session.authenticated) {
      this.transitionTo('login');
    }
  }

  model() {
    return this.store.findAll('todo');
  }
}
