import { module, test } from 'qunit';
import {
  fillIn,
  click,
  settled,
  visit,
  currentURL,
  findAll,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { create, resetStorage, setupSandbox } from '../helpers';

module('Acceptance | login', function (hooks) {
  setupApplicationTest(hooks);
  setupSandbox(hooks);
  resetStorage(hooks);

  test('Logging in with existing account', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/login');

    await create('user', { name: 'joe', password: 'password' });

    await fillIn('input[type=text]', 'joe');
    await fillIn('input[type=password]', 'password');
    await click('button');
    await settled();

    assert.equal(currentURL(), '/');
  });

  test('Logging in with incorrect credentials', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/login');

    await fillIn('input[type=text]', 'joe');
    await fillIn('input[type=password]', 'password');
    await click('button');
    await settled();

    assert.equal(currentURL(), '/login');
    assert.equal(findAll('.error').length, 1);
  });
});
