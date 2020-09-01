import AppModel from '../app.model'

import { initSandbox, checkinSandbox } from '../helpers/sandbox'
import { createFactory } from '../helpers/factory'

const app = new AppModel()
fixture('Logging in')
  .page(app.url.root)
  .beforeEach(async t => {
    const sandboxId = await initSandbox(t)
    t.ctx.factory = await createFactory(sandboxId)
  })
  .afterEach(async t => checkinSandbox(t))

test('Logs in with proper credentials', async t => {
  await t.ctx.factory.create('user', { name: 'Joe', password: 'Password' })
  await t
    .click(app.navigation.login)
    .typeText(app.login.nameField, 'Joe')
    .typeText(app.login.passwordField, 'Password')
    .click(app.login.submitButton)
    .expect(app.url.isRoot())
    .ok()
    .expect(app.navigation.todos.exists)
    .ok()
    .expect(app.navigation.logoutButton.exists)
    .ok()
})

test('Fails with incorrect credentials', async t => {
  await t.ctx.factory.create('user', { name: 'Joe', password: 'Password' })
  await t
    .click(app.navigation.login)
    .expect(app.url.isLogin())
    .ok()
    .typeText(app.login.nameField, 'Joe')
    .typeText(app.login.passwordField, 'WrongPassword')
    .click(app.login.submitButton)
    .expect(app.url.isLogin())
    .ok()
    .expect(app.error.exists)
    .ok()
})
