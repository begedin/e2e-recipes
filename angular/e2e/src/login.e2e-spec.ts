import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { initSandbox, checkinSandbox } from '../helpers/sandbox';
import { createFactory, Factory } from '../helpers/factory';

describe('Login', () => {
  let page: AppPage;
  let sandboxId: string;
  let factory: Factory;

  beforeEach(async (done) => {
    sandboxId = await initSandbox();
    factory = createFactory(sandboxId);
    page = new AppPage();
    done();
  });

  it('logs in', async () => {
    await factory.create('user', { name: 'Joe', password: 'password' });
    await page.navigateTo();
    await page.login.name.sendKeys('Joe');
    await page.login.password.sendKeys('password');
    await page.login.submit.click();

    expect(await page.currentUrl()).not.toContain('login');
  });

  it('errors if invalid credentials', async () => {
    await page.navigateTo();
    await page.login.name.sendKeys('Joe');
    await page.login.password.sendKeys('password');
    expect(await page.error.isPresent()).toBe(false);
    await page.login.submit.click();

    expect(await page.currentUrl()).toContain('login');
    expect(await page.error.isPresent()).toBe(true);
  });

  afterEach(async (done) => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(
      logs.some(
        (l) =>
          l.level === logging.Level.SEVERE &&
          !l.message.includes(
            'http://localhost:4000/api/login - Failed to load resource'
          )
      )
    ).toBe(false);
    await checkinSandbox(sandboxId);
    await browser.executeScript('window.localStorage.clear();');

    done();
  });
});
