import Service from '@ember/service';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

export default class Session extends Service.extend({}) {
  authenticated: boolean = !!localStorage.getItem('token');
  token: string | null = localStorage.getItem('token');
  error: string | null = null;

  @service store!: Store;

  constructor() {
    super();
  }

  init() {
    super.init();
    set(this, 'token', localStorage.getItem('token'));
    set(this, 'authenticated', !!localStorage.getItem('token'));
  }

  async authenticate(token: string) {
    set(this, 'error', null);
    localStorage.setItem('token', token);
    set(this, 'authenticated', true);
    set(this, 'token', token);
  }

  async logout() {
    localStorage.removeItem('token');
    set(this, 'authenticated', false);
  }
}

declare module '@ember/service' {
  export interface Registry {
    session: Session;
  }
}
