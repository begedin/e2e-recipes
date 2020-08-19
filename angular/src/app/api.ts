import axios, { AxiosRequestConfig } from 'axios';

const getSandboxCookie = () => {
  const cookie = document.cookie
    .split(';')
    .map((c) => c.trim())
    .map((c) => c.split('='))
    .find(([k, v]) => k === 'sandbox');
  return cookie ? cookie[1] : null;
};

const client = () => {
  const token = window.localStorage.getItem('token');
  const sandbox = getSandboxCookie();
  const headers = {
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

export const post = async <T = any>(url: string, data: {}) => {
  const response = await client().post(url, data);
  return response.data as { data: T };
};

export const get = async <T = any>(url: string, params: {} = {}) => {
  const response = await client().get(url, { params });
  return response.data as { data: T };
};

export const remove = async <T = any>(url: string, params: {} = {}) => {
  const response = await client().delete(url, { params });
  return response.data as { data: T };
};
