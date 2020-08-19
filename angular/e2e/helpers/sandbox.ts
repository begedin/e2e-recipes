import { axiosInstance, sandboxAxiosInstance } from './api';
import { browser } from 'protractor';

export const initSandbox = async () => {
  const { data: sandboxId } = await axiosInstance().post<string>('sandbox');
  await browser.driver.get(browser.baseUrl);
  await browser.manage().addCookie({
    name: 'sandbox',
    value: sandboxId,
    path: '/',
    domain: 'localhost',
  });
  return sandboxId;
};

export const checkinSandbox = async (sandboxId: string) => {
  await browser.manage().deleteCookie('sandbox');
  return sandboxAxiosInstance(sandboxId).delete('sandbox');
};
