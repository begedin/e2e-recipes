import { Selector } from 'testcafe'
import { baseUrl } from '../config'
import { initSandbox, checkinSandbox } from '../helpers/sandbox'
import { createFactory } from '../helpers/factory'
import AppModel from '../app.model'

fixture('register')
  .page(baseUrl)
  .beforeEach(async t => {
    const sandboxId = await initSandbox(t)
    t.ctx.factory = await createFactory(sandboxId)
  })
  .afterEach(async t => checkinSandbox(t))

const app = new AppModel()

test('Registering a new user', async t => {
  await t
    .click(app.navigation.register)
    .typeText(app.register.nameField, 'Joe')
    .typeText(app.register.passwordField, 'Password')
    .click(app.register.submitButton)
    .expect(app.isOnRoot())
    .ok()
    .expect(app.navigation.todos.exists)
    .ok()
    .expect(app.navigation.logoutButton.exists)
    .ok()
})
