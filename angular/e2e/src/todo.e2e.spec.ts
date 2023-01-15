import { test, expect, type Page } from '@playwright/test';
import { initSandbox, checkinSandbox } from '../helpers/sandbox';
import { createFactory, Factory } from '../helpers/factory';

test.describe('Todo', () => {
  let sandboxId: string;
  let factory: Factory;

  test.beforeEach(async ({ page }) => {
    sandboxId = await initSandbox(page);
    factory = createFactory(sandboxId);
  });

  const login = async (page: Page, name: string, password: string) => {
    await page.fill('input[type="text"]', name);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');
    await page.locator('h1 >> text="Todos"').waitFor();
  };

  test('lists todos', async ({ page }) => {
    const user = await factory.create('user', {
      name: 'Joe',
      password: 'password',
    });
    await factory.create('todo', { user, title: 'Write Homework' });
    await factory.create('todo', { user, title: 'Buy Milk' });
    await page.goto('localhost:4200');
    await login(page, 'Joe', 'password');

    expect(await page.locator('app-todo').count()).toEqual(2);
  });

  test('creates todos', async ({ page }) => {
    await factory.create('user', {
      name: 'Joe',
      password: 'password',
    });
    await page.goto('localhost:4200');
    await login(page, 'Joe', 'password');

    expect(await page.locator('app-todo').count()).toEqual(0);

    await page.fill('input[name="title"]', 'Write Login Page');
    await page.click('button[type="submit"]');

    await page.getByText('Write Login Page').waitFor();

    expect(await page.locator('app-todo').count()).toEqual(1);
  });

  test('deletes todos', async ({ page }) => {
    const user = await factory.create('user', {
      name: 'Joe',
      password: 'password',
    });
    await factory.create('todo', { user, title: 'Write Homework' });
    await factory.create('todo', { user, title: 'Buy Milk' });

    await page.goto('localhost:4200');
    await login(page, 'Joe', 'password');

    const todos = page.locator('app-todo');
    expect(await todos.count()).toEqual(2);

    const writeHomework = todos.filter({ hasText: 'Write Homework' });

    await writeHomework.getByText('Delete').click();
    await writeHomework.waitFor({ state: 'detached' });

    expect(await todos.count()).toEqual(1);

    const buyMilk = todos.filter({ hasText: 'Buy Milk' });

    await buyMilk.getByText('Delete').click();
    await buyMilk.waitFor({ state: 'detached' });

    expect(await todos.count()).toEqual(0);
  });

  test.afterEach(async () => {
    await checkinSandbox(sandboxId);
  });
});
