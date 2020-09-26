import Model, { attr, hasMany } from '@ember-data/model';

export default class User extends Model.extend({}) {
  name = attr('string');
  todos = hasMany('todo');
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
