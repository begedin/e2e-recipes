import { sandboxAxiosInstance } from './api';

export class Factory {
  api: ReturnType<typeof sandboxAxiosInstance>;

  constructor(sandboxId: string) {
    this.api = sandboxAxiosInstance(sandboxId);
  }

  /**
   * Create a record on the backend, or batch create a list of records, where
   * each record is created with different attributtes.
   *
   * If there is no need for records to have different attributes when creating
   * a list of them, use `createList` instead, since it's faster.
   *
   * The response is a payload returned from the backend
   *
   * - created users will include id, email, first and last name
   * - created invitations will include token
   * - other records will include just the id
   *
   * @param {String} schema The type of record to create on the backend
   * @param {Object | Array<Object>} attributes
   */
  async create(schema: string, attributes: object = {}) {
    const { data } = await this.api.post('/factory', { schema, attributes });
    return data;
  }

  /**
   * Batch create a collection of records on the backend, all sharing the same
   * schema and attributes.
   *
   * Attributes which are not specified will be auto-generated and different
   * for each record.
   *
   * This is the fastest way to create multiple records of the same type on
   * the backend.
   * @param {String} schema Type of records to create
   * @param {Integer} count Amount of records to create
   * @param {Object} attributes Attributes the records will share
   */
  async createList(schema: string, count: number, attributes: object = {}) {
    const { data } = await this.api.post('/factory', {
      schema,
      count,
      attributes,
    });
    return data;
  }
}

export function createFactory(sandboxId: string) {
  return new Factory(sandboxId);
}
