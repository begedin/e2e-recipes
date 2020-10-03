/* globals NestedHooks */
import axios from 'axios';
import { visit, fillIn, click, settled } from '@ember/test-helpers';

export const login = async (name: string, password: string) => {
  await visit('/');
  await fillIn('input[type=text]', name);
  await fillIn('input[type=password]', password);
  await click('button');
  await settled();
};

import Axios from 'axios';

const client = () =>
  Axios.create({
    baseURL: 'http://localhost:4000/api/factory',
    headers: { sandbox: localStorage.getItem('sandbox') },
  });

export const create = async (schema: string, attributes: {}) => {
  const { data } = await client().post('', { schema, attributes });
  return data;
};

const openSandbox = async () => {
  const { data: sandbox }: { data: string } = await axios.post(
    'http://localhost:4000/api/sandbox'
  );
  localStorage.setItem('sandbox', sandbox);
  return sandbox;
};

const closeSandbox = async (sandbox: string) => {
  await axios.delete('http://localhost:4000/api/sandbox', {
    headers: { sandbox },
  });
  localStorage.removeItem('sandbox');
};

export const setupSandbox = (hooks: NestedHooks) => {
  let sandbox: string;

  hooks.beforeEach(async () => {
    sandbox = await openSandbox();
  });

  hooks.afterEach(async () => {
    await closeSandbox(sandbox);
  });
};

export const resetStorage = (hooks: NestedHooks) => {
  hooks.beforeEach(async () => {
    localStorage.removeItem('token');
  });
  hooks.afterEach(async () => {
    localStorage.removeItem('token');
  });
};
