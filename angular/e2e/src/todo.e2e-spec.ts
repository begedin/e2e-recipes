import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { initSandbox, checkinSandbox } from '../helpers/sandbox';
import { createFactory, Factory } from '../helpers/factory';

describe('Todo', () => {
  let page: AppPage;
  let sandboxId: string;
  let factory: Factory;

  beforeEach(async (done) => {
    sandboxId = await initSandbox();
    factory = createFactory(sandboxId);
    page = new AppPage();
    done();
  });

  const login = async (name, password) => {
    await page.login.name.sendKeys(name);
    await page.login.password.sendKeys(password);
    await page.login.submit.click();
  };

  it('lists todos', async () => {
    const user = await factory.create('user', {
      name: 'Joe',
      password: 'password',
    });
    await factory.create('todo', { user, title: 'Write Homework' });
    await factory.create('todo', { user, title: 'Buy Milk' });
    await page.navigateTo();
    await login('Joe', 'password');

    expect(await page.currentUrl()).not.toContain('login');
    expect(await page.todos.items.count()).toEqual(2);
  });

  it('creates todos', async () => {
    await factory.create('user', {
      name: 'Joe',
      password: 'password',
    });
    await page.navigateTo();
    await login('Joe', 'password');

    expect(await page.currentUrl()).not.toContain('login');
    expect(await page.todos.items.count()).toEqual(0);

    await page.todos.newTodo.title.sendKeys('Write Login Page');
    await page.todos.newTodo.submit.click();

    expect(await page.todos.items.count()).toEqual(1);
  });

  it('deletes todos', async () => {
    const user = await factory.create('user', {
      name: 'Joe',
      password: 'password',
    });
    await factory.create('todo', { user, title: 'Write Homework' });
    await factory.create('todo', { user, title: 'Buy Milk' });

    await page.navigateTo();
    await login('Joe', 'password');

    expect(await page.currentUrl()).not.toContain('login');
    expect(await page.todos.items.count()).toEqual(2);

    const writeHomework = await page.todos.itemAt(0);
    await writeHomework.deleteButton.click();

    expect(await page.todos.items.count()).toEqual(1);

    const buyMilk = await page.todos.itemAt(0);
    await buyMilk.deleteButton.click();

    expect(await page.todos.items.count()).toEqual(0);
  });

  afterEach(async (done) => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );

    await checkinSandbox(sandboxId);
    await browser.executeScript('window.localStorage.clear();');
    done();
  });
});
