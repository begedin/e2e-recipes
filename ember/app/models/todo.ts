import Model, { attr } from '@ember-data/model';
export default class Todo extends Model.extend({}) {
  @attr('string') title!: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    todo: Todo;
  }
}
