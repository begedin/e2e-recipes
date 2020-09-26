import Service from '@ember/service';
import { set } from '@ember/object';
import { post } from 'todo/helpers/api';

export default class Session extends Service.extend({}) {
  authenticated: boolean = !!localStorage.getItem('token');
  token: string | null = localStorage.getItem('token');
  error: string | null = null;

  async authenticate(name: string, password: string) {
    set(this, 'error', null);

    try {
      const { data: token } = await post<string>('login', {
        login: { name, password },
      });
      localStorage.setItem('token', token);
      set(this, 'authenticated', true);
      set(this, 'token', token);
    } catch (e) {
      set(this, 'error', 'Invalid credentials');
    }
  }

  async logout() {
    localStorage.removeItem('token');
    set(this, 'authenticated', false);
  }
}

declare module '@ember/service' {
  interface Registry {
    session: Session;
  }
}
