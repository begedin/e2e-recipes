import AppModel from '../app.model'

import { createFactory } from '../helpers/factory'
import { initSandbox, checkinSandbox } from '../helpers/sandbox'
import { uiLogin } from '../helpers/utils'

let factory: ReturnType<typeof createFactory>

const app = new AppModel()

fixture('todo')
  .page(app.url.root)
  .beforeEach(async t => {
    const sandboxId = await initSandbox(t)
    factory = await createFactory(sandboxId)
  })
  .afterEach(async t => checkinSandbox(t))

test('Lists todos', async t => {
  const user = await factory.create('user', {
    name: 'Joe',
    password: 'Password'
  })

  await factory.create('todo', { user, title: 'Buy Milk' })
  await factory.create('todo', { user, title: 'Write Homework' })

  await uiLogin(t, 'Joe', 'Password')

  await t
    .expect(app.todos.items.count)
    .eql(2)
    .expect(app.todos.itemAt(0).label.textContent)
    .eql('Buy Milk')
    .expect(app.todos.itemAt(1).label.textContent)
    .eql('Write Homework')
})

test('Deletes todos', async t => {
  const user = await factory.create('user', {
    name: 'Joe',
    password: 'Password'
  })
  await factory.create('todo', { user, title: 'Buy Milk' })
  await factory.create('todo', { user, title: 'Write Homework' })

  await uiLogin(t, 'Joe', 'Password')

  await t
    .expect(app.todos.items.count)
    .eql(2)
    .expect(app.todos.itemAt(0).label.textContent)
    .eql('Buy Milk')
    .expect(app.todos.itemAt(1).label.textContent)
    .eql('Write Homework')
    .click(app.todos.itemAt(0).deleteButton)
    .expect(app.todos.items.count)
    .eql(1)
    .expect(app.todos.itemAt(0).label.textContent)
    .eql('Write Homework')
    .click(app.todos.itemAt(0).deleteButton)
    .expect(app.todos.items.count)
    .eql(0)
})

test('Creates todos', async t => {
  await factory.create('user', { name: 'Joe', password: 'Password' })

  await uiLogin(t, 'Joe', 'Password')

  await t
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
