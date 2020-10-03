import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';

import Session from 'todo/services/session';

const mapping: { [k: string]: string } = {
  todo: 'todos',
  user: 'users',
  users: 'users',
  logins: 'login',
};

export default class Application extends JSONAPIAdapter.extend({}) {
  host = 'http://localhost:4000';
  namespace = 'api';

  @service session!: Session;

  get headers() {
    const sandbox = localStorage.getItem('sandbox');
    return {
      Accept: 'application/json',
      Authorization: `Bearer ${this.session.token}`,
      ...(sandbox && { sandbox }),
    };
  }

  urlForCreateRecord(modelName: string | number): string {
    const { host, namespace } = this;
    const path = mapping[modelName] || modelName;
    return `${host}/${namespace}/${path}`;
  }

  urlForDeleteRecord(id: string, modelName: string | number) {
    const { host, namespace } = this;
    return `${host}/${namespace}/${mapping[modelName] || modelName}/${id}`;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    application: Application;
  }
}
