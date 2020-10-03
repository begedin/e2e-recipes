import { module, test } from 'qunit';
import { findAll, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { create, login, resetStorage, setupSandbox } from '../helpers';

module('Acceptance | todos', function (hooks) {
  setupApplicationTest(hooks);
  setupSandbox(hooks);
  resetStorage(hooks);

  test('Listing todos', async function (assert) {
    const user = await create('user', { name: 'joe', password: 'password' });

    await create('todo', { title: 'Do homework', user });
    await create('todo', { title: 'Buy milk', user });
    await login('joe', 'password');
    await settled();
    assert.equal(findAll('.todo').length, 2);
    assert.equal(
      findAll('.todo label')
        .map((t) => t.textContent)
        .join(', '),
      'Do homework, Buy milk'
    );
  });
});
