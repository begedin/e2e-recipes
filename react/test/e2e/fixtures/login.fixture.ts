import { initSandbox, checkinSandbox } from '../helpers/sandbox'
import { createFactory } from '../helpers/factory'
import AppModel from '../app.model'

const app = new AppModel()
fixture('login')
  .page(app.url.root)
  .beforeEach(async t => {
    const sandboxId = await initSandbox(t)
    t.ctx.factory = await createFactory(sandboxId)
  })
  .afterEach(async t => checkinSandbox(t))

test('Logging in as an existing user', async t => {
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
