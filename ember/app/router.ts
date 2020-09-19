import EmberRouter from '@ember/routing/router';
import config from 'todo/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}



Router.map(function() {
  this.route('login', { path: 'login' })
  this.route('register', { path: 'register' })
  this.route('todos', { path: '',  })
});
