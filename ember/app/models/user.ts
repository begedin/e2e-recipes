import Model, { attr } from '@ember-data/model';

export default class User extends Model.extend({}) {
  @attr('string') name!: string;
  @attr('string') password!: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
