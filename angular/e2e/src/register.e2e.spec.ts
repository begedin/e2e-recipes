import { test, expect } from '@playwright/test';

import { initSandbox, checkinSandbox } from '../helpers/sandbox';

test.describe('Register', () => {
  let sandboxId: string;

  test.beforeEach(async ({ page }) => {
    sandboxId = await initSandbox(page);
  });

  test('registers and logs in', async ({ page }) => {
    await page.goto('localhost:4200');
    await page.click('a >> text="Register"');
    await page.fill('input[type="text"]', 'Joe');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.locator('h1 >> text="Todos"').waitFor();
    expect(page.url()).not.toContain('register');
  });

  test('errors if invalid data', async ({ page }) => {
    await page.goto('http:/localhost:4200');
    await page.click('a >> text="Register"');
    await page.click('button[type="submit"]');
    await page.locator('.error').waitFor();
    expect(page.url()).toContain('register');
  });

  test.afterEach(async () => {
    await checkinSandbox(sandboxId);
  });
});
