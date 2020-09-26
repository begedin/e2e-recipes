import JSONAPISerializer from '@ember-data/serializer/json-api';
import Store from '@ember-data/store';
import Model from '@ember-data/model';

const convert = (data: { id: number }, type: string | number) => ({
  attributes: { ...data },
  id: data.id,
  type,
});

export default class Application extends JSONAPISerializer.extend({}) {
  normalizeResponse(
    _store: Store,
    modelClass: Model & { modelName: typeof Model.modelName },
    resourceHash: { data: { id: number } | Array<{ id: number }> }
  ) {
    const type = modelClass.modelName;

    return {
      data:
        'length' in resourceHash.data
          ? resourceHash.data.map((d) => convert(d, type))
          : convert(resourceHash.data, type),
    };
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    application: Application;
  }
}
