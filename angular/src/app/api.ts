import axios, { AxiosRequestConfig } from 'axios';

const getSandboxCookie = () => {
  const cookie = document.cookie
    .split(';')
    .map((c) => c.trim())
    .map((c) => c.split('='))
    .find(([k, v]) => k === 'sandbox');
  return cookie ? cookie[1] : null;
};

/**
 * Builds an axios client for usage within the app.
 *
 * NOTE: Angular uses protractor as its e2e test runner.
 *
 * Protractor does not easily support http request proxying, so there is no
 * simple way to add request headers to all network requests triggered by
 * protractor.
 *
 * Instead, protractor sets a cookie before every test and the app itself
 * adds the content of that cookie as a sandbox header, to support sandboxed
 * tests.
 */
const client = () => {
  const token = window.localStorage.getItem('token');
  const sandbox = getSandboxCookie();
  const headers = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(sandbox && { sandbox }),
  };

  const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:4000/api',
    headers,
    responseType: 'json',
  };

  return axios.create(config);
};

export const post = async <T = any>(url: string, data: object) => {
  const response = await client().post(url, data);
  return response.data as { data: T };
};

export const get = async <T = any>(url: string, params: object = {}) => {
  const response = await client().get(url, { params });
  return response.data as { data: T };
};

export const remove = async <T = any>(url: string, params: object = {}) => {
  const response = await client().delete(url, { params });
  return response.data as { data: T };
};
