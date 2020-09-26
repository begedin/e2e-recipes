import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';

import Session from 'todo/services/session';

export default class Application extends RESTAdapter.extend({}) {
  host = 'http://localhost:4000';
  namespace = 'api';

  @service session!: Session;

  get headers() {
    return {
      Authorization: `Bearer ${this.session.token}`,
    };
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    application: Application;
  }
}
