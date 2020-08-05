import { Selector, ClientFunction } from 'testcafe'
import { baseUrl } from './config'

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

  todos = {
    create: {
      field: Selector('input[type=text]'),
      button: Selector('button[type="submit"]')
    },

    items: Selector('.todo'),
    itemAt(i: number) {
      return {
        label: this.items.nth(i).find('div'),
        deleteButton: this.items.nth(i).find('button')
      }
    }
  }

  url = {
    root: `${baseUrl}`,
    isRoot: ClientFunction(() => window.location.href.toString().endsWith('/')),
    login: `${baseUrl}/login`,
    isLogin: ClientFunction(() =>
      window.location.href.toString().endsWith('/login')
    ),
    register: `${baseUrl}/register`,
    isRegister: ClientFunction(() =>
      window.location.href.toString().endsWith('/register')
    )
  }
}
