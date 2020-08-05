import { initSandbox, checkinSandbox } from '../helpers/sandbox'
import { createFactory } from '../helpers/factory'
import AppModel from '../app.model'

const app = new AppModel()
fixture('todo')
  .page(app.url.root)
  .beforeEach(async t => {
    const sandboxId = await initSandbox(t)
    t.ctx.factory = await createFactory(sandboxId)
  })
  .afterEach(async t => checkinSandbox(t))

test('Creating todos', async t => {
  await t.ctx.factory.create('user', { name: 'Joe', password: 'Password' })
  await t
    .click(app.navigation.login)
    .typeText(app.login.nameField, 'Joe')
    .typeText(app.login.passwordField, 'Password')
    .click(app.login.submitButton)
    .click(app.navigation.todos)
    .typeText(app.todos.create.field, 'Buy Groceries')
    .click(app.todos.create.button)
    .typeText(app.todos.create.field, 'Write Homework')
    .click(app.todos.create.button)
    .expect(app.todos.items.count)
    .eql(2)
    .expect(app.todos.itemAt(0).label.textContent)
    .eql('Buy Groceries')
    .expect(app.todos.itemAt(1).label.textContent)
    .eql('Write Homework')
    .click(app.todos.itemAt(0).deleteButton)
    .expect(app.todos.items.count)
    .eql(1)
})
