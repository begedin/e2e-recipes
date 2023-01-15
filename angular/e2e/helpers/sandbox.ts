import { axiosInstance, sandboxAxiosInstance } from './api';
import { type Page } from '@playwright/test';

export const initSandbox = async (page: Page) => {
  const { data: sandboxId } = await axiosInstance().post<string>('sandbox');
  page.setExtraHTTPHeaders({ sandbox: sandboxId });
  return sandboxId;
};

export const checkinSandbox = async (sandboxId: string) =>
  sandboxAxiosInstance(sandboxId).delete('sandbox');
