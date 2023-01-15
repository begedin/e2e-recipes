import { test, expect, PlaywrightTestArgs } from '@playwright/test';

import { initSandbox, checkinSandbox } from '../helpers/sandbox';
import { createFactory, Factory } from '../helpers/factory';

test.describe('Login', () => {
  let sandboxId: string;
  let factory: Factory;

  test.beforeEach(async ({ page }) => {
    sandboxId = await initSandbox(page);
    factory = createFactory(sandboxId);
  });

  test('logs in', async ({ page }) => {
    await factory.create('user', { name: 'Joe', password: 'password' });
    await page.goto('http:/localhost:4200');
    await page.click('a >> text="Login"');
    await page.fill('input[type="text"]', 'Joe');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.locator('h1 >> text="Todos"').waitFor();
    expect(page.url()).not.toContain('login');
  });

  test('errors if invalid credentials', async ({ page }) => {
    await page.goto('http:/localhost:4200');
    await page.click('a >> text="Login"');
    await page.fill('input[type="text"]', 'Joe');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.locator('.error').waitFor({ state: 'visible' });
    expect(page.url()).toContain('login');
  });

  test.afterEach(async () => {
    await checkinSandbox(sandboxId);
  });
});
