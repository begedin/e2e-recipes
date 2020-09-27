import JSONAPISerializer from '@ember-data/serializer/json-api';
import Store from '@ember-data/store';
import Model from '@ember-data/model';
import DS from 'ember-data';
import {} from '@ember/string';

const convert = (data: { id: number }, type: string | number) => ({
  attributes: { ...data },
  id: data.id,
  type,
});

type JSONApiFormat = {
  data: {
    attributes: object;
    type: string;
  };
};

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

  serialize(snapshot: DS.Snapshot, options: object) {
    const json = super.serialize(snapshot, options) as JSONApiFormat;
    const type = snapshot.modelName;
    const {
      data: { attributes },
    } = json;
    console.log(attributes, type);
    return { [type]: attributes };
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    application: Application;
  }
}
