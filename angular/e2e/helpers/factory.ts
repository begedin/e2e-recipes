import { sandboxAxiosInstance } from './api';

type FactoryRecord = { id: number };

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
   */
  async create(
    schema: string,
    attributes: object = {}
  ): Promise<FactoryRecord> {
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
   */
  async createList(
    schema: string,
    count: number,
    attributes: object = {}
  ): Promise<FactoryRecord> {
    const { data } = await this.api.post('/factory', {
      schema,
      count,
      attributes,
    });
    return data;
  }
}

export const createFactory = (sandboxId: string): Factory =>
  new Factory(sandboxId);
