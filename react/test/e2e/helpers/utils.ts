import AppModel from '../app.model'
import { baseUrl } from '../config'

export const uiLogin = async (
  t: TestController,
  name: string,
  password: string
) => {
  const app = new AppModel()

  const isCurrent = await app.url.isLogin()
  if (!isCurrent) {
    await t.navigateTo(`${baseUrl}/login`)
  }

  return t
    .typeText(app.login.nameField, name, { paste: true })
    .typeText(app.login.passwordField, password, { paste: true })
    .click(app.login.submitButton)
}
