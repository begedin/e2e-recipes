import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { resetStorage, setupSandbox } from '../helpers';

module('Acceptance | register', function (hooks) {
  setupApplicationTest(hooks);
  setupSandbox(hooks);
  resetStorage(hooks);

  test('Registering a new account', async function (assert) {
    await visit('/register');
    await fillIn('input[type=text]', 'joe');
    await fillIn('input[type=password]', 'password');
    await click('button');
    await settled();

    assert.equal(currentURL(), '/');
  });
});
