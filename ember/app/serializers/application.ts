import JSONSAPISerializer from '@ember-data/serializer/json';
import Store from '@ember-data/store';
import Model from '@ember-data/model';

// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import DS from 'ember-data';

import {} from '@ember/string';

const convert = (data: { id: number }, type: string | number) => ({
  attributes: { ...data },
  id: data.id,
  type,
});

type JSONAPIFormat = {
  data: {
    attributes: object;
    id: string | number;
    type: string;
  };
};

type BackendSingleFormat = {
  data: object;
};

export default class Application extends JSONSAPISerializer.extend({}) {
  normalizeResponse(
    store: Store,
    modelClass: Model & { modelName: typeof Model.modelName },
    payload: { data: { id: number } | Array<{ id: number }> },
    id: string | number,
    requestType: string
  ) {
    if (requestType === 'deleteRecord') {
      return this.normalizeDeleteRecordResponse(store, modelClass, payload, id);
    }
    if (requestType === 'createRecord' && modelClass.modelName === 'login') {
      return {
        data: {
          attributes: { token: payload.data },
          id: 'session',
        },
      };
    }

    if (requestType === 'createRecord') {
      return this.normalizeCreateRecordResponse(store, modelClass, payload, id);
    }

    const type = modelClass.modelName;
    return {
      data:
        'length' in payload.data
          ? payload.data.map((d) => convert(d, type))
          : convert(payload.data, type),
    };
  }

  normalizeCreateRecordResponse(
    _store: Store,
    modelClass: Model & { modelName: typeof Model.modelName },
    payload: BackendSingleFormat,
    id: string | number
  ): JSONAPIFormat {
    return {
      data: {
        attributes: payload.data,
        type: modelClass.modelName.toString(),
        id,
      },
    };
  }

  normalizeDeleteRecordResponse(
    _store: Store,
    modelClass: Model & { modelName: typeof Model.modelName },
    payload: BackendSingleFormat,
    id: string | number
  ): JSONAPIFormat {
    return {
      data: {
        attributes: payload.data,
        type: modelClass.modelName.toString(),
        id,
      },
    };
  }

  serialize(snapshot: DS.Snapshot, options: object) {
    const json = super.serialize(snapshot, options) as JSONAPIFormat;
    const type = snapshot.modelName;
    return { [type]: json };
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    application: Application;
  }
}
