import { Selector, ClientFunction } from 'testcafe'

export default class AppModel {
  navigation = {
    login: Selector('a').withText('Login'),
    register: Selector('a').withText('Register'),
    todos: Selector('a').withText('ToDos'),
    logoutButton: Selector('button').withText('Log Out')
  }
  register = {
    nameField: Selector('input[type=text]'),
    passwordField: Selector('input[type=password]'),
    submitButton: Selector('button[type="submit"]')
  }

  login = {
    nameField: Selector('input[type=text]'),
    passwordField: Selector('input[type=password]'),
    submitButton: Selector('button[type="submit"]')
  }

  isOnRoot = ClientFunction(() => window.location.href.toString().endsWith('/'))
}
